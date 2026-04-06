# 🌐 Money Sphere

A premium, interactive 3D finance dashboard designed for ultimate financial clarity and aesthetic excellence. Track your wealth with beautiful visualizations, real-time balance synchronization, and an ultra-modern glassmorphic interface.

Built with ❤️ by **Aparna Ojha**.

---

## ✨ Features

### 💎 Premium Design System
- **Dark Mode First**: Optimized for a sleek dark aesthetic by default, with a sophisticated light mode transition.
- **Glassmorphism**: Ultra-modern UI with frosted glass effects, blurred backgrounds, and subtle borders.
- **Micro-Animations**: Powered by Framer Motion for a fluid, responsive user experience.
- **Interactive 3D Assets**: Featuring animated 3D coins and dynamic charts.

### 💳 Financial Card Management
- **Visual Card Library**: Manage multiple digital cards with realistic visual designs (Visa, Mastercard, Amex).
- **Real-Time Sync**: Every transaction automatically updates your card balance on both the frontend and backend.
- **Multi-Card Integration**: Link transactions directly to specific cards to maintain a precise digital ledger.

### 📊 Powerful Analytics
- **Balance Trend Charts**: Visualize your net worth growth over time.
- **Category Spending**: 3D-styled charts showing exactly where your money goes.
- **Smart Insights**: Automated recommendations based on your savings rate and spending habits.

### 🔐 Secure Backend
- **Full Auth System**: Robust sign-in and sign-up with role-based access control (Admin/Viewer).
- **Database Persistence**: Integrated with MongoDB Atlas for secure, cloud-based data storage.
- **RESTful API**: Scalable Node.js & Express backend with JWT authentication.

---

## 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Glassmorphic System
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Visualizations**: Recharts / ECharts
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas + Mongoose
- **State Management**: React Context API + useReducer

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas Account (or local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iamaparnaojha/Moneysphere.git
   cd moneysphere
   ```

2. **Install Dependencies**
   ```bash
   npm install
   cd backend && npm install
   cd ..
   ```

3. **Environment Setup**
   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_secret_key
   PORT=5001
   ```

4. **Run the Application**
   ```bash
   # From the root directory
   npm start
   ```
   *This will run both the frontend and backend concurrently.*

---

## 🎨 UI Showcase

| Feature | Description |
| :--- | :--- |
| **Glassmorphic Sidebar** | Intuitive navigation with theme-aware styling. |
| **3D Finance Card** | Premium card visuals with real-time balance updates. |
| **Adaptive Charts** | Theme-aware data visualizations for complex financial trends. |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## 📝 License

This project is licensed under the MIT License.

---

### Developed by [Aparna Ojha](https://github.com/iamaparnaojha)
*"Transforming financial data into a visual masterpiece."*
