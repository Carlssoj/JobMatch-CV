const state = {
  profile: null,
  jobs: [],
  customJobs: [],
  filteredMinScore: 0,
  filterText: "",
};

const skillLexicon = [
  { name: "JavaScript", aliases: ["javascript", "js", "ecmascript"], area: "Frontend" },
  { name: "TypeScript", aliases: ["typescript", "ts"], area: "Frontend" },
  { name: "React", aliases: ["react", "react.js", "reactjs", "next.js", "nextjs"], area: "Frontend" },
  { name: "Vue", aliases: ["vue", "vue.js", "nuxt"], area: "Frontend" },
  { name: "Angular", aliases: ["angular"], area: "Frontend" },
  { name: "HTML", aliases: ["html", "html5"], area: "Frontend" },
  { name: "CSS", aliases: ["css", "css3", "sass", "scss", "tailwind"], area: "Frontend" },
  { name: "Node.js", aliases: ["node", "node.js", "express", "nestjs"], area: "Backend" },
  { name: "Python", aliases: ["python", "django", "flask", "fastapi"], area: "Backend" },
  { name: "Java", aliases: ["java", "spring", "spring boot"], area: "Backend" },
  { name: "C#", aliases: ["c#", ".net", "dotnet", "asp.net"], area: "Backend" },
  { name: "PHP", aliases: ["php", "laravel", "symfony"], area: "Backend" },
  { name: "Ruby", aliases: ["ruby", "rails", "ruby on rails"], area: "Backend" },
  { name: "Go", aliases: ["golang", " go "], area: "Backend" },
  { name: "SQL", aliases: ["sql", "postgres", "postgresql", "mysql", "sql server", "oracle"], area: "Dados" },
  { name: "NoSQL", aliases: ["mongodb", "dynamodb", "redis", "cassandra"], area: "Dados" },
  { name: "Power BI", aliases: ["power bi", "dax", "power query"], area: "Dados" },
  { name: "Tableau", aliases: ["tableau"], area: "Dados" },
  { name: "Excel", aliases: ["excel", "vba", "planilhas"], area: "Dados" },
  { name: "Machine Learning", aliases: ["machine learning", "ml", "scikit", "pytorch", "tensorflow"], area: "IA" },
  { name: "Data Science", aliases: ["data science", "ciência de dados", "pandas", "numpy"], area: "IA" },
  { name: "LLM", aliases: ["llm", "openai", "langchain", "rag", "chatgpt"], area: "IA" },
  { name: "AWS", aliases: ["aws", "amazon web services", "lambda", "ec2", "s3"], area: "Cloud" },
  { name: "Azure", aliases: ["azure", "microsoft azure"], area: "Cloud" },
  { name: "GCP", aliases: ["gcp", "google cloud"], area: "Cloud" },
  { name: "Docker", aliases: ["docker", "container"], area: "DevOps" },
  { name: "Kubernetes", aliases: ["kubernetes", "k8s"], area: "DevOps" },
  { name: "CI/CD", aliases: ["ci/cd", "github actions", "gitlab ci", "jenkins"], area: "DevOps" },
  { name: "Git", aliases: ["git", "github", "gitlab", "bitbucket"], area: "DevOps" },
  { name: "QA", aliases: ["qa", "quality assurance", "testes", "automação de testes", "selenium", "cypress"], area: "Qualidade" },
  { name: "Scrum", aliases: ["scrum", "kanban", "agile", "metodologias ágeis"], area: "Gestão" },
  { name: "Product Management", aliases: ["product management", "product owner", "product manager", "po", "pm"], area: "Produto" },
  { name: "UX/UI", aliases: ["ux", "ui", "figma", "design system", "prototipação"], area: "Design" },
  { name: "SEO", aliases: ["seo", "sem", "google analytics", "analytics"], area: "Marketing" },
  { name: "CRM", aliases: ["crm", "salesforce", "hubspot"], area: "Comercial" },
  { name: "Customer Success", aliases: ["customer success", "cs", "atendimento", "suporte"], area: "Operações" },
  { name: "Inglês", aliases: ["inglês", "english", "advanced english", "fluent english", "fluente"], area: "Idioma" },
  { name: "Espanhol", aliases: ["espanhol", "spanish"], area: "Idioma" },
];

