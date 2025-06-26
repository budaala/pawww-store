
# 🐾 Pawww Store – Pet Supplies Web App

A full-stack **MERN** (MongoDB, Express, React, Node.js) e-commerce web application for pet supplies. Pawww Store allows users to browse products, manage a shopping cart, place orders, and process payments securely via Stripe. The backend exposes a robust RESTful API, while the frontend offers an intuitive and responsive user interface.

## ✨ Features

- 🛍️ **Product Catalog:** Browse a list of pet products with images, prices, and stock status.
- 🛒 **Shopping Cart:** Add, remove, and update product quantities; cart state is persisted in LocalStorage.
- ✅ **Order Placement:** Seamlessly place orders; stock levels update automatically.
- 🔐 **User Authentication:** Register, log in, and manage sessions using JWT.
- 🧩 **Responsive Design:** Fully responsive UI using React & Material UI (MUI).
- 💳 **Stripe Payments:** Secure online payments via Stripe integration.

## 🔧 Tech Stack

- **Frontend**: React, Material UI (MUI)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Payments:** Stripe API
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
PORT  = 8000
MONGO_URL  = mongodb://localhost:27017/pawww-store
STRIPE_SECRET  = your_stripe_secret_key
TOKEN_SECRET  = your_jwt_secret
NODE_CODE_SENDING_EMAIL_ADDRESS  = your_email_address
NODE_CODE_SENDING_EMAIL_PASSWORD  = your_email_app_password
HMAC_VERIFICATION_CODE_SECRET  = your_hmac_secret
```

### 4. Run the backend server

```bash
npm run dev
```

The backend runs at: http://localhost:8000

## 📬 API Overview
### Authentication
 -	`POST /api/auth/signup` — Register a new user 	
 -	`POST /api/auth/signin` — Log in and receive a JWT
 -	`POST /api/auth/signout` — Log out

### Authorization
 -	`PATCH /api/auth/send-verification-code` — Send account verification code via email
 -	`PATCH /api/auth/verify-verification-code` — Verify sent code
 -	 `PATCH /api/auth/change-password` — Change password (logged in user)
  -	`PATCH /api/auth/send-forgot-password-code` — Send email with code to change forgotten password
 -	`PATCH /api/auth/verify-forgot-password-code` — Verify sent code to change forgotten password

### Products
 - `GET /api/products` — List all products 
 - `GET /api/products/:id`  — Get product details 

### Orders
 - `POST /api/orders` — Place a new order 
 - `GET /api/orders` — List of orders 	

## 💡 Future Ideas

 - 👩🏼‍💻 User interface for account and order history
 - ✉️ Email notifications on order confirmation 	
 - 📊  Admin dashboard for product/order management
 - ↕️  Sorting & filtering on home page

## 🐶 Author

Made with ❤️ for pets and coding.
