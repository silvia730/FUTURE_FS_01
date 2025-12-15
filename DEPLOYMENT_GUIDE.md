# 🚀 Portfolio Deployment Guide

Complete guide for deploying your full-stack portfolio with admin dashboard.

---

## 📋 Table of Contents
1. [Overview](#overview)
2. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
3. [Backend Deployment (Render)](#backend-deployment-render)
4. [Environment Variables](#environment-variables)
5. [Security Considerations](#security-considerations)
6. [Post-Deployment Steps](#post-deployment-steps)

---

## Overview

Your portfolio consists of:
- **Frontend**: React app (Vite) → Deploy to **Vercel** or **Netlify**
- **Backend**: Node.js/Express API → Deploy to **Render** or **Railway**
- **Database**: MongoDB Atlas (already cloud-hosted)
- **Admin Dashboard**: Protected route at `/admin`

---

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Production

1. **Update API Base URL** in `client/src/services/api.js`:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

2. **Create `.env.production` in `/client`**:
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

3. **Update `vite.config.js`** (if needed):
```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  }
})
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
cd client
npm install -g vercel
vercel login
vercel --prod
```

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. **Configure Build Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Add Environment Variable**:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com` (add after backend deployment)
6. Click **Deploy**

---

## Backend Deployment (Render)

### Step 1: Prepare Backend for Production

1. **Ensure `package.json` has start script**:
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

2. **Update CORS in `server/index.js`**:
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://your-portfolio.vercel.app', // Add your Vercel domain
  'https://your-custom-domain.com'     // If you have one
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

3. **Create `render.yaml` in project root** (optional but recommended):
```yaml
services:
  - type: web
    name: portfolio-backend
    env: node
    region: oregon
    plan: free
    buildCommand: cd server && npm install
    startCommand: cd server && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
      - key: MONGODB_URI
        sync: false
      - key: EMAIL_USER
        sync: false
      - key: EMAIL_PASS
        sync: false
```

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com) and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. **Configure Service**:
   - **Name**: `portfolio-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` or `node index.js`
   - **Instance Type**: `Free`

5. **Add Environment Variables** (see below section)
6. Click **"Create Web Service"**
7. Wait for deployment (5-10 minutes)
8. Copy the deployment URL: `https://portfolio-backend-xxxx.onrender.com`

---

## Environment Variables

### Backend (Render)
Add these in Render's Environment Variables section:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
EMAIL_USER=silvianjeri730@gmail.com
EMAIL_PASS=your-app-specific-password
CORS_ORIGIN=https://your-portfolio.vercel.app
```

### Frontend (Vercel)
Add in Vercel's Environment Variables:

```env
VITE_API_URL=https://portfolio-backend-xxxx.onrender.com
```

---

## Security Considerations

### 1. **Protect Admin Route**

The admin dashboard is at `/admin`. Here are security options:

#### Option A: Basic Protection (Current)
- Admin route is accessible to anyone who knows the URL
- **Not recommended for production**

#### Option B: Add Authentication (Recommended)

**Create a simple admin authentication:**

```javascript
// server/routes/admin.js (NEW FILE)
const express = require('express');
const router = express.Router();

// Simple admin authentication middleware
const adminAuth = (req, res, next) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const providedPassword = req.headers['x-admin-password'];
  
  if (providedPassword === adminPassword) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Protected admin routes
router.get('/contacts', adminAuth, async (req, res) => {
  // Your existing contact fetch logic
});

module.exports = router;
```

Add to environment variables:
```env
ADMIN_PASSWORD=your-super-secret-password-here
```

#### Option C: Remove Admin Route from Production
If you only need admin access during development:

**In `client/src/App.jsx`**, conditionally show admin route:
```javascript
{import.meta.env.MODE === 'development' && (
  <Route path="/admin" element={<AdminDashboard />} />
)}
```

### 2. **Additional Security Measures**

```bash
# Install security packages
cd server
npm install helmet rate-limit express-rate-limit
```

Update `server/index.js`:
```javascript
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Apply helmet for security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
```

---

## Post-Deployment Steps

### 1. Update Frontend with Backend URL

After backend is deployed:
1. Copy Render backend URL
2. Go to Vercel → Your Project → Settings → Environment Variables
3. Update `VITE_API_URL` with the Render URL
4. Trigger a new deployment (Vercel → Deployments → Redeploy)

### 2. Update Backend CORS

After frontend is deployed:
1. Copy Vercel frontend URL
2. Add to `allowedOrigins` in `server/index.js`
3. Push changes to GitHub (auto-deploys on Render)

### 3. Test Everything

✅ **Frontend Tests**:
- [ ] Portfolio loads correctly
- [ ] All sections display properly
- [ ] Contact form works
- [ ] Blog articles load
- [ ] Chatbot responds
- [ ] Mobile view looks good

✅ **Backend Tests**:
- [ ] API endpoints respond
- [ ] Contact form submissions save to MongoDB
- [ ] Email notifications work
- [ ] CORS allows frontend requests

✅ **Admin Tests** (if keeping):
- [ ] Admin route accessible
- [ ] Can view contact messages
- [ ] Authentication works (if implemented)

---

## Alternative Deployment Options

### Frontend Alternatives
- **Netlify**: Similar to Vercel, drag-and-drop option
- **GitHub Pages**: Free, but limited (static only)
- **Cloudflare Pages**: Fast CDN, generous free tier

### Backend Alternatives
- **Railway**: Similar to Render, $5/month free credit
- **Fly.io**: Global edge deployment
- **Heroku**: Paid plans only (no free tier)
- **AWS/Google Cloud**: More complex but scalable

---

## Recommended Deployment Strategy

### For YOUR Portfolio:

**Frontend**: → **Vercel** ✅
- Free tier is generous
- Automatic deployments from GitHub
- Great performance
- Easy custom domain setup

**Backend**: → **Render** ✅
- Free tier available
- Auto-deploys from GitHub
- Supports Node.js perfectly
- Easy environment variables

**Admin Dashboard**: → **Remove or Protect** 🔒
- **Option 1**: Remove `/admin` route in production
- **Option 2**: Add password protection
- **Option 3**: Use only in local development

---

## Quick Deployment Checklist

```bash
# 1. Deploy Backend First
✅ Set up MongoDB Atlas (already done)
✅ Deploy to Render with environment variables
✅ Test API endpoints
✅ Copy backend URL

# 2. Deploy Frontend
✅ Add backend URL to Vercel env variables
✅ Deploy to Vercel
✅ Test all features
✅ Copy frontend URL

# 3. Update CORS
✅ Add frontend URL to backend CORS whitelist
✅ Redeploy backend

# 4. Optional: Custom Domain
✅ Buy domain (Namecheap, Google Domains)
✅ Add to Vercel
✅ Update DNS records
```

---

## Need Help?

If you encounter issues:
1. Check Render/Vercel logs
2. Verify environment variables are set correctly
3. Test API endpoints directly using Postman
4. Check CORS configuration

---

Good luck with your deployment! 🚀
