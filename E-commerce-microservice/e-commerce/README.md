<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A <a href="http://nodejs.org" target="_blank">Node.js</a> microservices-based e-commerce system built with <a href="https://nestjs.com/" target="_blank">NestJS</a>, using gRPC for inter-service communication and MongoDB as databases.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

---

## 📜 Description

This is a **NestJS E-Commerce** project built with **Microservices Architecture**.  
The system consists of multiple independent services communicating via **gRPC**, with all requests routed through an **API Gateway**.  
Each service uses its own **MongoDB** database, ensuring isolation and scalability.

---

## ✨ Features

- **Role-Based Access Control (RBAC)** – fine-grained permission management for admin, seller, and customer roles.  
- **OAuth2 Authentication** – supports login via Google, Facebook, and GitHub.  
- **JWT + Refresh Token** – secure and long-lived user sessions.  
- **Product Management** – CRUD operations for products, categorization, search, and filtering.  
- **Order Management** – place orders, view history, and manage order statuses.  
- **Payment Integration** – supports multiple payment gateways (Stripe, PayPal, VNPAY).  
- **Inventory Management** – real-time stock tracking and management.  
- **Notification System** – send notifications via email, SMS, or push notifications.  
- **API Gateway** – single entry point with rate limiting and logging.  
- **gRPC Communication** – fast and efficient service-to-service communication.  

---

## 🛠 Services

- **auth-service** – authentication & authorization (JWT, OAuth2, RBAC)  
- **product-service** – product CRUD, categories, search, filtering  
- **inventory-service** – stock tracking & management  
- **order-service** – cart, checkout, order history, status tracking  
- **payment-service** – payment processing & integration with Stripe  
- **user-service** – user profile management  
- **notification-service** – email, SMS, push notifications  
- **api-gateway** – routes all client requests, rate limiting, logging  

---

## ⚙️ Tech Stack

- **Backend Framework**: [NestJS](https://nestjs.com/)  
- **Inter-service Communication**: gRPC  
- **Database**: MongoDB  
- **Gateway**: API Gateway (NestJS)  
- **Authentication**: JWT + Refresh Tokens + OAuth2  

---

## 🚀 Project Setup

### Install dependencies
```bash
$ npm install
