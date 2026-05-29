# API Gateway

## What is an API Gateway?

An API Gateway acts as a single entry point between clients and backend services.

Instead of clients directly communicating with multiple services, requests are first sent to the API Gateway, which then routes them to the appropriate service.

---

## Why is it Used?

API Gateways simplify communication between clients and backend systems while improving security and maintainability.

---

## Benefits

### Authentication

The API Gateway can validate JWT tokens and ensure only authenticated users access protected resources.

### Request Routing

Routes incoming requests to the correct backend service.

### Rate Limiting

Protects services from abuse by limiting the number of requests.

### Logging & Monitoring

Provides centralized logging, analytics, and monitoring.

### Security

Hides internal services from direct public access.

---

## Example

Client Application

↓

API Gateway

↓

Authentication Service

Wallet Service

Transaction Service

Notification Service

---

## In This Assignment

The application is implemented as a single backend service, so an API Gateway is not required. However, in a microservices architecture, an API Gateway would be used as the single entry point for all client requests.
