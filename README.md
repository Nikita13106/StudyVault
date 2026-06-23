# 📚 StudyVault - Student Resource Sharing Hub

A minimal, production-quality full-stack app where students upload, organize, and download academic resources. Files are stored on **Cloudinary**, metadata in **MongoDB**, served by a **Node/Express** API and a clean **React (Vite)** frontend.

## [![Live Demo](https://img.shields.io/badge/Live%20Demo-StudyVault-blueviolet?style=for-the-badge)](https://studyvault-platform.vercel.app/)

## ✨ Features

- 📤 **Upload Resources**
  Upload files with descriptions → stored securely on Cloudinary with metadata in MongoDB.

- 🌍 **Global Resource Feed**
  Browse all resources in a clean, responsive UI with instant updates.

- 📥 **One-Click Download**
  Files download directly (no preview issues) using optimized Cloudinary delivery.

- ⚡ **Real-Time UI Updates**
  New uploads and deletions reflect instantly without refresh.

- 🔐 **Authentication System**
  Secure login & registration with JWT-based authentication.

- 👤 **User Dashboard (Your Uploads)**
  View and manage your uploaded resources in one place.

- 🔍 **Advanced Search & Filters**
  Filter resources by:
  - Year
  - Semester
  - Subject
  - Modules

- 🧩 **Smart Categorization**
  Resources are structured for better navigation and discovery.

- 📱 **Fully Responsive UI**
  - Desktop → Hover actions
  - Mobile → 3-dot menu with actions

- 🛡 **Validation & Security**
  - File type validation (PDF, Images, Docs, PPT, TXT)
  - Max file size: 10MB
  - Protected routes for uploads & deletion

- 🎨 **Modern UI/UX**
  - Tailwind CSS styling
  - Smooth animations
  - Clean, minimal design

---

## 🗂 Folder Structure

```
studyvault/
├── README.md
├── server/
│   ├── server.js
│   ├── package.json
│   ├── .gitignore
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── models/
│   │   ├── Resource.js
│   │   └── User.js
│   ├── middleware/
│   │   ├── upload.js
│   │   └── auth.js
│   ├── controllers/
│   │   ├── resourceController.js
│   │   └── authController.js
│   ├── routes/
│   │   ├── resources.js
│   │   └── auth.js
│   └── .env
│
└── client/
    ├── index.html
    ├── vite.config.js
    ├── .env
    ├── .gitignore
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    └── src/
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Resources.jsx
        │   └── Upload.jsx
        ├── utils/
        │   └── formatModule.js
        ├── main.jsx
        ├── App.jsx
        ├── api.js
        ├── index.css
        ├── styles.css
        └── components/
            ├── UploadForm.jsx
            ├── ResourceList.jsx
            ├── ResourceCard.jsx
            ├── Navbar.jsx
            └── Footer.jsx
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (Local or Atlas)
- Cloudinary Account

---

### 1. Backend Setup

```bash
cd server
npm install
npm start
```

Create `.env`:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🧱 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Storage:** Cloudinary
- **Auth:** JWT
- **Upload Handling:** Multer

---

## 📌 Highlights

- Clean scalable architecture (MERN)
- Real-world features (auth, filtering, dashboard)
- Production-ready deployment (Vercel + backend)
- Strong UI/UX focus

---

## 💡 Future Scope

- Bookmark / Save resources
- Comments & discussions
- Admin panel
- Analytics dashboard
