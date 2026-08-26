# MerchantOS: AI-Driven Commerce Operator 🚀

MerchantOS is a full-stack, enterprise-grade AI Commerce Copilot designed to help modern online merchants optimize workflows, automate dynamic inventory bundles, auto-generate marketing campaigns, and review smart checkout up-selling pipelines natively through high-context chat and automated monitoring tools.

---

## 🏗️ Architecture & Technical Stack

The ecosystem is engineered using strict separation of concerns, decoupling long-running database transactions from highly interactive customer interfaces.

### 💻 Frontend Architecture (`/frontend`)
*   **Core Framework:** Next.js 16 (App Router) + React 19 + TypeScript.
*   **Styling Engine:** Tailwind CSS v4 + PostCSS for highly-performant atomic styles.
*   **Component Architecture:** Radix UI / Base UI headless primitives wrapped natively via **Shadcn UI** component design patterns.
*   **State & Tooling:** Schema validation through Zod paired with React Hook Form handling multi-step interactive state modifications safely.

### ⚙️ Backend Engine (`/backend`)
*   **API Runtime:** FastAPI for ultra-low latency request handling and automated OpenAPI interactive schema indexing.
*   **ORM Layer:** SQLAlchemy 2.0 leveraging a modular Repository & Service Pattern.
*   **Data Tier:** PostgreSQL 16 provisioned cleanly inside reproducible container runtimes.
*   **Database Versioning:** Full schema mutation tracking handled reliably via Alembic multi-step database migrations.

---

## 📂 Project Structural Design

```text
merchant-os/
├── docker-compose.yml       # Local PostgreSQL database orchestrator
├── backend/                 # Engine APIs & Core Architecture
│   ├── app/
│   │   ├── api/             # HTTP Route definitions & Controllers
│   │   ├── core/            # Application config dependencies & main engine
│   │   ├── database/        # Shared core base classes & context dependencies
│   │   ├── models/          # Declarative SQLAlchemy database schemas
│   │   ├── repositories/    # Encapsulated direct database access layers
│   │   ├── schemas/         # Strict bidirectional Pydantic data models
│   │   └── services/        # Business logic orchestrators
│   ├── alembic/             # Sequential migration tracking scripts
│   ├── scripts/             # Mock business data seed engines
│   └── requirements.txt     # Locked production backend requirements
└── frontend/                # Next.js Application Context
    ├── app/                 # Next.js App Router workspace
    ├── components/          # Domain-driven layout and UI primitives
    ├── hooks/               # Custom lifecycle state adapters
    └── types/               # Rigid global TypeScript interface specs
```

---

## 🗄️ Database Schema & Entities

The relational database architecture handles core data tracking using transactional referential integrity:

┌───────────────┐│   Merchants   │◄────────────────────────────────────────┐└───────┬───────┘                                         ││ (1:N)                                           │┌───────▼───────┐             ┌──────────────┐            │ (1:N)│   Products    │◄───(1:N)────┤  OrderItems  │            │└───────────────┘             └──────┬───────┘            ││ (N:1)              │┌───────────────┐             ┌──────▼───────┐            ││   Customers   │◄───(1:N)────┤    Orders    ├────────────┤└───────┬───────┘             └──────────────┘            ││                                                 │└────────────────────(1:N)────────────────────────┼───┐│   │┌────────▼───┴──┐│Conversations  │└────────┬──────┘│ (1:N)┌────────▼──────┐│   Messages    │└───────────────┘
*   **Merchants:** Business identities, email validation rules, industry categorizations, and localized parameters.
*   **Products:** SKUs, category properties, inventory levels, and precision decimal cost margins.
*   **Customers:** Merchant-owned client graphs tracking personal configurations and historical parameters.
*   **Orders & OrderItems:** Real-time billing state workflows tracking transactional amounts and item relationships.
*   **AI Recommendations:** Dynamic opportunities tracking titles, descriptions, action variations, and projected revenue targets.
*   **Audit Logs:** Transparent AI safety ledgers keeping track of specific recommendations, approval states, and actions.
*   **Conversations & Messages:** Persistent AI Chat streams maintaining context between merchants and backend copilots.

---

## 📡 API Endpoints Index

Once running, interactive API specifications are available at `http://localhost:8000/docs`.

### 💬 Chat Services (`/chat`)
*   `POST /chat` - Submits a merchant request to process high-context actions.
*   `GET /chat/history/{merchant_id}` - Extracts complete chat histories for a merchant.
*   `GET /chat/conversation/{conversation_id}` - Resolves individual message history logs.

### 📦 Product Catalog Services (`/products`)
*   `GET /products` - Extracts all registered products.
*   `GET /products/low-stock` - Filters catalog elements falling below standard inventory metrics.
*   `GET /products/category/{category}` - Category-specific index extraction routes.

### 📣 Marketing Campaign Automation (`/campaigns`)
*   `GET /campaigns` - Fetches all campaigns.
*   `GET /campaigns/running` - Filters actively serving audience campaigns.
*   `GET /campaigns/drafts` - Reviews pending staging workflows.

### 📊 Metric & Governance Management (`/dashboard`, `/checkout`, `/audit`)
*   `GET /dashboard` - Resolves high-level performance metrics, trends, and opportunities.
*   `GET /checkout` - Reviews conversion rates and potential up-sell revenue.
*   `GET /audit` - Core oversight center tracking AI actions, metrics, and safety flags.

---

## 🛠️ Step-by-Step Local Deployment

Follow these steps to spin up the entire MerchantOS application environment locally:

### Prerequisites
*   Docker & Docker Compose installed.
*   Python 3.11+ runtime ecosystem.
*   Node.js 20+ package runner environment.

### 1. Database Provisioning
Launch your isolated PostgreSQL 16 database server via container orchestration:
```bash
docker compose up -d
```
*This spins up a localized instance running on port `5432` with credentials matching your configuration layers.*

### 2. Backend Installation & Activation
Navigate into your backend app layout, establish virtual environment dependencies, and map local files:
```bash
cd backend
python -m venv venv

# Windows Environment Activation
.\venv\Scripts\activate
# Unix/macOS Environment Activation
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
```
*Ensure that your `.env` configuration file contains your `DATABASE_URL` target:*
```env
DATABASE_URL=yr_url
```

### 3. Database Schema Migration & Seeding
Execute your database version tracking scripts via Alembic to map table schemas, then seed structural mock data variables:
```bash
# Execute structural schema migration files
alembic upgrade head

# Inject localized merchant system database seeds
python -m scripts.seed
```

### 4. Running Backend Server
Launch your Uvicorn development server instance:
```bash
uvicorn app.main:app --reload --port 8000
```
*The backend API server will listen on `http://localhost:8000`.*

### 5. Frontend UI Deployment
Open an independent terminal panel, step into your frontend folder layout, install package dependencies, and run the development environment:
```bash
cd frontend
npm install
npm run dev
```
*Open your browser to `http://localhost:3000` to review your AI Merchant Operatin