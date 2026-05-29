# SQL Queries

## Last 10 Transactions

```sql
SELECT *
FROM "Transaction"
ORDER BY "createdAt" DESC
LIMIT 10;
```

---

## User Wallet Balance

```sql
SELECT balance
FROM "Wallet"
WHERE "userId" = 1;
```

---

## Total Amount Sent By User

```sql
SELECT SUM(amount)
FROM "Transaction"
WHERE "senderId" = 1;
```

---

## Total Amount Received By User

```sql
SELECT SUM(amount)
FROM "Transaction"
WHERE "receiverId" = 1;
```

---

## Transaction Count For User

```sql
SELECT COUNT(*)
FROM "Transaction"
WHERE
  "senderId" = 1
  OR
  "receiverId" = 1;
```

---

## Recent Transactions Of A User

```sql
SELECT *
FROM "Transaction"
WHERE
  "senderId" = 1
  OR
  "receiverId" = 1
ORDER BY "createdAt" DESC;
```
