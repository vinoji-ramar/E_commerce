# E-Commerce Backend

Simple and readable e-commerce backend for mobile phone products using:

- Express
- TypeScript
- Sequelize
- SQLite
- Multer
- Dotenv

## Features

- Product listing API with `limit` and `offset`
- Product detail API
- Product image upload API
- Customer register and login APIs
- JWT access and refresh tokens
- Bcrypt password hashing
- Admin product management APIs
- Cart management APIs
- Order placement API
- Order history API
- Input validation using Zod
- Standard response format
- Proper folder structure
- Markdown API documentation
- Environment based configuration
- Simple custom logger
- MySQL-ready Sequelize configuration

## Folder Structure

```text
src/
  config/ 
  constants/
  controllers/
  docs/
  middlewares/
  models/
  repositories/
  routes/
  seeders/
  services/
  types/
  utils/
  validations/
```

## Run Project

```bash
npm run dev
```

## Environment File

Use `.env.example` as the template for your local `.env`.

Current database config expects MySQL through `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, and `DB_PORT`.
For existing databases, keep `DB_SYNC_ALTER=false` to avoid automatic destructive schema changes on startup.

Build project:

```bash
npm run build
```

## API Docs

Open:

`GET http://localhost:3000/api/docs`

Uploads are served from:

`http://localhost:3000/uploads/products/<file-name>`