const roleLexicon = [
  { role: "Desenvolvimento Frontend", words: ["frontend", "front-end", "react", "vue", "angular", "interface", "ui"] },
  { role: "Desenvolvimento Backend", words: ["backend", "back-end", "api", "microserviços", "node", "java", "python", ".net"] },
  { role: "Full Stack", words: ["full stack", "fullstack", "frontend", "backend", "react", "node"] },
  { role: "Dados e BI", words: ["dados", "bi", "analytics", "power bi", "sql", "dashboard", "relatórios"] },
  { role: "Ciência de Dados / IA", words: ["machine learning", "ia", "ai", "data science", "modelo", "llm", "preditivo"] },
  { role: "DevOps / Cloud", words: ["devops", "cloud", "aws", "azure", "kubernetes", "docker", "infraestrutura"] },
  { role: "QA / Testes", words: ["qa", "testes", "qualidade", "selenium", "cypress", "automação"] },
  { role: "Produto", words: ["produto", "product", "roadmap", "discovery", "stakeholders", "métricas"] },
  { role: "UX/UI Design", words: ["ux", "ui", "figma", "pesquisa", "protótipo", "design system"] },
  { role: "Marketing / Growth", words: ["marketing", "growth", "seo", "campanhas", "mídia", "conteúdo"] },
  { role: "Customer Success / Suporte", words: ["customer success", "suporte", "atendimento", "onboarding", "clientes"] },
];

const localJobs = [
  {
    id: "local-frontend-1",
    title: "Desenvolvedor Frontend React",
    company: "Nexa Produto Digital",
    location: "Brasil remoto",
    workMode: "remote",
    type: "CLT",
    salary: "R$ 8.000 - R$ 12.000",
    source: "Base local",
    url: "",
    description:
      "React, TypeScript, CSS, design system, consumo de APIs REST, testes com Cypress, colaboração com UX e produto em times ágeis.",
  },
  {
    id: "local-backend-1",
    title: "Engenheiro Backend Node.js",
    company: "Orbit Pagamentos",
    location: "Remoto LATAM",
    workMode: "remote",
    type: "PJ",
    salary: "USD 4.000 - USD 6.500",
    source: "Base local",
    url: "",
    description:
      "Node.js, TypeScript, PostgreSQL, Redis, arquitetura de APIs, mensageria, AWS, Docker, CI/CD e observabilidade.",
  },
  {
    id: "local-data-1",
    title: "Analista de Dados / BI",
    company: "Atlas Retail",
    location: "São Paulo híbrido",
    workMode: "hybrid",
    type: "CLT",
    salary: "R$ 6.500 - R$ 9.500",
    source: "Base local",
    url: "",
    description:
      "SQL, Power BI, Excel, modelagem de dados, indicadores comerciais, storytelling com dados e interação com áreas de negócio.",
  },
  {
    id: "local-ml-1",
    title: "Cientista de Dados Pleno",
    company: "Aster AI",
    location: "Brasil remoto",
    workMode: "remote",
    type: "CLT",
    salary: "R$ 10.000 - R$ 15.000",
    source: "Base local",
    url: "",
    description:
      "Python, pandas, machine learning, experimentação, SQL, cloud, LLMs, métricas de modelo e comunicação com stakeholders.",
  },
  {
    id: "local-devops-1",
    title: "DevOps Engineer",
    company: "Cloudbridge",
    location: "Remoto",
    workMode: "remote",
    type: "PJ",
    salary: "R$ 12.000 - R$ 18.000",
    source: "Base local",
    url: "",
    description:
      "AWS, Kubernetes, Docker, Terraform, GitHub Actions, monitoramento, segurança básica, automação de deploys e incidentes.",
  },
  {
    id: "local-product-1",
    title: "Product Owner",
    company: "MobiHealth",
    location: "Campinas híbrido",
    workMode: "hybrid",
    type: "CLT",
    salary: "R$ 9.000 - R$ 13.000",
    source: "Base local",
    url: "",
    description:
      "Product owner, discovery, priorização de backlog, métricas, scrum, comunicação com stakeholders, escrita de histórias e validação com usuários.",
  },
  {
    id: "local-qa-1",
    title: "QA Automation Engineer",
    company: "TestLab",
    location: "Brasil remoto",
    workMode: "remote",
    type: "CLT",
    salary: "R$ 7.000 - R$ 11.000",
    source: "Base local",
    url: "",
    description:
      "Automação de testes, Cypress, Selenium, API testing, CI/CD, documentação de bugs, qualidade em squads ágeis.",
  },
  {
    id: "local-cs-1",
    title: "Customer Success Specialist",
    company: "SaaSFlow",
    location: "Remoto Brasil",
    workMode: "remote",
    type: "CLT",
    salary: "R$ 5.000 - R$ 8.000",
    source: "Base local",
    url: "",
    description:
      "Atendimento B2B, onboarding de clientes, CRM, análise de indicadores de retenção, comunicação clara, inglês intermediário.",
  },
];

