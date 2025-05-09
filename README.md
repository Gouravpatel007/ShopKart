# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




# 🛒 Full Stack E-commerce Website (MERN)

A full-featured e-commerce web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It supports user authentication, product browsing, cart management, order processing, and an admin dashboard for product and order management.

---

## 🚀 Features

### 🧑 User
- User Registration & Login (JWT-based auth)
- Browse Products by Category
- Add/Remove Products to Cart
- Checkout with Order Summary
- View Order History
- Profile Management

### 🔐 Admin
- Admin Dashboard
- Add / Edit / Delete Products
- Manage Orders
- View User List

---

## 📦 Tech Stack

| Tech | Description |
|------|-------------|
| **Frontend** | React.js + Tailwind CSS / Bootstrap |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB + Mongoose |
| **Auth** | JWT (JSON Web Tokens) |
| **State Management** | Context API / Redux Toolkit |
| **Payments** | (Optional) Stripe / Razorpay |
| **Deployment** | Vercel (frontend), Render / Railway / VPS (backend), MongoDB Atlas |

---

## 🛠️ Project Structure


---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ecommerce-mern.git
cd ecommerce-mern

2. Setup Backend

cd server
npm install

Create a .env file in server/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the backend server:

npm run dev


3. Setup Frontend

cd ../client
npm install
npm run dev

Frontend will run on http://localhost:5173.




