# THE PROJECT BRIEF #

# Project Name #

LEARNING PATH GENERATOR


# Product Description / Presentation #


LEARNING PATH GENERATOR

AI‑driven, role‑based upskilling with adaptive plans and verifiable sources

Product description / presentation
An AI system that creates personalized, skill‑based learning paths for employees and learners. It ingests goals, role frameworks, prior knowledge (CV/LinkedIn/GitHub/LMS history), and enterprise knowledge to compose a sequenced, time‑bound plan. The plan continuously adapts using diagnostics and mastery signals, recommends the best content across providers (with licenses respected), and auto‑schedules learning in the user’s calendar. Everything is cited, explainable, and auditable for L&D and compliance.
What it does
•	Maps user goals to a skill graph and prerequisite tree; builds a sequenced plan under time and deadline constraints.
•	Finds the best resources (courses, videos, docs, projects) via RAG over curated catalogs and internal content; cites sources.
•	Assesses mastery with diagnostics, inline quizzes, code challenges, and generates targeted remediation.
•	Schedules study blocks via calendar integration; nudges via Slack/Teams; supports micro‑learning.
•	Explains decisions: why a step is in the plan, which skills it unlocks, and what evidence supports it.
Key features
•	Skill Graph & Prerequisite Engine with constraint‑aware path planning (time budget, deadlines, difficulty).
•	Adaptive Loop: diagnostics → plan → learn → assess → re‑plan; learner‑specific difficulty and spacing.
•	Content Intelligence: de‑dupe, quality scoring, license tagging, cost/benefit ranking, multilingual support.
•	Coach Agent: chat assistant grounded in the learner’s plan and org policies; generates summaries and flashcards.
•	Team Analytics: skill coverage heatmaps, time‑to‑proficiency, ROI dashboards for L&D leaders.
Why people/teams love it
•	Cuts ramp time and increases certification pass rates with measurable, explainable plans.
•	Vendor‑agnostic: works with your existing LMS/LRS and content subscriptions.
•	Enterprise‑ready: multi‑tenant, SSO/SCIM, RBAC, audit logs, and data residency controls.
Framework choice and why
•	Orchestration: LangGraph on LangChain for deterministic, resumable flows (diagnose → retrieve → plan → verify → schedule → adapt).
•	Grounding: Retrieval‑Augmented Generation (RAG) with pgvector; hybrid BM25+vector search and cross‑encoder re‑ranking.
•	Models: OpenAI GPT‑4/4o for structured planning & tool calling; Anthropic Claude for critique/explanations (champion‑challenger).
•	Why: LangGraph provides explicit state, human‑in‑the‑loop gates, retries, and time‑travel checkpoints—ideal for safety‑critical planning.
1. BACKEND ARCHITECTURE (extensive)
Service layout
•	FastAPI (async) monorepo modules: /auth, /tenants, /learners, /skills, /content, /ingest, /rag, /planner, /assess, /coach, /calendar, /integrations, /analytics, /admin.
•	Routers: auth, users, learners, plans, steps, assessments, items, providers, embeddings, citations, schedules, webhooks, events.
•	Background workers (Redis queues) for ingestion, embedding, assessment grading, plan recompute, notification sends.
Data model (PostgreSQL + pgvector)
•	tenants(id, name, region, settings jsonb), users(id, tenant_id, role, sso_id).
•	skills(id, slug, label, description, tags[], domain, level_range), skill_edges(src_skill_id, dst_skill_id, relation, weight).
•	learners(id, tenant_id, profile jsonb, goals jsonb, time_budget_hours, locale, preferences jsonb, prior_evidence jsonb).
•	content_providers(id, kind, api_key_ref, license, cost_model), content_items(id, provider_id, uri, title, type, duration_min, level, language, cost, license, tags[], metadata jsonb).
•	documents(id, tenant_id, source_uri, snapshot_uri, text_uri, hash, metadata), chunks(id, document_id, text, embedding vector, offsets).
•	plans(id, learner_id, objective, created_at, due_at, status), plan_steps(id, plan_id, skill_id, content_item_id, kind, effort_min, sequence, status, due_at).
•	assessments(id, learner_id, skill_id, type, spec jsonb), assessment_attempts(id, assessment_id, score, mastery_prob, details jsonb).
•	citations(id, step_id or message_id, document_id, quote, span_start, span_end, url, confidence).
•	cal_events(id, learner_id, plan_step_id, provider, external_id, start_at, end_at, status).
Ingestion & catalog pipeline
•	Connectors: Open edX/Canvas catalogs, LinkedIn Learning/Udemy/Coursera (where permitted), YouTube playlists, internal SharePoint/Google Drive/Confluence/Notion.
•	Normalization: de‑duplication, language detection, transcript extraction, table/heading‑aware chunking, license tagging.
•	Embedding & indexing: pgvector with IVFFlat/HNSW; hybrid retrieval (BM25 via pg_trgm).
RAG & recommendation
•	Query expansion via few‑shot prompts + domain tags; filters by license, cost, level, duration, language.
•	Cross‑encoder re‑ranking for pedagogical fit; cold‑start heuristic when little history exists.
•	All recommendations return citations and confidence; low confidence triggers human‑curated fallback sets.
Path planning & adaptation
•	Prerequisite resolution via graph topological sort; constraint solver (deadline/time budget/difficulty).
•	Spaced repetition scheduling; mastery‑based progression with Bayesian Knowledge Tracing (BKT) style updates.
•	On assessment events, recompute mastery per skill, insert remedial micro‑steps, and reflow schedule.
Assessments & grading
•	Diagnostics (pre‑tests), formative quizzes, code challenges (containerized execution), rubric‑based project reviews.
•	Auto‑item generation with content grounding; storage of item difficulty and discrimination parameters (IRT‑friendly).
APIs & protocols
•	REST: /learners, /skills, /plans, /steps, /content/search, /assessments, /attempts, /calendar, /coach, /citations.
•	WebSockets: /ws/coach (token stream), /ws/progress (plan/step updates).
•	Webhooks: assessment.completed, plan.recomputed, calendar.synced, ingestion.done.
Workers & caching
•	Redis‑backed queues for ingestion, embeddings, assessment grading, re‑planning, and notifications.
•	Short‑lived caches for content search and plan previews; TTL keyed by tenant and filters.
2. FRONTEND ARCHITECTURE
•	Next.js 14 (App Router) routes: /(dashboard), /(plan), /(catalog), /(assess), /(coach), /(admin), /(settings).
•	State: React Query for server state; Zustand for UI; optimistic updates on step completion.
•	Components: PlanTimeline, SkillGraphView, ContentCard, StepDetailDrawer, AssessmentPlayer, CoachChat, CalendarBuilder, CitationSidebar, ProviderConnector.
•	Real‑time: token streaming for CoachChat; live progress sockets; background sync for offline step notes.
•	Internationalization: i18n routing, RTL support; date/number formatting per locale.
•	Accessibility: WCAG 2.1 AA, keyboard‑only flows, captions/transcripts for media, color‑contrast tokens.
3. DESIGN REQUIREMENTS (UI/UX)
•	Trust & clarity: every recommendation shows why (skill targets, time cost) and citations with source badges.
•	Low‑friction onboarding: import goals from templates (e.g., 'Data Analyst ramp'), import history from LMS/LinkedIn.
•	Progress visualization: mastery per skill, burn‑down of remaining hours, calendar overlays.
•	Coach ergonomics: slash‑commands (/summarize, /quiz, /explain), expandable plan diffs after re‑planning.
•	Theme: clean neutrals with accent color; dark/light and high‑contrast modes; subtle micro‑interactions.
4. CORE INTEGRATIONS
•	SSO/SCIM: Okta, Azure AD, Google Workspace (OIDC/SAML; user provisioning via SCIM).
•	LMS/LRS: Canvas, Moodle, Blackboard, Cornerstone; xAPI/SCORM 1.2/2004 streams to LRS (Learning Locker).
•	Content providers: LinkedIn Learning, Coursera, Udemy Business, edX/Open edX, YouTube, arXiv, internal KBs.
•	Calendars & chat: Google Calendar, Microsoft 365, Slack, Microsoft Teams for nudges and reminders.
•	HRIS (optional): Workday/SuccessFactors for role frameworks and competency models.
•	Payments (optional B2C): Stripe for subscription and per‑seat licensing.
5. DELIVERABLES REQUIRED
•	Next.js frontend with Dashboard, Plan, Catalog, Assess, Coach, and Admin screens.
•	FastAPI backend with LangGraph planners, RAG search, assessment engine, and calendar/SSO connectors.
•	PostgreSQL schema + pgvector indexes + Alembic migrations; seed data for sample skills/content.
•	Connectors: at least one LMS (Canvas) and one calendar (Google) with sample configs.
•	KB ingestion CLI + workers; demo content snapshots and embeddings.
•	OpenAPI docs, Claude.md (prompts as code), and Admin runbooks for tenants and providers.
6. SUCCESS CRITERIA
•	Plan generation returns citations and constraint‑aware schedule for ≥95% of standard role templates.
•	Adaptive loop closes within one interaction (assessment triggers re‑plan with visible diff).
•	All content items respect license filters and tenant availability; no dead links in top results.
•	Explainability: each step has a reason string and skill targets; coach answers grounded with sources.
7. IMPLEMENTATION GUIDELINES
•	Typed contracts: Pydantic v2 models for Plan, Step, Skill, ContentItem, AssessmentAttempt, Citation.
•	Prompts‑as‑code with versioning; function‑calling outputs only; enforce JSON schemas server‑side.
•	Chunking policy: heading/table‑aware; store source offsets for highlightable quotes in UI.
•	Planning policy: if constraints conflict, propose alternatives (extend deadline, reduce scope) before finalizing.
•	Rate limits & backoff for third‑party APIs; idempotency keys for calendar and LMS writes.
8. SECURITY & COMPLIANCE
•	RBAC and tenant isolation; short‑lived JWT access tokens + rotating refresh; per‑tenant KMS secrets.
•	Encryption in transit (TLS 1.2+) and at rest (AES‑256). Field‑level encryption for PII.
•	Privacy: GDPR/CCPA tooling (export/delete data); FERPA‑aware for EDU tenants; data residency by region.
•	Audit trails for plan changes, assessments, and external writes (calendar/LMS).
•	Content compliance: store license metadata; block use of unlicensed premium content in plans.
Claude — 5 critical prompts (repo pre‑initialized)
PROMPT 1 — PROJECT SETUP & ARCHITECTURE (use existing scaffold)
Assume the monorepo already contains Next.js 14, FastAPI, PostgreSQL (+pgvector), Redis, and LangGraph/LangChain wiring. Do NOT change the stack. Generate only NEW/MODIFIED files as unified diffs. Add Alembic migrations for all tables described here (skills, skill_edges, learners, content_providers, content_items, documents, chunks, plans, plan_steps, assessments, assessment_attempts, citations, cal_events). Output: file tree, diffs, and .env.example additions.
PROMPT 2 — CORE BACKEND (RAG + Planner + Assess)
Implement endpoints: /skills, /content/search (filters+hybrid search), /plans (create from goal+constraints), /steps, /assessments, /attempts, /coach. Implement workers for ingestion, embeddings, plan recompute, and assessment grading. Return structured JSON with fields: plan{id, steps[]}, citations[], mastery{}, schedule{}, and reasons[]. Provide curl examples.
PROMPT 3 — FRONTEND (Plan, Catalog, Assess, Coach)
Build PlanTimeline, SkillGraphView, ContentCard, AssessmentPlayer, CoachChat, CalendarBuilder, and CitationSidebar. Wire streaming tokens to CoachChat and live updates for plan recompute. Provide route map and component diffs.
PROMPT 4 — AI LOGIC (LangGraph agents & policies)
Create agents: Diagnostician, Retriever, Planner, Verifier, Scheduler, Explainer. Policies: enforce citations for any recommendation; handle constraint conflicts; re‑plan on low mastery. Provide prompt templates and graph diagram (markdown).
PROMPT 5 — DEPLOYMENT & SEEDS
Provide Dockerfiles, Vercel/Render configs, seed scripts (skills, content, sample learners), and make targets. Include rate limits, idempotency helpers, and signed URL utilities. Output run commands and health checks.