const sampleResume = `Carlos Alberto
Desenvolvedor Full Stack
São Paulo, Brasil
carlos@email.com

Resumo
Profissional com 5 anos de experiência em desenvolvimento web, atuando em produtos SaaS e plataformas internas. Experiência com React, TypeScript, Node.js, APIs REST, PostgreSQL e AWS. Forte atuação com times ágeis, code review, métricas de produto e automação de deploys.

Experiência
Desenvolvedor Full Stack Pleno - Acme Tech
2021 - atual
- Construção de dashboards em React e TypeScript.
- Desenvolvimento de APIs com Node.js, Express e PostgreSQL.
- Pipelines de CI/CD com GitHub Actions, Docker e deploy em AWS.
- Trabalho próximo com Product Owner e UX para priorização de melhorias.

Desenvolvedor Frontend - Studio Web
2019 - 2021
- Criação de interfaces responsivas com HTML, CSS, JavaScript e React.
- Testes end-to-end com Cypress.

Idiomas
Inglês avançado`;

const els = {
  resumeFile: document.querySelector("#resumeFile"),
  resumeText: document.querySelector("#resumeText"),
  dropZone: document.querySelector("#dropZone"),
  parserStatus: document.querySelector("#parserStatus"),
  analyzeButton: document.querySelector("#analyzeButton"),
  loadSample: document.querySelector("#loadSample"),
  includeLiveJobs: document.querySelector("#includeLiveJobs"),
  locationInput: document.querySelector("#locationInput"),
  workMode: document.querySelector("#workMode"),
  customJobs: document.querySelector("#customJobs"),
  addCustomJobs: document.querySelector("#addCustomJobs"),
  seniorityMetric: document.querySelector("#seniorityMetric"),
  skillsMetric: document.querySelector("#skillsMetric"),
  jobsMetric: document.querySelector("#jobsMetric"),
  bestMetric: document.querySelector("#bestMetric"),
  profileSummary: document.querySelector("#profileSummary"),
  skillsChips: document.querySelector("#skillsChips"),
  copyProfile: document.querySelector("#copyProfile"),
  jobFilter: document.querySelector("#jobFilter"),
  jobList: document.querySelector("#jobList"),
  messageBanner: document.querySelector("#messageBanner"),
  scoreButtons: document.querySelectorAll("[data-min-score]"),
};

boot();

function boot() {
  wireEvents();
  renderJobs();
  refreshIcons();
}

function wireEvents() {
  els.resumeFile.addEventListener("change", async (event) => {
    const [file] = event.target.files;
    if (file) await readResumeFile(file);
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    els.dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      els.dropZone.classList.add("drag-over");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    els.dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      els.dropZone.classList.remove("drag-over");
    });
  });

  els.dropZone.addEventListener("drop", async (event) => {
    const [file] = event.dataTransfer.files;
    if (file) await readResumeFile(file);
  });

  els.analyzeButton.addEventListener("click", analyzeCurrentResume);

  els.loadSample.addEventListener("click", () => {
    els.resumeText.value = sampleResume;
    els.locationInput.value = "São Paulo, Brasil";
    setStatus("Exemplo carregado");
    analyzeCurrentResume();
  });

  els.addCustomJobs.addEventListener("click", () => {
    addCustomJobs();
    if (state.profile) analyzeCurrentResume(false);
  });

  els.copyProfile.addEventListener("click", async () => {
    if (!state.profile) return;
    try {
      await navigator.clipboard.writeText(buildProfileText(state.profile));
      showMessage("Perfil copiado para a área de transferência.");
    } catch {
      showMessage("Não consegui copiar automaticamente neste navegador.");
    }
  });

  els.jobFilter.addEventListener("input", (event) => {
    state.filterText = event.target.value.toLowerCase().trim();
    renderJobs();
  });

  els.scoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      els.scoreButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.filteredMinScore = Number(button.dataset.minScore);
      renderJobs();
    });
  });
}

