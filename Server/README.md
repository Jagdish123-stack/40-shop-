# 40shops — Backend API 🚀
B2B Wholesale Marketplace for Indian MSMEs (Alibaba for India)

---

## Tech Stack
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT Authentication
- Helmet, Morgan, CORS
- Groq AI (llama-3.3-70b-versatile)

---

## Installation
```bash
# Core packages
npm install express dotenv cors helmet morgan mongoose
npm install bcryptjs jsonwebtoken

# AI packages
npm install groq-sdk
npm install @google/generative-ai
npm install openai

# Dev dependency
npm install -D nodemon
```
---

## Local Setup

1. Clone karo
```bash
git clone https://github.com/Jagdish123-stack/40-shop-.git
cd 40-shop-/server
```

2. Dependencies install karo
```bash
npm install
```

3. .env banva
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

4. Server start karo
```bash
npm run dev
```

Expected output:
🚀 Server running on http://localhost:5000
MongoDB Connected: cluster0.xxxxx.mongodb.net

---

## Project Structure

server/
├── src/
│   ├── config/         → Database connection
│   ├── controllers/    → Business logic
│   ├── middleware/     → Auth, error handling
│   ├── models/         → MongoDB schemas
│   ├── routes/         → API endpoints
│   ├── services/       → External APIs (AI, Logistics)
│   └── utils/          → Helper functions
├── .env.example
├── server.js
└── package.json

---

---

## API Endpoints

### 🔐 Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | New user register | ❌ |
| POST | `/api/auth/login` | Login → JWT token | ❌ |
| GET | `/api/auth/profile` | Get profile | ✅ |

### 📦 Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | All products | ❌ |
| POST | `/api/products` | Create product | Vendor |
| GET | `/api/products/:id` | Single product | ❌ |
| PUT | `/api/products/:id` | Update product | Vendor |
| DELETE | `/api/products/:id` | Delete product | Vendor |
| GET | `/api/products/vendor/my-products` | My products | Vendor |
| GET | `/api/products/search` | Search + filters | ❌ |

### 🛒 Orders
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/orders` | Place order | Buyer |
| GET | `/api/orders/my-orders` | Buyer orders | Buyer |
| GET | `/api/orders/vendor-orders` | Vendor orders | Vendor |
| GET | `/api/orders/:id` | Single order | ✅ |
| PUT | `/api/orders/status/:id` | Update status | Vendor |
| PUT | `/api/orders/cancel/:id` | Cancel order | Buyer |

### 💰 Payments
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/payments/initiate` | Initiate payment | Buyer |
| PUT | `/api/payments/release/:id` | Release payment | Buyer |
| PUT | `/api/payments/refund/:id` | Refund payment | Buyer |
| PUT | `/api/payments/freeze/:id` | Freeze payment | Admin |
| GET | `/api/payments/:id` | Payment status | ✅ |

### 🚨 Crisis Alert
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/crisis/trigger` | Trigger crisis | Admin |
| GET | `/api/crisis/active` | Active crises | ❌ |
| PUT | `/api/crisis/resolve/:id` | Resolve crisis | Admin |
| GET | `/api/crisis/alternate/:productId/:crisisId` | Alternate suppliers | ✅ |

### 🏭 Vendor Onboarding
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/vendor/onboarding/step1` | Aadhar verify | Vendor |
| POST | `/api/vendor/onboarding/step2` | Udyam verify | Vendor |
| POST | `/api/vendor/onboarding/step3` | GST + Bank details | Vendor |
| GET | `/api/vendor/profile` | Vendor profile | Vendor |
| PUT | `/api/vendor/subscription` | Update subscription | Vendor |

### 👑 Admin Panel
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/dashboard` | Dashboard stats | Admin |
| GET | `/api/admin/users` | All buyers | Admin |
| GET | `/api/admin/vendors` | All vendors | Admin |
| PUT | `/api/admin/vendor/:id/approve` | Approve vendor | Admin |
| PUT | `/api/admin/vendor/:id/reject` | Reject vendor | Admin |
| DELETE | `/api/admin/user/:id` | Delete user | Admin |

### 🤖 AI Features
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/ai/search` | Vernacular search (Hindi/Marathi) | ❌ |
| POST | `/api/ai/photo-search` | Photo to product search | ❌ |
| POST | `/api/ai/optimize-listing` | AI listing optimizer | Vendor |
| GET | `/api/ai/demand/:productId` | Demand prediction | Vendor |

### 📋 RFQ System
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/rfq` | Create RFQ | Buyer |
| GET | `/api/rfq` | All open RFQs | Vendor |
| GET | `/api/rfq/my-rfqs` | My RFQs | Buyer |
| POST | `/api/rfq/:id/respond` | Submit quote | Vendor |
| PUT | `/api/rfq/:id/accept-quote` | Accept quote | Buyer |
| PUT | `/api/rfq/:id/close` | Close RFQ | Buyer |

### ⚡ Flash Deals
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/flash-deals/active` | Active deals | ❌ |
| POST | `/api/flash-deals` | Create deal | Vendor |
| GET | `/api/flash-deals/my-deals` | My deals | Vendor |
| PUT | `/api/flash-deals/:id/deactivate` | Deactivate | Vendor |

### 🧾 GST Invoice
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/invoice/:orderId` | Generate invoice | ✅ |

### 🚚 Logistics
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/logistics/rates` | Compare couriers | ✅ |
| POST | `/api/logistics/book` | Book shipment | Vendor |


❌ = No token required (anyone can access)
✅ = Token required (logged in user only)
Vendor = Vendor token required
Buyer = Buyer token required
Admin = Admin token required

Simple example:
Register ❌ → Konihi register karu shkel
Login ❌    → Konihi login karu shkel
Profile ✅  → Sirf logged in user baghel
---

## Auth Header Format
Authorization: Bearer <your_jwt_token>

## User Roles
buyer   → Kirana owners, retailers
vendor  → Manufacturers, wholesalers
admin   → Platform admin

---

---

## Feature Status
| Feature | Status |
|---------|--------|
| Project Setup | ✅ Done |
| MongoDB Connection | ✅ Done |
| Auth APIs | ✅ Done |
| Product APIs | ✅ Done |
| Order APIs | ✅ Done |
| Payment/Escrow | ✅ Done |
| Crisis Alert | ✅ Done |
| Vendor Onboarding | ✅ Done |
| Admin Panel | ✅ Done |
| Search & Filters | ✅ Done |
| AI Features (Groq) | ✅ Done |
| Vernacular Search | ✅ Done |
| Photo to Product Search | ✅ Done |
| Demand Prediction | ✅ Done |
| AI Listing Optimizer | ✅ Done |
| RFQ System | ✅ Done |
| Flash Deals | ✅ Done |
| GST Invoice | ✅ Done |
| Logistics Aggregator | ✅ Done |
| WhatsApp Bot | ⏳ Pending |

---

---
## Environment Variables

`.env` madhe he sagle add kara:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/40shops
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

# AI
GROQ_API_KEY=your_groq_api_key
API Keys Kadhaychi kashi:Groq (Free) https://console.groq.com 