FOLLOW THIS 8 STEP PLAN TO PREPARE THE INFRASTRUCTURE
-----------------------------------------------------

# 🚀 Claude Fullstack Repo Prep – Optimized 8 Step Plan

  
The goal: build an extensive frontend + backend scaffold so Claude Code only has to finish ~20% of the work.  
Each step must be **completed and reviewed** before advancing.
IMPORTANT: YOU ARE BUILDING ONLY THE INFRASTRUCTURE OF THE APPLICATION NOT THE APPLICATION ITSELF !!!. FOLLOW THE STEPS IN NUMERICAL ORDER !!! starting from step 1.
You are doing the groundwork for the application, including setting up the folder structure, configuration files, and any necessary boilerplate code.
IMPORTANT: the checklist in each step has to be checked off 100% before moving to the next step

---

## STEP 1 — Build the Rich Infrastructure
Create a **deep scaffold** for both frontend and backend so Claude code can recognize the architecture immediately.

- Build a **frontend app shell** with routing, placeholder pages, components, and styling setup.  
- Build a **backend app shell** with API structure, health endpoint, and config in place.  
- Include `REPO_MAP.md`, `API_SPEC.md`, and a draft `CLAUDE.md` in the `docs/` folder.  (create the docs folder if it does not exist)
- Add **TODO markers and folder-level `_INSTRUCTIONS.md`** files so Claude knows exactly where to add logic.