async function readResumeFile(file) {
  setStatus(`Lendo ${file.name}`, "busy");
  hideMessage();

  try {
    const extension = file.name.split(".").pop().toLowerCase();
    let text = "";

    if (extension === "pdf") {
      text = await readPdf(file);
    } else if (extension === "docx") {
      text = await readDocx(file);
    } else {
      text = await file.text();
    }

    els.resumeText.value = normalizeWhitespace(text);
    setStatus("Currículo lido");
  } catch (error) {
    console.error(error);
    setStatus("Erro na leitura", "error");
    showMessage("Não consegui extrair esse arquivo. Tente colar o texto do currículo no campo principal.");
  }
}

async function readPdf(file) {
  if (!window.pdfjsLib) {
    throw new Error("PDF.js não foi carregado.");
  }

  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  const buffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;
  const pages = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(content.items.map((item) => item.str).join(" "));
  }

  return pages.join("\n\n");
}

async function readDocx(file) {
  if (!window.mammoth) {
    throw new Error("Mammoth não foi carregado.");
  }

  const buffer = await file.arrayBuffer();
  const result = await window.mammoth.extractRawText({ arrayBuffer: buffer });
  return result.value;
}

async function analyzeCurrentResume(fetchLive = true) {
  const resumeText = els.resumeText.value.trim();
  if (resumeText.length < 80) {
    showMessage("Cole ou envie um currículo com mais informações para gerar uma análise confiável.");
    setStatus("Aguardando currículo");
    return;
  }

  setStatus("Analisando", "busy");
  hideMessage();

  const profile = extractProfile(resumeText);
  profile.location = els.locationInput.value.trim() || profile.location;
  profile.workMode = els.workMode.value;
  state.profile = profile;

  const sources = [...localJobs, ...state.customJobs];
  let liveJobs = [];

  if (fetchLive && els.includeLiveJobs.checked) {
    try {
      liveJobs = await fetchLiveJobMatches(profile);
    } catch (error) {
      console.warn(error);
      showMessage("A busca na Remotive falhou agora. Mantive a análise com a base local e vagas adicionadas.");
    }
  }

  const uniqueJobs = dedupeJobs([...liveJobs, ...sources]);
  state.jobs = uniqueJobs.map((job) => scoreJob(profile, job)).sort((a, b) => b.score - a.score);

  setStatus("Análise pronta");
  renderProfile(profile);
  renderJobs();
}

function extractProfile(text) {
  const cleanText = normalizeWhitespace(text);
  const lowered = fold(cleanText);
  const skills = detectSkills(cleanText);
  const seniority = detectSeniority(cleanText);
  const years = detectYears(cleanText);
  const roles = detectRoles(cleanText);
  const email = cleanText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "";
  const phone = cleanText.match(/(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{2}\)?[\s.-]?)?\d{4,5}[\s.-]?\d{4}/)?.[0] || "";
  const location = detectLocation(cleanText);
  const education = detectEducation(lowered);
  const languages = skills.filter((skill) => skill.area === "Idioma").map((skill) => skill.name);
  const areaWeights = skills.reduce((acc, skill) => {
    acc[skill.area] = (acc[skill.area] || 0) + skill.hits;
    return acc;
  }, {});
  const primaryAreas = Object.entries(areaWeights)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([area]) => area);

  return {
    text: cleanText,
    email,
    phone,
    location,
    education,
    languages,
    skills,
    seniority,
    years,
    roles,
    primaryAreas,
    keywords: buildKeywords(cleanText, skills, roles),
  };
}

