# 🐾 Pawww Store – Pet Supplies Web App

Pawww Store is a full-stack web application for selling pet accessories, built with the **MERN stack** (MongoDB, Express, React, Node.js). It allows users to browse products, place orders, and manages inventory stock automatically.

## ✨ Features

- 🛒 Product listing with name, price, image, and stock
- ✅ Order submission with stock auto-update
- 🧾 RESTful API powered by Express & MongoDB
- 📦 Simple JSON-based order input (no frontend required initially)
- 🧩 Full React frontend with MUI Design
- 🛒 LocalStorage-based shopping cart
- 💳 Payment gateway using Stripe

## 🔧 Tech Stack

- **Frontend**: React, MUI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Environment Management**: dotenv

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/budaala/pawww-store.git
cd pawww-store
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a .env file:

```bash
PORT=5000
MONGO_URL=mongodb://localhost:27017/pawww-store
```

### 4. Run the backend server

```bash
npm run dev
```

The backend runs at: http://localhost:5000

## 📬 API Endpoints

### 🛍️ GET /api/products

Returns a list of all products.

### 🧾 POST /api/orders

Submits an order and updates product stock. Example payload:

```json
{
  "items": [
    {
      "productId": "666a1b6f7a1b2c3d4e5f6789",
      "name": "PawPodusia",
      "price": 59.90,
      "quantity": 2
    }
  ],
  "totalPrice": 119.80
}
```

## 📁 Project Structure

```bash
pawww-store/
├── model/
│   ├── productModel.js
│   └── orderModel.js
├── routes/
│   ├── productRoute.js
│   └── orderRoute.js
├── controllers/
│   ├── productController.js
│   └── orderController.js
├── uploads/
│   └── (product images)
├── index.js
└── .env
```


## 💡 Future Ideas
	•	🔐 User authentication (JWT)
	•	✉️ Email notifications on order confirmation
	•	📊 Admin dashboard for product/order management

## 🐶 Author

Made with ❤️ for pets and coding.