**Deliverables**
- Frontend app shell with routing, placeholder pages, components, and styling setup  
- Backend app shell with API structure, health endpoint, and config  
- `docs/REPO_MAP.md`, `docs/API_SPEC.md` (stub), and draft `docs/CLAUDE.md`  
- TODO markers + folder-level `_INSTRUCTIONS.md` files  

**Checklist**
- [ ] Frontend scaffold built  
- [ ] Backend scaffold built 
- [ ] Docs folder created with drafts (`REPO_MAP.md`, `API_SPEC.md`, `CLAUDE.md`)  
- [ ] TODO markers and `_INSTRUCTIONS.md` stubs in place  

---

## STEP 2 — Enrich the Scaffold
If the repo looks shallow, enrich it so Claude needs fewer leaps of imagination.  

Add:
- Sample frontend routes and components (`/`, `/about`, `/dashboard`)  
- Domain model stubs and types/interfaces  
- Mock data + fixtures for UI flows  
- README files with quick run instructions for both frontend and backend  
- Instructions embedded in folders (e.g. `CLAUDE_TASK: …`)

**Deliverables**
- Sample routes and pages (`/`, `/about`, `/dashboard`)  
- Domain model stubs and type definitions  
- Mock data and fixtures for UI flows  
- README files for frontend and backend with run instructions  
- Folder-level instructions (`_INSTRUCTIONS.md`)  

