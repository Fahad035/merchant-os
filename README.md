# 🚀 MerchantOS – AI Commerce Copilot

MerchantOS is a full-stack AI-powered ecommerce management platform that helps merchants manage products, customers, campaigns, orders, checkout, analytics, and AI-generated business recommendations from a single dashboard.

> Built with **Next.js 16**, **FastAPI**, **PostgreSQL (Neon)**, **Gemini AI**, **Razorpay**, and deployed on **Vercel + Render**.

---

# 🌐 Live Demo

### Frontend
https://merchant-os-flax.vercel.app

### Backend API
https://merchant-os-34yh.onrender.com

---

# ✨ Features

## Authentication

- Merchant Signup
- Merchant Login
- Secure JWT Authentication
- HttpOnly Cookie Authentication
- Protected Dashboard
- Logout

---

## Dashboard

- Revenue Analytics
- Orders Overview
- Conversion Rate
- Opportunity Tracking
- Revenue Charts
- Recent Orders
- AI Insights
- AI Action Center

---

## Product Management

- Product Catalog
- Inventory Tracking
- Stock Management
- Product CRUD APIs

---

## Customer Management

- Customer Database
- Purchase History
- Customer Analytics

---

## Orders

- Order Management
- Order Items
- Order Status
- Revenue Calculation

---

## AI Recommendations

Powered by **Google Gemini**

Examples:

- Increase stock
- Create discount campaign
- Remove slow-moving inventory
- Improve conversion
- Marketing suggestions

Recommendations can be:

- Approved
- Rejected
- Executed

---

## Campaign Management

- Marketing Campaigns
- Campaign Status
- Campaign Analytics

---

## Checkout

- Razorpay Integration
- Secure Payments
- Order Creation

---

## Audit Logs

Every important merchant action is logged.

Examples:

- Product created
- Campaign executed
- Recommendation approved
- Recommendation rejected

---

## Merchant Settings

- Business Profile
- Preferences
- Merchant Information

---

# 🏗 Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Axios
- React Hook Form
- Zod
- Recharts
- Lucide Icons

---

## Backend

- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL
- JWT
- Bcrypt
- Pydantic

---

## Database

- PostgreSQL
- Neon Database

---

## AI

- Google Gemini API

---

## Payments

- Razorpay

---

## Deployment

Frontend

- Vercel

Backend

- Render

Database

- Neon PostgreSQL

---

# 📂 Project Structure

```
merchant-os/

├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   └── public/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── seed/
│   │   └── main.py
│   │
│   ├── alembic/
│   └── requirements.txt
│
└── README.md
```

---

# ⚙️ Environment Variables

## Backend

Create `.env`

```env
DATABASE_URL=

JWT_SECRET_KEY=
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=10080

COOKIE_NAME=merchantos_token
COOKIE_SECURE=True

GEMINI_API_KEY=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

---

## Frontend

```env
NEXT_PUBLIC_API_URL=https://merchant-os-34yh.onrender.com
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/merchant-os.git

cd merchant-os
```

---

## Backend

```bash
cd backend

python -m venv venv

source venv/bin/activate
```

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run migrations

```bash
alembic upgrade head
```

Seed database

```bash
python -m app.seed.seed
```

Run server

```bash
uvicorn app.main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# API Endpoints

## Authentication

```
POST   /auth/signup
POST   /auth/login
POST   /auth/logout
GET    /auth/me
```

---

## Dashboard

```
GET /dashboard
```

---

## Products

```
GET
POST
PUT
DELETE
```

---

## Campaigns

```
GET
POST
PUT
DELETE
```

---

## Recommendations

```
GET
POST /approve
POST /reject
POST /execute
```

---

## Checkout

```
POST /checkout/create-order
POST /checkout/verify
```

---

# Authentication Flow

```
Login

↓

Backend verifies credentials

↓

JWT Generated

↓

Stored as HttpOnly Cookie

↓

Frontend requests /auth/me

↓

Protected Dashboard
```

---

# Database

Main Tables

- merchants
- customers
- products
- orders
- order_items
- campaigns
- ai_recommendations
- conversations
- messages
- audit_logs

---

# Screenshots

Add screenshots here.

Example

```
/screenshots

dashboard.png

products.png

chat.png

campaigns.png
```

---

# Future Improvements

- Email verification
- Password reset
- Multi-merchant organizations
- AI Sales Forecasting
- Inventory Prediction
- Mobile App
- Role-based access control
- WebSocket Notifications
- Export Reports
- Stripe Integration

---

# License

MIT License

---

# Author

**Md Fahad**

GitHub:
https://github.com/Fahad035

LinkedIn:
https://www.linkedin.com/in/md-fahad-71505a2b6

---

# Acknowledgements

- FastAPI
- Next.js
- Neon
- Render
- Vercel
- PostgreSQL
- Google Gemini
- Razorpay
- SQLAlchemy
- Tailwind CSS