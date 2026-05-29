# Database Schema

## User

Stores user account information.

| Column       | Type     | Constraints                 |
| ------------ | -------- | --------------------------- |
| id           | Integer  | Primary Key, Auto Increment |
| name         | String   | Not Null                    |
| email        | String   | Unique, Not Null            |
| passwordHash | String   | Not Null                    |
| createdAt    | DateTime | Default Current Timestamp   |

### Indexes

* email (unique)

---

## Wallet

Stores wallet balance for each user.

| Column    | Type          | Constraints                 |
| --------- | ------------- | --------------------------- |
| id        | Integer       | Primary Key, Auto Increment |
| userId    | Integer       | Foreign Key, Unique         |
| balance   | Decimal(15,2) | Default 0.00                |
| updatedAt | DateTime      | Auto Updated                |

### Relationships

* One User → One Wallet

### Indexes

* userId (unique)

---

## Transaction

Stores money transfers between users.

| Column     | Type          | Constraints                 |
| ---------- | ------------- | --------------------------- |
| id         | Integer       | Primary Key, Auto Increment |
| senderId   | Integer       | Foreign Key                 |
| receiverId | Integer       | Foreign Key                 |
| amount     | Decimal(15,2) | Not Null                    |
| status     | Enum          | SUCCESS / FAILED            |
| createdAt  | DateTime      | Default Current Timestamp   |

### Relationships

* Transaction → Sender User
* Transaction → Receiver User

### Indexes

* senderId
* receiverId
* createdAt

---

## Entity Relationship Overview

User (1) ---- (1) Wallet

User (1) ---- (*) Sent Transactions

User (1) ---- (*) Received Transactions
