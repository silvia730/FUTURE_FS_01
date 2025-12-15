# Silvia Njeri - Professional MERN Portfolio

A high-performance, systems-thinking oriented portfolio built with the MERN stack (MongoDB, Express, React, Node.js) and TailwindCSS.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or generic URI)

### Installation

1.  **Install Client Dependencies**
    ```bash
    cd client
    npm install
    ```

2.  **Install Server Dependencies**
    ```bash
    cd server
    npm install
    ```

3.  **Configuration**
    - Create `server/.env` with:
      ```
      MONGO_URI=mongodb://localhost:27017/portfolio
      PORT=5000
      NODE_ENV=development
      ```

### Running the App

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run dev
```

## 🏗 Architecture

### Client (Frontend)
- **Framework**: React (Vite)
- **Styling**: TailwindCSS v3 (Custom "Cyberpunk Minimalist" Theme)
- **Animations**: Framer Motion
- **State**: React Context + Hooks
- **Routing**: React Router DOM (Lazy Loaded)
- **Analytics**: Chart.js

### Server (Backend)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: Helmet, CORS
- **Logging**: Morgan

## 🎨 Design Philosophy
- **Colors**: Navy (`#0a192f`), Teal (`#64ffda`), White (`#e6f1ff`).
- **Typography**: Inter (UI) + JetBrains Mono (Code).
- **UX**: "Systems Thinker" approach — prioritizing performance, accessibility, and clear mental models.

## 🌟 Key Features
- **Thinking Manifesto**: Philosophy of engineering.
- **Interactive Problem Solver**: Simulated debugging console.
- **Technical Depth Tabs**: Deep dive into MERN/AWS/JS.
- **Admin Dashboard**: Analytics visualizer.
