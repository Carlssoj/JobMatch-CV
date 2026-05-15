import {
  buildLinkedInSearchJobs,
  buildSearchTerms,
  detectSkills,
  extractProfile,
  localJobs,
  scoreJob,
} from "../app.js";

const checks = [];

run();

function run() {
  checkJavaScriptDoesNotCountAsJava();
  checkProgrammingResumeStillTargetsDevelopment();
  checkSapResumeTargetsErp();
  printSummary();
}

function checkJavaScriptDoesNotCountAsJava() {
  const skills = detectSkills("JavaScript, React e TypeScript").map((skill) => skill.name);
  const seniorProfile = extractProfile("Engenheiro de Software Senior com React e TypeScript.");

  expect(skills.includes("JavaScript"), "JavaScript skill should be detected.");
  expect(!skills.includes("Java"), "Java should not be detected inside JavaScript.");
  expect(seniorProfile.seniority === "Sênior", "Explicit seniority should not fall back to Junior.");
  pass("JavaScript alias boundaries");
}

function checkProgrammingResumeStillTargetsDevelopment() {
  const profile = extractProfile(`
    Carlos Alberto
    Desenvolvedor Full Stack Pleno
    Experiencia com React, TypeScript, Node.js, APIs REST, PostgreSQL, AWS, Docker e GitHub Actions.
    Criacao de interfaces responsivas com HTML, CSS e JavaScript.
  `);

  const roleNames = profile.roles.map((role) => role.role);
  const searchTerms = buildSearchTerms(profile);

  expect(roleNames.includes("Full Stack"), "Programming resume should keep the Full Stack role.");
  expect(searchTerms.includes("full stack developer"), "Programming search should include full stack developer.");
  pass("Programming profile routing");
}

function checkSapResumeTargetsErp() {
  const profile = extractProfile(`
    Everton Aparecido Sabio do Nascimento
    Brasileiro, Casado, 36 anos
    ANALISTA DE SISTEMAS - SAP BUSINESS ONE
    Analista de Sustentacao Pleno com suporte ao usuario e parametrizacoes no Sap Bussines One.
    Conhecimento em SAP Business One, B1IF, DTW, SQL, HANA, faturamento, impostos, SPED,
    PIS/COFINS, controladoria, contabilidade, Service Desk e Help Desk.
  `);
  profile.workMode = "hybrid";

  const skillNames = profile.skills.map((skill) => skill.name);
  const roleNames = profile.roles.map((role) => role.role);
  const searchTerms = buildSearchTerms(profile);
  const [topJob] = localJobs.map((job) => scoreJob(profile, job)).sort((a, b) => b.score - a.score);
  const [linkedInSearch] = buildLinkedInSearchJobs(profile);

  expect(skillNames.includes("SAP Business One"), "SAP Business One should be detected as a skill.");
  expect(skillNames.includes("SAP"), "SAP should be detected as a skill.");
  expect(profile.seniority === "Pleno", "Age should not be treated as years of experience.");
  expect(roleNames.includes("SAP / ERP"), "SAP resume should include the SAP / ERP role.");
  expect(searchTerms[0] === "sap business one", "SAP resume should prioritize sap business one search.");
  expect(topJob.title === "Analista SAP Business One", "SAP resume should rank the SAP local job first.");
  expect(linkedInSearch.title === "SAP / ERP no LinkedIn", "LinkedIn search should use SAP / ERP as primary role.");
  expect(linkedInSearch.url.includes("keywords=sap+business+one"), "LinkedIn URL should prioritize SAP Business One.");
  pass("SAP / ERP profile routing");
}

function expect(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function pass(label) {
  checks.push({ label, status: "PASS" });
}

function printSummary() {
  console.log("\nProfile Extraction Checks");
  for (const check of checks) {
    console.log(`[${check.status}] ${check.label}`);
  }
}
