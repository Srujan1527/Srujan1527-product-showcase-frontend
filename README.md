# Product Showcase & Enquiry – Full Stack App

A small full-stack app built as part of a coding assignment.

here is the link https://srujans-ecommerce-app.vercel.app/


Stack:

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express, TypeScript, PostgreSQL
- **Auth:** JWT-based, simple role flag (`is_admin`) for admin access
- **DB:** PostgreSQL with `products`, `enquiries`, `users` tables

---

## 1. Project Structure

```txt
product-showcase/
  backend/
    src/
      auth/
      products/
      enquiries/
      db/
      sql/
      index.ts
    package.json
    tsconfig.json
    .env.example
  frontend/
    src/
      components/
      pages/
      main.tsx
      App.tsx
    package.json
    tsconfig.app.json
    .env.example
