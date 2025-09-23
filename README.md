Microservices E-Commerce Platform (NestJS + gRPC + MongoDB)
---------------------------------------------------------------------------------------------------------------------------------------

 Description:
---------------------------------------------------------------------------------------------------------------------------------------
This project is an E-Commerce Platform designed using a Microservices Architecture.
Each service runs independently and communicates with others through gRPC for high-performance, low-latency inter-service communication.
The system is built with NestJS and uses MongoDB as the database for storing application data.

![HomePage](./design/usecase.png)

Author:
Nguyễn Huỳnh Phương Lộc
-----------------------------------------------------------------------------------------------------------------------------------------
Technology Used

- Backend:
 
- Programming Language: TypeScript
  
- Framework: Nestjs

- DataBase: MongoDB

---------------------------------------------------------------------------------------------------------------------------------------------
Services Overview

Auth Service

- User authentication (login/register/logout)

- JWT token issuance & validation

- Role-based access control (RBAC)

User Service

- Manage user profiles (CRUD)

- Update account information

- Handle user preferences

Notification Service

- Send email & in-app notifications

- Handle order/payment updates

- Support asynchronous messaging

Inventory Service

- Manage stock levels for products

- Track product availability

- Synchronize stock after orders

Order Service

- Create and manage customer orders

- Track order status (pending, shipped, delivered)

- Connect with Payment and Inventory services

Payment Service

- Handle payment processing

- Integrate with external payment (Stripe)

- Store transaction history

Product Service

- Manage product catalog (CRUD)

- Store product details (name, price, description, category)


----------------------------------------------------------------------------------------------------------------------------------------------
Deployment: Docker 

Main Libraries

+ @nestjs/microservices – gRPC transport layer

+ @nestjs/jwt – JWT authentication

+ mongoose – MongoDB ODM

+ class-validator & class-transformer – request validation

+ grpc-tools – protobuf generation

-----------------------------------------------------------------------------------------------------------------------------------------------
Main Functions

+ Authentication & Authorization

+ User Management

+ Product Management

+ Inventory Tracking

+ Order Placement & Tracking

+ Payment Processing

+ Notification System

----------------------------------------------------------------------------------------------------------------------------------
Development Environment

- Backend IDEs: Visual Studio Code, WebStorm

- Database Tools: MongoDB Compass / Atlas

- Containerization: Docker

- Local Deployment: Node.js v18+, Docker Compose