function detectSkills(text) {
  const lowered = ` ${fold(text)} `;
  const detected = [];

  skillLexicon.forEach((skill) => {
    const hits = skill.aliases.reduce((count, alias) => {
      const normalizedAlias = fold(alias);
      const escaped = normalizedAlias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern =
        normalizedAlias.trim().length <= 2
          ? new RegExp(`(?<![a-z0-9+.#])${escaped.trim()}(?![a-z0-9+.#])`, "g")
          : new RegExp(escaped, "g");
      return count + (lowered.match(pattern)?.length || 0);
    }, 0);

    if (hits > 0) {
      detected.push({ ...skill, hits });
    }
  });

  return detected.sort((a, b) => b.hits - a.hits || a.name.localeCompare(b.name));
}

function detectSeniority(text) {
  const lowered = fold(text);
  const years = detectYears(text);

  if (/estagi[aá]rio|internship|trainee/.test(lowered)) return "Estágio / Trainee";
  if (/junior|j[uú]nior|\bjr\b/.test(lowered) || years < 2) return "Júnior";
  if (/senior|s[eê]nior|\bsr\b|lead|staff|principal|especialista/.test(lowered) || years >= 7) return "Sênior";
  if (/pleno|mid-level|mid level/.test(lowered) || years >= 2) return "Pleno";

  return "Não identificada";
}

function detectYears(text) {
  const lowered = fold(text);
  const explicit = [...lowered.matchAll(/(\d{1,2})\s*(?:\+?\s*)?(?:anos|years)/g)].map((match) => Number(match[1]));
  const ranges = [...lowered.matchAll(/\b(19|20)\d{2}\b/g)].map((match) => Number(match[0]));

  if (explicit.length) return Math.max(...explicit);
  if (ranges.length >= 2) return Math.max(...ranges) - Math.min(...ranges);
  return 0;
}

function detectRoles(text) {
  const lowered = fold(text);
  return roleLexicon
    .map((item) => ({
      role: item.role,
      words: item.words,
      hits: item.words.reduce((count, word) => count + (lowered.includes(fold(word)) ? 1 : 0), 0),
    }))
    .filter((item) => item.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 4);
}

function detectLocation(text) {
  const lines = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 12);
  const locationLine = lines.find((line) =>
    /\b(brasil|s[aã]o paulo|rio de janeiro|belo horizonte|curitiba|porto alegre|recife|salvador|remoto|remote|h[ií]brido)\b/i.test(
      line,
    ),
  );

  return locationLine || "";
}

function detectEducation(lowered) {
  if (/p[oó]s-gradua|mba|mestrado|master|doutorado|phd/.test(lowered)) return "Pós-graduação ou superior";
  if (/bacharel|gradua|licenciatura|tecn[oó]logo|university|universidade|faculdade/.test(lowered)) return "Graduação";
  if (/t[eé]cnico|technical degree/.test(lowered)) return "Técnico";
  return "Não identificada";
}

function buildKeywords(text, skills, roles) {
  const words = fold(text)
    .replace(/[^a-z0-9+#. ]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !stopWords.has(word));

  const frequency = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});

  const frequent = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 16)
    .map(([word]) => word);

  return [...new Set([...skills.slice(0, 8).map((skill) => skill.name), ...roles.map((item) => item.role), ...frequent])];
}

async function fetchLiveJobMatches(profile) {
  const [term = "remote"] = buildSearchTerms(profile);
  const params = new URLSearchParams({ search: term, limit: "20" });
  const response = await fetch(`/api/jobs?${params.toString()}`);

  if (!response.ok) throw new Error("Falha ao buscar vagas ao vivo.");
  const data = await response.json();
  return (data.jobs || []).map(normalizeRemoteJob);
}

function buildSearchTerms(profile) {
  const roleTerms = profile.roles.map((item) => roleSearchTerms[item.role] || item.role);
  const skillTerms = profile.skills
    .filter((skill) => skill.area !== "Idioma")
    .slice(0, 5)
    .map((skill) => skill.name);

  return [...new Set([...roleTerms, ...skillTerms, "remote"])].filter(Boolean);
}

