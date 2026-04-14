# E-Commerce API Documentation

Base URL: `http://localhost:3000/api`

This backend is built for a simple mobile phone e-commerce application using Express, TypeScript, Sequelize, and SQLite.

## Standard Response Format

```json
{
  "success": true,
  "message": "Human readable message",
  "data": {},
  "meta": {}
}
```

Error response:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "limit",
      "message": "Limit must be between 1 and 100"
    }
  ]
}
```

## Endpoints

### 0. Authentication APIs

`POST /auth/register`

`POST /auth/login`

`POST /auth/refresh-token`

### 1. Product Listing API

`GET /products?limit=10&offset=0`

Query parameters:

- `limit`: number of records to return
- `offset`: number of records to skip
- `brand`: optional filter by brand name

Success response:

```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "name": "iPhone 15",
        "brand": "Apple",
        "price": 79999,
        "stock": 12
      }
    ],
    "pagination": {
      "limit": 10,
      "offset": 0,
      "total": 8
    }
  }
}
```

### 2. Product Detail API

`GET /products/:id`

### 2.2 Admin Product Management APIs

`POST /products`

`PATCH /products/:id`

`DELETE /products/:id`

Admin authentication is required.

### 2.1 Product Image Upload API

`POST /products/:id/image`

Form-data:

- `image`: image file

The uploaded image is stored locally and the product response includes an `imageUrl`.

### 3. Cart Management APIs

`GET /cart`

`POST /cart`

Request body:

```json
{
  "productId": 1,
  "quantity": 2
}
```

`PATCH /cart/:id`

Request body:

```json
{
  "quantity": 3
}
```

`DELETE /cart/:id`

### 4. Order Placement API

`POST /orders`

This API places an order using all current cart items, reduces product stock, creates order items, and then clears the cart.
Customer authentication is required.

### 5. Order History API

`GET /orders?limit=10&offset=0`

Returns placed orders with item details and pagination metadata.
Customer authentication is required.

### 6. Documentation API

`GET /docs`

Returns this Markdown documentation file directly from the server.

## Environment Variables

- `PORT`
- `NODE_ENV`
- `DATABASE_STORAGE`
- `UPLOAD_DIR`
- `BASE_URL`
