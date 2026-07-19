# GreenNest Nursery

GreenNest Nursery is a full-stack MERN e-commerce project for selling indoor plants, outdoor plants, seeds, planters, and gardening kits.

## Tech Stack

- MongoDB and Mongoose
- Express.js and Node.js
- React with Vite
- Plain CSS with responsive layouts

## Features

- Product catalog with search and category filters
- Product detail pages
- Persistent cart using local storage
- Checkout form that creates orders through the backend API
- MongoDB product and order models
- Seed script with nursery-specific products
- Production-ready folder structure for frontend and backend

## Project Structure

```text
client/   React frontend
server/   Express API, Mongo models, controllers, routes, seed data
```

## Run Locally

1. Install dependencies:

```bash
npm run install-all
```

2. Create `server/.env` from the example:

```bash
cp server/.env.example server/.env
```

3. Add your MongoDB URI in `server/.env`.

4. Seed the products:

```bash
npm run seed
```

5. Start frontend and backend:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## API Endpoints

- `GET /api/health`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/orders`
- `GET /api/orders/:id`

## Environment Variables

See `server/.env.example`.
