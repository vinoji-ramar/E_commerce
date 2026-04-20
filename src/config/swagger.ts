import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "API documentation for mobile phone e-commerce app",
    },
    servers: [
      {
        url: "http://localhost:4000/api/v1",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            brand: { type: "string" },
            price: { type: "number" },
            stock: { type: "integer" },
            imageUrl: { type: "string" },
          },
        },
      },
    },
  },
  apis: [], // we define manually below
});
(swaggerSpec as any).paths = {
  "/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Register user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "email", "password"],
              properties: {
                name: {
                  type: "string",
                  example: "Vinoji R",
                },
                email: {
                  type: "string",
                  example: "vinoji@gmail.com",
                },
                password: {
                  type: "string",
                  example: "123456",
                },
              },
            },
            example: {
              name: "Vinoji R",
              email: "vinoji@gmail.com",
              password: "123456",
            },
          },
        },
      },
      responses: {
        200: {
          description: "User registered successfully",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "User registered successfully",
                data: {
                  id: 1,
                  name: "Vinoji R",
                  email: "vinoji@gmail.com",
                },
              },
            },
          },
        },
      },
    },
  },
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: {
                  type: "string",
                  example: "vinoji@gmail.com",
                },
                password: {
                  type: "string",
                  example: "123456",
                },
              },
            },
            example: {
              email: "vinoji@gmail.com",
              password: "123456",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "Login successful",
                data: {
                  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  user: {
                    id: 1,
                    name: "Vinoji R",
                    email: "vinoji@gmail.com",
                    role: "customer",
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Invalid credentials",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Invalid email or password",
              },
            },
          },
        },
      },
    },
  },
  "/auth/refresh-token": {
    post: {
      tags: ["Auth"],
      summary: "Refresh token",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["refreshToken"],
              properties: {
                refreshToken: {
                  type: "string",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh.token",
                },
              },
            },
            example: {
              refreshToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh.token",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Token refreshed",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "Token refreshed successfully",
                data: {
                  accessToken: "new_access_token_here",
                  refreshToken: "new_refresh_token_here",
                },
              },
            },
          },
        },
        401: {
          description: "Invalid or expired refresh token",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Invalid or expired refresh token",
              },
            },
          },
        },
      },
    },
  },
  "/products": {
    get: {
      tags: ["Products"],
      summary: "Get product list",
      parameters: [
        {
          name: "limit",
          in: "query",
          schema: { type: "integer", example: 10 },
          description: "Number of products to return",
        },
        {
          name: "offset",
          in: "query",
          schema: { type: "integer", example: 0 },
          description: "Pagination offset",
        },
        {
          name: "brand",
          in: "query",
          schema: { type: "string", example: "Apple" },
          description: "Filter by brand",
        },
      ],
      responses: {
        200: {
          description: "Products fetched",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "Products fetched successfully",
                data: [
                  {
                    id: 1,
                    name: "iPhone 15",
                    brand: "Apple",
                    price: 79999,
                    stock: 10,
                    imageUrl: "https://example.com/iphone15.jpg",
                  },
                  {
                    id: 2,
                    name: "Galaxy S24",
                    brand: "Samsung",
                    price: 74999,
                    stock: 15,
                    imageUrl: "https://example.com/galaxy-s24.jpg",
                  },
                ],
                meta: {
                  total: 50,
                  limit: 10,
                  offset: 0,
                },
              },
            },
          },
        },
      },
    },

    post: {
      tags: ["Admin"],
      summary: "Create product",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "brand", "price", "stock"],
              properties: {
                name: {
                  type: "string",
                  example: "iPhone 15",
                },
                brand: {
                  type: "string",
                  example: "Apple",
                },
                price: {
                  type: "number",
                  example: 79999,
                },
                stock: {
                  type: "integer",
                  example: 10,
                },
                imageUrl: {
                  type: "string",
                  example: "https://example.com/iphone15.jpg",
                },
              },
            },
            example: {
              name: "iPhone 15",
              brand: "Apple",
              price: 79999,
              stock: 10,
              imageUrl: "https://example.com/iphone15.jpg",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Product created",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "Product created successfully",
                data: {
                  id: 3,
                  name: "iPhone 15",
                  brand: "Apple",
                  price: 79999,
                  stock: 10,
                  imageUrl: "https://example.com/iphone15.jpg",
                },
              },
            },
          },
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Unauthorized access",
              },
            },
          },
        },
      },
    },
  },
  "/products/{id}": {
    get: {
      tags: ["Products"],
      summary: "Get product by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
            example: 1,
          },
          description: "Product ID",
        },
      ],
      responses: {
        200: {
          description: "Product details",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "Product fetched successfully",
                data: {
                  id: 1,
                  name: "iPhone 15",
                  brand: "Apple",
                  price: 79999,
                  stock: 10,
                  imageUrl: "https://example.com/iphone15.jpg",
                },
              },
            },
          },
        },
        404: {
          description: "Product not found",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Product not found",
              },
            },
          },
        },
      },
    },

    patch: {
      tags: ["Admin"],
      summary: "Update product",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
            example: 1,
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "iPhone 15 Pro",
                },
                brand: {
                  type: "string",
                  example: "Apple",
                },
                price: {
                  type: "number",
                  example: 134999,
                },
                stock: {
                  type: "integer",
                  example: 5,
                },
                imageUrl: {
                  type: "string",
                  example: "https://example.com/iphone15pro.jpg",
                },
              },
            },
            example: {
              name: "iPhone 15 Pro",
              price: 134999,
              stock: 5,
            },
          },
        },
      },
      responses: {
        200: {
          description: "Product updated",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "Product updated successfully",
                data: {
                  id: 1,
                  name: "iPhone 15 Pro",
                  brand: "Apple",
                  price: 134999,
                  stock: 5,
                  imageUrl: "https://example.com/iphone15pro.jpg",
                },
              },
            },
          },
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Unauthorized access",
              },
            },
          },
        },
        404: {
          description: "Product not found",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Product not found",
              },
            },
          },
        },
      },
    },

    delete: {
      tags: ["Admin"],
      summary: "Delete product",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
            example: 1,
          },
        },
      ],
      responses: {
        200: {
          description: "Product deleted",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "Product deleted successfully",
              },
            },
          },
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Unauthorized access",
              },
            },
          },
        },
        404: {
          description: "Product not found",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Product not found",
              },
            },
          },
        },
      },
    },
  },

  "/products/{id}/image": {
    post: {
      tags: ["Admin"],
      summary: "Upload product image",
      description: "Upload an image file for a specific product",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
            example: 1,
          },
          description: "Product ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: ["image"],
              properties: {
                image: {
                  type: "string",
                  format: "binary",
                  description: "Image file to upload (jpg, png, etc.)",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Image uploaded",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "Image uploaded successfully",
                data: {
                  imageUrl: "https://example.com/uploads/products/1.jpg",
                },
              },
            },
          },
        },
        400: {
          description: "Invalid file",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Invalid image file",
              },
            },
          },
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Unauthorized access",
              },
            },
          },
        },
        404: {
          description: "Product not found",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Product not found",
              },
            },
          },
        },
      },
    },
  },
  "/cart": {
    get: {
      tags: ["Cart"],
      summary: "Get cart",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Cart fetched",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "Cart fetched successfully",
                data: {
                  items: [
                    {
                      id: 1,
                      productId: 1,
                      name: "iPhone 15",
                      brand: "Apple",
                      price: 79999,
                      quantity: 2,
                      imageUrl: "https://example.com/iphone15.jpg",
                    },
                    {
                      id: 2,
                      productId: 2,
                      name: "Galaxy S24",
                      brand: "Samsung",
                      price: 74999,
                      quantity: 1,
                      imageUrl: "https://example.com/galaxy-s24.jpg",
                    },
                  ],
                  totalAmount: 234997,
                },
              },
            },
          },
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Unauthorized access",
              },
            },
          },
        },
      },
    },

    post: {
      tags: ["Cart"],
      summary: "Add to cart",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["productId", "quantity"],
              properties: {
                productId: {
                  type: "integer",
                  example: 1,
                },
                quantity: {
                  type: "integer",
                  example: 2,
                },
              },
            },
            example: {
              productId: 1,
              quantity: 2,
            },
          },
        },
      },
      responses: {
        200: {
          description: "Added to cart",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "Item added to cart",
                data: {
                  id: 1,
                  productId: 1,
                  quantity: 2,
                },
              },
            },
          },
        },
        400: {
          description: "Invalid request",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Invalid product or quantity",
              },
            },
          },
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Unauthorized access",
              },
            },
          },
        },
        404: {
          description: "Product not found",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Product not found",
              },
            },
          },
        },
      },
    },
  },
  "/cart/{id}": {
    patch: {
      tags: ["Cart"],
      summary: "Update cart item",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
            example: 1,
          },
          description: "Cart item ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["quantity"],
              properties: {
                quantity: {
                  type: "integer",
                  example: 3,
                },
              },
            },
            example: {
              quantity: 3,
            },
          },
        },
      },
      responses: {
        200: {
          description: "Updated",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "Cart item updated successfully",
                data: {
                  id: 1,
                  productId: 1,
                  quantity: 3,
                },
              },
            },
          },
        },
        400: {
          description: "Invalid quantity",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Quantity must be greater than 0",
              },
            },
          },
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Unauthorized access",
              },
            },
          },
        },
        404: {
          description: "Cart item not found",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Cart item not found",
              },
            },
          },
        },
      },
    },

    delete: {
      tags: ["Cart"],
      summary: "Delete cart item",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
            example: 1,
          },
          description: "Cart item ID",
        },
      ],
      responses: {
        200: {
          description: "Deleted",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "Cart item removed successfully",
              },
            },
          },
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Unauthorized access",
              },
            },
          },
        },
        404: {
          description: "Cart item not found",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Cart item not found",
              },
            },
          },
        },
      },
    },
  },
  "/orders": {
    post: {
      tags: ["Orders"],
      summary: "Place order",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["shippingAddress", "paymentMethod"],
              properties: {
                shippingAddress: {
                  type: "string",
                  example: "123, Anna Nagar, Chennai, Tamil Nadu - 600040",
                },
                paymentMethod: {
                  type: "string",
                  example: "COD",
                },
              },
            },
            example: {
              shippingAddress: "123, Anna Nagar, Chennai, Tamil Nadu - 600040",
              paymentMethod: "COD",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Order placed",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "Order placed successfully",
                data: {
                  orderId: 101,
                  totalAmount: 234997,
                  status: "PLACED",
                },
              },
            },
          },
        },
        400: {
          description: "Cart is empty",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Cart is empty",
              },
            },
          },
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Unauthorized access",
              },
            },
          },
        },
      },
    },

    get: {
      tags: ["Orders"],
      summary: "Order history",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "limit",
          in: "query",
          schema: {
            type: "integer",
            example: 10,
          },
          description: "Number of orders to fetch",
        },
        {
          name: "offset",
          in: "query",
          schema: {
            type: "integer",
            example: 0,
          },
          description: "Pagination offset",
        },
      ],
      responses: {
        200: {
          description: "Orders fetched",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "Orders fetched successfully",
                data: [
                  {
                    orderId: 101,
                    totalAmount: 234997,
                    status: "DELIVERED",
                    createdAt: "2026-04-16T10:00:00Z",
                    items: [
                      {
                        productId: 1,
                        name: "iPhone 15",
                        quantity: 2,
                        price: 79999,
                      },
                      {
                        productId: 2,
                        name: "Galaxy S24",
                        quantity: 1,
                        price: 74999,
                      },
                    ],
                  },
                ],
                meta: {
                  total: 5,
                  limit: 10,
                  offset: 0,
                },
              },
            },
          },
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Unauthorized access",
              },
            },
          },
        },
      },
    },
  },
};
