# Express Products API

This is a ready-to-run Express.js RESTful API implementing CRUD operations, middleware, validation, error handling, and advanced features like filtering, pagination, and search.

## 🚀 Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set your API key.

3. Run the server:
   ```bash
   npm start
   ```

Server runs at `http://localhost:3000`.

## 🧪 Test Endpoints

Use Postman or curl to test:
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (requires `x-api-key` header)
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `GET /api/products/search?q=term`
- `GET /api/products/stats`