**Checklist**
- [ ] At least 2–3 sample routes/pages exist  
- [ ] Domain types/interfaces stubbed out  
- [ ] Mock data + fixtures included  
- [ ] README_FRONTEND.md and README_BACKEND.md added  
- [ ] Each folder has `_INSTRUCTIONS.md` where relevant 

---

## STEP 3 — Audit for Alignment
Check that the scaffold actually matches the product brief, tech specs, and UX goals.
Add additional UI/UX elements (if needed) to make the application visually appealing (and update the design requirements after that)

- Do navigation and pages reflect the product’s main flows?  
- Do API endpoints match the UI needs?  
- Is the chosen tech stack consistent (no unused or conflicting libraries)?  
- Is the UX direction reflected (design tokens, layout, component stubs)?

**Deliverables**
- Alignment review across Product ↔ UI/UX ↔ Tech  
- Identify any missing flows, mismatched libraries, or conflicting instructions  

**Checklist**
- [ ] Navigation structure matches product journeys  
- [ ] Components/pages map to required features  
- [ ] API endpoints cover MVP needs  
- [ ] No contradictory or unused technologies  

---

## STEP 4 — Document the Architecture
Now make the docs **Claude-ready**:

- **REPO_MAP.md**: Full repo breakdown with roles of each folder  
- **API_SPEC.md**: Endpoints, payloads, error handling  
- **CLAUDE.md**: Editing rules, coding conventions, AI collaboration guidelines  

These three files are the **context backbone** Claude will use to understand the repo.

**Deliverables**
- `REPO_MAP.md`: full repo breakdown with folder purposes  
- `API_SPEC.md`: endpoints, models, error conventions  
- `CLAUDE.md`: collaboration rules, editing boundaries  

**Checklist**
- [ ] REPO_MAP.md fully describes structure  
- [ ] API_SPEC.md covers all MVP endpoints and schemas  
- [ ] CLAUDE.md includes project overview, editing rules, examples  

---

## STEP 5 — Improve the Prompt
Enhance the prompt (in `docs/PROMPT_DECLARATION.md`) with details Claude needs:

- FE/BE boundaries and data contracts  
- UX guidelines (states, accessibility, interaction patterns)  
- Performance budgets (bundle size, API latency)  
- Security constraints (auth, rate limits, PII handling)  
- Testing expectations (unit, integration, end-to-end)

