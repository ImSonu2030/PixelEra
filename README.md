# PixelEra
PixelEra is a full-stack MERN application that provides AI-powered image background removal. It operates on a credit-based system, allowing users to sign up, receive free credits to try the service, and purchase more credits using the Cashfree payment gateway.

🔗 **[Live Demo](https://pixelera.vercel.app/)**

## Core Features
- **Full-Stack Architecture**:
    - Frontend: A modern, responsive UI built with React, Vite, and Tailwind CSS.
    - Backend: A Node.js/Express server that manages API requests, user data, and payment logic.
- **AI Background Removal**: Integrates with the Clipdrop API to perform fast and accurate background removal.
- **User Authentication**: Secure sign-up, sign-in, and user management handled by Clerk.
- **Credit-Based System**: Users receive 5 free credits upon signing up and can purchase additional credits through the “Buy Credits” page.
- **Payment Integration**: Built-in payment flow using Cashfree to create orders and handle payment confirmation webhooks.
- **Database**: Uses MongoDB (via Mongoose) to store user data, including clerkId and creditBalance.
- **Modern UI/UX**: Includes an interactive "before & after" image slider, a dark mode toggle, and a seamless file upload process.


## Getting Started

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/pixelera.git
cd pixelera
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Create a .env file and add your credentials
```bash
VITE_CLIPDROP_API_KEY=your_clipdrop_key
CLERK_PUBLISHABLE_KEY=your_clerk_key
CASHFREE_CLIENT_ID=your_cashfree_client_id
CASHFREE_SECRET_KEY=your_cashfree_secret
MONGO_URI=your_mongodb_connection_string
```

#### 4. Run the app
```bash
npm run dev
```

## Tech Stack
<p align="left">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="30" alt="React" title="React" style="margin-right: 10px;" />
  <img src="https://vitejs.dev/logo.svg" width="30" alt="Vite" title="Vite" style="margin-right: 10px;"/>
  <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg" width="30" alt="Tailwind CSS" title="Tailswind css" style="margin-right: 10px;"/>
  <img src="https://nodejs.org/static/logos/jsIconGreen.svg" width="30" alt="Node.js" title="Node.js" style="margin-right: 10px;"/>
  <img src="https://webimages.mongodb.com/_com_assets/cms/kuyj3d95v5vbmm2f4-horizontal_white.svg" width="100" alt="MongoDB" title="MongoDB" style="margin-right: 10px;"/>
  <img src="https://avatars.githubusercontent.com/u/49538330?s=48&v=4" width="30" alt="Clerk" title="Clerk authentication" style="margin-right: 10px;"/>
  <img src="https://avatars.githubusercontent.com/u/25682196?s=200&v=4" width="30" alt="Cashfree" title="Cashfree payment gateway" style="margin-right: 10px;"/>
  <img src="https://registry.npmmirror.com/@lobehub/icons-static-png/1.74.0/files/dark/clipdrop.png" width="30" alt="Clipdrop" title="Clipdrop by Jasper" />
</p>