function normalizeRemoteJob(job) {
  const tags = Array.isArray(job.tags) ? job.tags.join(" ") : "";

  return {
    id: `remotive-${job.id}`,
    title: decodeHtml(job.title || "Vaga remota"),
    company: decodeHtml(job.company_name || "Empresa não informada"),
    location: decodeHtml(job.candidate_required_location || "Remoto"),
    workMode: "remote",
    type: formatJobType(job.job_type),
    salary: decodeHtml(job.salary || "Não informado"),
    source: "Remotive",
    url: job.url || "",
    category: decodeHtml(job.category || ""),
    publishedAt: job.publication_date || "",
    description: normalizeWhitespace(`${tags} ${stripHtml(job.description || "")}`),
  };
}

function formatJobType(type) {
  const map = {
    full_time: "Full-time",
    contract: "Contrato",
    part_time: "Part-time",
    freelance: "Freelance",
    internship: "Estágio",
  };
  return map[type] || type || "Não informado";
}

function addCustomJobs() {
  const raw = els.customJobs.value.trim();
  if (!raw) {
    showMessage("Cole a descrição de uma vaga para adicioná-la à análise.");
    return;
  }

  const chunks = raw
    .split(/\n\s*---\s*\n/g)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  const newJobs = chunks.map((description, index) => {
    const lines = description.split("\n").map((line) => line.trim()).filter(Boolean);
    const firstLine = lines[0] || `Vaga adicionada ${state.customJobs.length + index + 1}`;
    const [titlePart, companyPart] = firstLine.split(/\s+-\s+|\s+@\s+/);

    return {
      id: `custom-${Date.now()}-${index}`,
      title: titlePart || firstLine,
      company: companyPart || "Vaga adicionada",
      location: "Não informado",
      workMode: "any",
      type: "Manual",
      salary: "Não informado",
      source: "Adicionada por você",
      url: "",
      description,
    };
  });

  state.customJobs.push(...newJobs);
  els.customJobs.value = "";
  showMessage(`${newJobs.length} vaga(s) adicionada(s) à análise.`);
}

function scoreJob(profile, job) {
  const jobText = fold(`${job.title} ${job.company} ${job.category || ""} ${job.location} ${job.description}`);
  const matchedSkills = profile.skills.filter((skill) =>
    skill.aliases.some((alias) => jobText.includes(fold(alias).trim())),
  );
  const missingSkills = detectSkills(job.description)
    .filter((skill) => !profile.skills.some((profileSkill) => profileSkill.name === skill.name))
    .slice(0, 6);

  const roleHits = profile.roles.filter((role) => role.words?.some((word) => jobText.includes(fold(word))));
  const keywordHits = profile.keywords.filter((keyword) => jobText.includes(fold(keyword)));
  const seniorityScore = scoreSeniority(profile.seniority, jobText);
  const modeScore = scoreWorkMode(profile.workMode, job);
  const locationScore = scoreLocation(profile.location, job.location);
  const languageScore = scoreLanguage(profile, jobText);
  const educationScore = scoreEducation(profile.education, jobText);

  const skillScore = profile.skills.length ? matchedSkills.length / Math.min(profile.skills.length, 10) : 0;
  const roleScore = profile.roles.length ? Math.min(1, (roleHits.length + keywordHits.length / 8) / 3) : Math.min(1, keywordHits.length / 8);

  const score = Math.round(
    clamp(skillScore, 0, 1) * 42 +
      clamp(roleScore, 0, 1) * 24 +
      seniorityScore * 14 +
      modeScore * 8 +
      locationScore * 6 +
      languageScore * 4 +
      educationScore * 2,
  );

  return {
    ...job,
    score: clamp(score, 0, 100),
    matchedSkills: matchedSkills.slice(0, 8),
    missingSkills,
    keywordHits: keywordHits.slice(0, 8),
    reasons: buildReasons({ matchedSkills, keywordHits, seniorityScore, modeScore, locationScore, languageScore }),
  };
}

function scoreSeniority(profileSeniority, jobText) {
  if (profileSeniority === "Não identificada") return 0.55;
  const jobSeniority = detectSeniority(jobText);
  if (jobSeniority === "Não identificada") return 0.68;
  if (jobSeniority === profileSeniority) return 1;

  const order = ["Estágio / Trainee", "Júnior", "Pleno", "Sênior"];
  const distance = Math.abs(order.indexOf(profileSeniority) - order.indexOf(jobSeniority));
  return distance === 1 ? 0.62 : 0.28;
}

