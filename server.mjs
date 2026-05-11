import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 4173);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (url.pathname === "/api/jobs") {
      await proxyJobs(url, response);
      return;
    }

    await serveStatic(url, response);
  } catch (error) {
    console.error(error);
    send(response, 500, "text/plain; charset=utf-8", "Erro interno no servidor local.");
  }
}).listen(port, () => {
  console.log(`JobMatch CV rodando em http://localhost:${port}`);
});

async function proxyJobs(url, response) {
  const remotiveUrl = new URL("https://remotive.com/api/remote-jobs");
  const search = url.searchParams.get("search");
  const limit = url.searchParams.get("limit") || "18";

  if (search) remotiveUrl.searchParams.set("search", search);
  remotiveUrl.searchParams.set("limit", limit);

  const remotiveResponse = await fetch(remotiveUrl, {
    headers: {
      Accept: "application/json",
      "User-Agent": "JobMatch-CV-local-dev/1.0",
    },
  });

  const body = await remotiveResponse.text();
  send(response, remotiveResponse.status, "application/json; charset=utf-8", body);
}

async function serveStatic(url, response) {
  const requestedPath = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const safePath = normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(root, safePath);

  if (!filePath.startsWith(root)) {
    send(response, 403, "text/plain; charset=utf-8", "Acesso negado.");
    return;
  }

  const content = await readFile(filePath);
  const type = contentTypes[extname(filePath)] || "application/octet-stream";
  send(response, 200, type, content);
}

function send(response, status, contentType, body) {
  response.writeHead(status, {
    "Content-Type": contentType,
    "Cache-Control": "no-store",
  });
  response.end(body);
}