**Deliverables**
- FE/BE boundaries and contracts  
- UX guidelines (states, accessibility, patterns)  
- Performance budgets (bundle size, latency targets)  
- Security constraints (auth, PII, rate limits)  
- Testing expectations  

**Checklist**
- [ ] Prompt includes FE/BE division of responsibility  
- [ ] UX principles and design tokens specified  
- [ ] Performance/security/testing requirements added  
- [ ] Prompt is concrete and actionable for Claude  

---

## STEP 6 — Expert Audit of the Prompt
Now do a **meticulous audit** of the one-page prompt declaration.

- Add Frontend Architecture, Backend Architecture, Design requirements, Core Integrations, Success Criteria, Implementation Guidelines and Security & Compliance categories from this Project Brief to the prompt declaration.
- Remove inconsistencies, duplicates, or unused technologies  
- Ensure Tech Stack → Product → Scaffold alignment (no mismatches)  
- Add UI/UX details that make the product visually appealing and usable  
- Double-check frontend and backend folders are ready  
- Confirm editing boundaries are clear (what Claude can/can’t touch)  
- Make the declaration **battle-tested and handoff-ready**

**Deliverables**
- Remove inconsistencies/duplicates  
- Ensure stack ↔ product ↔ scaffold alignment  
- Add UI/UX and accessibility details  
- Clarify file boundaries (editable vs do-not-touch)  
- Confirm prompt uses Claude-friendly syntax  

**Checklist**
- [ ] No unused or contradictory tech remains  
- [ ] UI/UX directives are product-specific and sufficient  
- [ ] Editing boundaries explicitly defined  
- [ ] Prompt syntax uses clear, imperative instructions  

---

## STEP 7 — Bird’s-Eye Repo Review
Do a quick top-level scan for missing pieces:

- All folders contain either code or `_INSTRUCTIONS.md`  
- `.env.example` files exist for both frontend and backend  
- CI/CD config is present and not trivially broken  
- Run scripts (`npm run dev`, `uvicorn …`) work end-to-end  
- No orphan TODOs without clear ownership

**Deliverables**
- Verify all core files exist  
- Confirm environment, CI, and scripts work end-to-end  

**Checklist**
- [ ] Every folder has code or `_INSTRUCTIONS.md`  
- [ ] `.env.example` present for both frontend and backend  
- [ ] CI pipeline triggers and passes basic checks  
- [ ] Dev script (`scripts/dev.sh`) runs both FE and BE  

---

## STEP 8 — Finalize CLAUDE.md
This is where Claude gets its **onboarding pack**. Make sure `CLAUDE.md` includes:

- **Project Overview**: one-paragraph purpose, stack, goals, target users  
- **Folder & File Structure**: what’s editable vs do-not-touch  
- **Coding Conventions**: style guides, naming rules, commenting expectations  
- **AI Collaboration Rules**: response format, edit rules, ambiguity handling  
- **Editing Rules**: full-file vs patches, locked files  
- **Dependencies & Setup**: frameworks, services, env vars  
- **Workflow & Tools**: how to run locally, FE/BE boundary, deployment notes  
- **Contextual Knowledge**: product quirks, domain rules, business logic caveats  
- **Examples**: good vs bad AI answer

**Deliverables**
- Project overview (purpose, stack, goals, users)  
- Folder & file structure with editable vs do-not-touch  
- Coding conventions (style, naming, commenting)  
- AI collaboration rules (response style, edit rules, ambiguity handling)  
- Dependencies and setup instructions  
- Workflow, deployment notes, contextual knowledge  
- Good vs bad answer examples  
- Fill out all the missing information in the CLAUDE.md file

**Checklist**
- [ ] Project overview section filled in  
- [ ] File boundaries clearly defined  
- [ ] Coding/style conventions included  
- [ ] AI collaboration & editing rules written  
- [ ] Dependencies & env notes covered  
- [ ] Workflow & deployment info added  
- [ ] Contextual knowledge documented  
- [ ] Good vs bad examples included  
- [ ] CLAUDE.md file does not miss any important information

---

# ✅ Outcome
When this 8-step plan is followed:
- The repo is a **rich, opinionated scaffold** (80% done).  
- Docs give Claude **clear boundaries + context**.  
- The one-page prompt is **battle-tested** and aligned.  
- Claude Code can safely and efficiently generate the missing 20%.  