function scoreWorkMode(preference, job) {
  if (preference === "any" || job.workMode === "any") return 1;
  if (preference === job.workMode) return 1;
  if (preference === "hybrid" && job.workMode === "remote") return 0.72;
  if (preference === "remote" && /remote|remoto|worldwide|anywhere/i.test(job.location)) return 1;
  return 0.28;
}

function scoreLocation(profileLocation, jobLocation) {
  const profile = fold(profileLocation || "");
  const job = fold(jobLocation || "");
  if (!profile || !job) return 0.55;
  if (/worldwide|anywhere|global|remote|remoto/.test(job)) return 1;
  if (profile.includes("brasil") && /brazil|brasil|latam|latin america/.test(job)) return 1;
  if (profile.split(/[,\s]+/).some((part) => part.length > 3 && job.includes(part))) return 0.86;
  return 0.42;
}

function scoreLanguage(profile, jobText) {
  if (!/english|ingl[eê]s|spanish|espanhol/i.test(jobText)) return 0.72;
  if (profile.languages.length) return 1;
  return 0.35;
}

function scoreEducation(education, jobText) {
  if (!/degree|gradua|bacharel|bachelor|superior|faculdade|universidade|mba|master/i.test(jobText)) return 0.7;
  return education === "Não identificada" ? 0.4 : 1;
}

function buildReasons({ matchedSkills, keywordHits, seniorityScore, modeScore, locationScore, languageScore }) {
  const reasons = [];

  if (matchedSkills.length) {
    reasons.push(`Competências em comum: ${matchedSkills.slice(0, 5).map((skill) => skill.name).join(", ")}.`);
  }
  if (keywordHits.length) {
    reasons.push(`Termos relevantes encontrados: ${keywordHits.slice(0, 5).join(", ")}.`);
  }
  if (seniorityScore >= 0.9) reasons.push("Senioridade bem alinhada.");
  if (modeScore >= 0.9) reasons.push("Modelo de trabalho compatível.");
  if (locationScore >= 0.9) reasons.push("Localidade compatível.");
  if (languageScore >= 0.9) reasons.push("Idioma requisitado aparece no currículo.");

  return reasons.length ? reasons : ["Aderência baseada em palavras-chave gerais do currículo."];
}

function renderProfile(profile) {
  const roles = profile.roles.map((item) => item.role).join(", ") || "área principal não identificada";
  const skills = profile.skills.slice(0, 6).map((skill) => skill.name).join(", ") || "sem competências detectadas";
  const years = profile.years ? `${profile.years} ano(s)` : "experiência não identificada";

  els.seniorityMetric.textContent = profile.seniority;
  els.skillsMetric.textContent = String(profile.skills.length);
  els.profileSummary.textContent = [
    `Foco: ${roles}.`,
    `${years}. Principais skills: ${skills}.`,
  ]
    .filter(Boolean)
    .join(" ");

  els.skillsChips.innerHTML = profile.skills
    .slice(0, 10)
    .map((skill, index) => `<span class="chip ${index < 8 ? "strong" : ""}">${escapeHtml(skill.name)}</span>`)
    .join("");
}

function renderJobs() {
  const jobs = getVisibleJobs();
  els.jobsMetric.textContent = String(state.jobs.length);
  els.bestMetric.textContent = state.jobs.length ? `${state.jobs[0].score}%` : "-";

  if (!state.profile) {
    els.jobList.innerHTML = `<div class="empty-state">As vagas compatíveis aparecerão aqui depois da análise do currículo.</div>`;
    refreshIcons();
    return;
  }

  if (!jobs.length) {
    els.jobList.innerHTML = `<div class="empty-state">Nenhuma vaga ficou dentro do filtro atual. Ajuste a busca ou reduza o nível de aderência.</div>`;
    refreshIcons();
    return;
  }

  els.jobList.innerHTML = jobs.map(renderJobCard).join("");
  refreshIcons();
}

function getVisibleJobs() {
  return state.jobs.filter((job) => {
    const matchesScore = job.score >= state.filteredMinScore;
    const text = fold(`${job.title} ${job.company} ${job.description} ${job.location}`);
    const matchesFilter = !state.filterText || text.includes(fold(state.filterText));
    return matchesScore && matchesFilter;
  });
}

