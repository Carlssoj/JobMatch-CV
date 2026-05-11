import { spawn } from "node:child_process";

const rootUrl = `http://127.0.0.1:${process.env.PORT || "4183"}`;
const checks = [];

await runQualityGate();

async function runQualityGate() {
  await checkSyntax(["app.js", "server.mjs", "scripts/quality-gate.mjs"]);
  await smokeTestServer();
  await optionalLiveJobsCheck();
  printSummary();
}

async function checkSyntax(files) {
  for (const file of files) {
    await runCommand(process.execPath, ["--check", file], `Syntax check: ${file}`);
  }
}

async function smokeTestServer() {
  const server = spawn(process.execPath, ["server.mjs"], {
    env: { ...process.env, PORT: new URL(rootUrl).port },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let output = "";
  server.stdout.on("data", (chunk) => {
    output += chunk.toString();
  });
  server.stderr.on("data", (chunk) => {
    output += chunk.toString();
  });

  try {
    await waitForServer(rootUrl, 8_000);
    await expectOk(`${rootUrl}/`, "Home page");
    await expectOk(`${rootUrl}/app.js`, "App bundle");
    await expectOk(`${rootUrl}/styles.css`, "Stylesheet");
    pass("Local server smoke test");
  } finally {
    server.kill();
    await waitForExit(server, 2_000).catch(() => {
      throw new Error(`Local server did not stop cleanly.\n${output}`);
    });
  }
}

async function optionalLiveJobsCheck() {
  if (process.env.CHECK_LIVE_JOBS !== "1") {
    skip("Live jobs proxy", "set CHECK_LIVE_JOBS=1 to include the external Remotive check");
    return;
  }

  const server = spawn(process.execPath, ["server.mjs"], {
    env: { ...process.env, PORT: new URL(rootUrl).port },
    stdio: ["ignore", "pipe", "pipe"],
  });

  try {
    await waitForServer(rootUrl, 8_000);
    const response = await fetch(`${rootUrl}/api/jobs?search=frontend&limit=1`);
    if (!response.ok) {
      throw new Error(`Live jobs proxy returned ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data.jobs)) {
      throw new Error("Live jobs proxy did not return a jobs array.");
    }
    pass("Live jobs proxy");
  } finally {
    server.kill();
    await waitForExit(server, 2_000).catch(() => {});
  }
}

async function expectOk(url, label) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${label} returned ${response.status}`);
  }
}

async function waitForServer(url, timeoutMs) {
  const startedAt = Date.now();
  let lastError;

  while (Date.now() - startedAt < timeoutMs) {
    try {
      await expectOk(url, "Server readiness");
      return;
    } catch (error) {
      lastError = error;
      await delay(200);
    }
  }

  throw lastError || new Error("Server did not become ready.");
}

async function runCommand(command, args, label) {
  const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
  let output = "";

  child.stdout.on("data", (chunk) => {
    output += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    output += chunk.toString();
  });

  const code = await waitForExit(child);
  if (code !== 0) {
    throw new Error(`${label} failed.\n${output}`);
  }

  pass(label);
}

function waitForExit(child, timeoutMs = 0) {
  return new Promise((resolve, reject) => {
    const timer =
      timeoutMs > 0
        ? setTimeout(() => {
            reject(new Error("Timed out waiting for process exit."));
          }, timeoutMs)
        : null;

    child.once("exit", (code) => {
      if (timer) clearTimeout(timer);
      resolve(code);
    });
    child.once("error", (error) => {
      if (timer) clearTimeout(timer);
      reject(error);
    });
  });
}

function pass(label) {
  checks.push({ label, status: "PASS" });
}

function skip(label, reason) {
  checks.push({ label, reason, status: "SKIP" });
}

function printSummary() {
  console.log("\nQuality Gate");
  for (const check of checks) {
    const suffix = check.reason ? ` - ${check.reason}` : "";
    console.log(`[${check.status}] ${check.label}${suffix}`);
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
