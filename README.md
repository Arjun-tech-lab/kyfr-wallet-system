# KYFR Wallet System

A backend wallet management system built using Node.js, Express.js, PostgreSQL, Prisma ORM, JWT Authentication, Socket.IO, and Swagger.

This project was developed as part of the KYFR Backend Hiring Assignment.

---

# Features

## Authentication

* User Registration
* User Login
* JWT Based Authentication
* Protected APIs

## Wallet Management

* Add Money to Wallet
* Check Wallet Balance

## Transactions

* Transfer Money Between Users
* Transaction History
* Real-Time Transaction Notifications

## Spending Insights

* Total Amount Sent
* Total Amount Received
* Transaction Count

## Real-Time Updates

Implemented using Socket.IO.

Example Event:

```json
{
  "type": "TRANSACTION",
  "amount": 500,
  "status": "SUCCESS"
}
```

---

# Tech Stack

## Backend

* Node.js
* Express.js

## Database

* PostgreSQL
* Prisma ORM

## Authentication

* JWT

## Validation

* Zod

## Documentation

* Swagger UI

## Real-Time Communication

* Socket.IO

---

# Project Structure

```text
kyfr-wallet-system

├── prisma/
│   └── schema.prisma

├── src/
│   ├── config/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   ├── middlewares/
│   ├── validations/
│   ├── utils/
│   ├── app.js
│   └── server.js

├── docs/
│   ├── database-schema.md
│   ├── sql-queries.md
│   └── api-gateway.md

├── README.md
├── .env.example
├── package.json
└── .gitignore
```

---

# Database Design

The system consists of three primary entities:

* Users
* Wallets
* Transactions

Highlights:

* One Wallet per User
* Foreign Key Relationships
* Indexed Transaction Queries
* Decimal Based Monetary Storage
* Transaction Status Tracking

Detailed schema documentation is available in:

```text
docs/database-schema.md
```

---

# Concurrency Handling

To prevent double spending during simultaneous transfer requests, the sender balance is updated using an atomic SQL operation:

```sql
UPDATE "Wallet"
SET balance = balance - amount
WHERE
  "userId" = ?
  AND balance >= amount;
```

This ensures that only one concurrent request can successfully deduct the balance when funds are limited.

---

# API Documentation

Swagger UI is available at:

```text
http://localhost:3000/api-docs
```

The Swagger interface can be used to:

* View API documentation
* Test endpoints
* Authenticate using JWT
* Verify request and response formats

---
# Prerequisites

Before running the application, ensure the following are installed:

* Node.js (v18 or higher)
* PostgreSQL database (local PostgreSQL or Neon)

The application requires a valid PostgreSQL connection string configured in the `.env` file.

# Setup Instructions

## 1. Clone Repository

```bash
git clone <repository-url>
```

```bash
cd kyfr-wallet-system
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file using `.env.example`.

Example:

```env
PORT=3000

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_jwt_secret

JWT_EXPIRES_IN=1d
```

---

## 4. Database Setup

Push Prisma schema to PostgreSQL:

```bash
npx prisma db push
```

---

## 5. Start Application

```bash
npm run dev
```

Server will start at:

```text
http://localhost:3000
```

---

# API Endpoints

## Authentication

| Method | Endpoint   |
| ------ | ---------- |
| POST   | /api/users |
| POST   | /api/login |

## Wallet

| Method | Endpoint            |
| ------ | ------------------- |
| POST   | /api/wallet/add     |
| GET    | /api/wallet/balance |

## Transactions

| Method | Endpoint          |
| ------ | ----------------- |
| POST   | /api/transfer     |
| GET    | /api/transactions |

## Insights

| Method | Endpoint      |
| ------ | ------------- |
| GET    | /api/insights |

---


# Additional Documentation

## Database Schema

```text
docs/database-schema.md
```

## SQL Queries

```text
docs/sql-queries.md
```

## API Gateway Explanation

```text
docs/api-gateway.md
```

# Evaluation Note

The application requires a PostgreSQL database connection.

For ease of evaluation, a temporary database connection string can be provided separately upon request so the application can be tested immediately without setting up a new PostgreSQL instance.


# Author

Arjun Indavara

Backend Hiring Assignment Submission