function renderJobCard(job, index) {
  const scoreClass = job.score >= 80 ? "high" : job.score >= 60 ? "medium" : "low";
  const isTop = index === 0 && job.score >= 70;
  const matched = job.matchedSkills.slice(0, 6);
  const missing = job.missingSkills.length
    ? `Reforçar: ${job.missingSkills.slice(0, 3).map((skill) => skill.name).join(", ")}.`
    : "Sem lacunas críticas detectadas.";
  const url = job.url
    ? `<a href="${escapeAttribute(job.url)}" target="_blank" rel="noreferrer">Ver vaga</a>`
    : `<span class="source-note">Sem link externo</span>`;
  const sourceNote = `Fonte: ${escapeHtml(job.source)}.`;
  const mainReason = job.reasons[0] || "Aderência calculada pelo currículo.";

  return `
    <article class="job-card ${isTop ? "top-match" : ""}">
      <div class="job-header">
        <div>
          <h3 class="job-title">${escapeHtml(job.title)}</h3>
          <p class="company-name">${escapeHtml(job.company)}</p>
        </div>
        <div class="score-badge ${scoreClass}" aria-label="Aderência ${job.score}%">${job.score}%</div>
      </div>
      <div class="job-meta">
        ${job.location ? `<span class="meta-pill">${escapeHtml(job.location)}</span>` : ""}
        ${job.type ? `<span class="meta-pill">${escapeHtml(job.type)}</span>` : ""}
      </div>
      <p class="job-insight">${escapeHtml(mainReason)} ${escapeHtml(missing)}</p>
      <div class="skill-row">
        ${
          matched.length
            ? matched.map((skill) => `<span class="chip strong">${escapeHtml(skill.name)}</span>`).join("")
            : `<span class="chip">Poucas skills explícitas em comum</span>`
        }
      </div>
      <div class="source-row">
        <span class="source-note">${sourceNote}</span>
        ${url}
      </div>
    </article>
  `;
}

function buildProfileText(profile) {
  return [
    `Senioridade: ${profile.seniority}`,
    `Áreas: ${profile.roles.map((item) => item.role).join(", ")}`,
    `Competências: ${profile.skills.map((skill) => skill.name).join(", ")}`,
    `Localidade: ${profile.location || "não identificada"}`,
    `Formação: ${profile.education}`,
  ].join("\n");
}

function dedupeJobs(jobs) {
  const seen = new Set();
  return jobs.filter((job) => {
    const key = fold(`${job.title}-${job.company}`).replace(/\s+/g, "-");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function normalizeWhitespace(text) {
  return text
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return normalizeWhitespace(doc.body.textContent || "");
}

function decodeHtml(value) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function fold(value) {
  return String(value)
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function setStatus(text, type = "") {
  els.parserStatus.textContent = text;
  els.parserStatus.className = `status-pill ${type}`.trim();
}

function showMessage(text) {
  els.messageBanner.textContent = text;
  els.messageBanner.hidden = false;
}

function hideMessage() {
  els.messageBanner.hidden = true;
  els.messageBanner.textContent = "";
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons({ attrs: { "stroke-width": 2 } });
  }
}

window.addEventListener("load", refreshIcons);

const roleSearchTerms = {
  "Desenvolvimento Frontend": "frontend react",
  "Desenvolvimento Backend": "backend api",
  "Full Stack": "full stack developer",
  "Dados e BI": "data analyst",
  "Ciência de Dados / IA": "machine learning",
  "DevOps / Cloud": "devops cloud",
  "QA / Testes": "qa automation",
  Produto: "product manager",
  "UX/UI Design": "ux ui designer",
  "Marketing / Growth": "growth marketing",
  "Customer Success / Suporte": "customer success",
};

const stopWords = new Set([
  "para",
  "com",
  "uma",
  "como",
  "mais",
  "dos",
  "das",
  "por",
  "que",
  "seu",
  "sua",
  "seus",
  "suas",
  "and",
  "the",
  "with",
  "from",
  "this",
  "that",
  "will",
  "have",
  "experiencia",
  "desenvolvimento",
  "profissional",
  "projetos",
  "empresa",
  "time",
  "anos",
]);
