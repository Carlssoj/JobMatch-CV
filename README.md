# JobMatch CV

Sistema web local para ler um currículo, extrair sinais de perfil profissional e ranquear vagas compatíveis.

## Como rodar

Com Node instalado:

```bash
node server.mjs
```

Depois abra:

```text
http://localhost:4173
```

Com Docker:

```powershell
docker compose up --build
```

Depois abra:

```text
http://localhost:4173
```

Para parar, pressione `Ctrl+C` no terminal. Se quiser remover o container depois:

```powershell
docker compose down
```

## Recursos

- Leitura de currículos em PDF, DOCX, TXT, MD ou RTF.
- Extração de senioridade, competências, idiomas, formação, localidade e áreas prováveis.
- Ranking de vagas por compatibilidade com explicação de aderência e pontos a reforçar.
- Busca sob demanda na API pública da Remotive, com fonte e link de retorno.
- Base local de vagas e campo para adicionar descrições próprias.

## Observações

A extração acontece no navegador. A busca remota usa um pequeno proxy local em `server.mjs` para evitar problemas de CORS e manter a chamada à Remotive sob demanda.

## Quality Gate

O safepoint do projeto é o comando:

```bash
node scripts/quality-gate.mjs
```

Ele valida sintaxe JavaScript e sobe o servidor local para testar a home, o bundle do app e o CSS. No GitHub, o mesmo gate roda em `pull_request` e em push para `main` pelo workflow `.github/workflows/quality-gate.yml`.

Com Docker, rode o mesmo gate assim:

```powershell
docker compose run --rm jobmatch-cv node scripts/quality-gate.mjs
```

Para incluir também a checagem externa da Remotive no ambiente local:

PowerShell:

```powershell
$env:CHECK_LIVE_JOBS = "1"
node scripts/quality-gate.mjs
Remove-Item Env:\CHECK_LIVE_JOBS
```

Bash:

```bash
CHECK_LIVE_JOBS=1 node scripts/quality-gate.mjs
```
