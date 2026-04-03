#  Finance Backend System

This is a backend application built to manage financial transactions with role-based access control.

The aim of this project was to go beyond simple CRUD operations and design a system where different users have different permissions, similar to real-world applications.

---

##  Features

- User and role management (Admin, Analyst, Viewer)
- Role-based access control using middleware
- CRUD operations for financial transactions
- Filtering transactions by type and category
- Summary API (total income, total expenses, net balance)
- Input validation and proper error handling

---

## Roles in the System

- **Viewer** → Can only view transactions  
- **Analyst** → Can view transactions + access summary  
- **Admin** → Full access (create, update, delete)

Role is passed through request headers and validated in middleware.

---

##  Tech Stack

- Node.js  
- Express.js  
- MongoDB  
- Mongoose  

---

##  Setup

1. Install dependencies:
    npm install

2. Start server:
    node server.js


3. Ensure MongoDB is running locally

---

##  API Endpoints

###  Users
- POST /users → Create user

---

###  Transactions
- POST /transactions → Create transaction (Admin only)
- GET /transactions → Get all transactions
- PUT /transactions/:id → Update transaction (Admin only)
- DELETE /transactions/:id → Delete transaction (Admin only)

---

###  Filtering
- GET /transactions?type=income  
- GET /transactions?category=salary  

---

###  Summary
- GET /transactions/summary → Returns:
  - Total income  
  - Total expenses  
  - Net balance  

---

##  Validation & Error Handling

- Ensures required fields are provided
- Returns meaningful error messages
- Prevents unauthorized access based on roles

Example:
    400 Bad Request
    "All fields are required"
    
---

##  Key Highlights

- Clean modular structure (routes, models, middleware)
- Middleware-based role authorization
- Designed with real backend logic in mind
- Not just CRUD — includes filtering and summary insights

---

##  Assumptions

- Role is passed via request headers  
- Authentication is not implemented (kept simple for focus on backend logic)

---
