# 40shops Backend API

B2B Wholesale Marketplace for Indian MSMEs  
(Alibaba for India)

## Setup
1. Clone the repo
2. cd server
3. npm install
4. .env.example copy karo → .env banva
5. MongoDB Atlas URI .env madhe taka
6. npm run dev

## API Endpoints

### Auth
- POST /api/auth/register → New user register
- POST /api/auth/login → Login, returns JWT token
- GET /api/auth/profile → Profile (token required)

## Tech Stack
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT Authentication

## Installation

```bash
npm install express dotenv cors helmet morgan mongoose
npm install bcryptjs jsonwebtoken
npm install -D nodemon
```

## Project Structure
server/

├── src/

│   ├── config/         → Database connection

│   ├── controllers/    → Business logic

│   ├── middleware/      → Auth, error handling

│   ├── models/         → MongoDB schemas

│   ├── routes/         → API endpoints

│   ├── services/       → External APIs (AI, WhatsApp)

│   └── utils/          → Helper functions

├── .env.example        → Environment variables template

├── server.js           → Entry point

└── package.json

---

## Local Setup

**1. Clone karo**
```bash
git clone https://github.com/Jagdish123-stack/40-shop-.git
cd 40-shop-/server
```
**2. Dependencies install karo**
```bash
npm install
```
**3. Environment setup karo**
```bash
cp .env.example .env
```
**.env madhe he bhara:**
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```
**4. Server start karo**
```bash
npm run dev
```
**Expected output:**
🚀 Server running on http://localhost:5000
MongoDB Connected: cluster0.xxxxx.mongodb.net

## Status

| Feature | Status |
|---------|--------|
| Project Setup | ✅ Done |
| MongoDB Connection | ✅ Done |
| Auth APIs | ✅ Done |
| Product APIs | 🔄 In Progress |
| Order APIs | ⏳ Pending |
| Payment APIs | ⏳ Pending |

---

*40shops — Connecting Indian MSMEs* 🇮🇳