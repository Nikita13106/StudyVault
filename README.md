# 📚 StudyVault - Student Resource Sharing Hub

A minimal, production-quality full-stack app where students upload and download
academic resources. Files are stored on **Cloudinary**, metadata in **MongoDB**,
served by a **Node/Express** API and a clean **React (Vite)** frontend.

---

## ✨ Features

- **Upload** a file with a description → file goes to Cloudinary, metadata to MongoDB.
- **Global feed** of resources, newest first, with one-click **download**.
- New uploads appear **instantly** (no page refresh).
- **Loading & error states** on upload and fetch.
- Bonus: **file-type validation** (PDF / images / Word / PPT / TXT), **10 MB size limit**, subtle entry **animations**.

---

## 🗂 Folder Structure

```
studyvault/
├── README.md
├── server/                     # Node + Express + MongoDB + Cloudinary
│   ├── server.js               # App entry, middleware, error handler
│   ├── config/
│   │   ├── db.js               # MongoDB connection
│   │   └── cloudinary.js       # Cloudinary SDK config
│   ├── models/
│   │   └── Resource.js         # Mongoose schema
│   ├── middleware/
│   │   └── upload.js           # Multer (memory) + type/size validation
│   ├── controllers/
│   │   └── resourceController.js  # upload + fetch logic
│   ├── routes/
│   │   └── resources.js        # POST /upload, GET /resources
│   └── .env
│
└── client/                     # React (Vite)
    ├── index.html              # Semantic HTML + SEO meta tags
    ├── vite.config.js          # Dev proxy → backend
    ├── .env
    └── src/
        ├── main.jsx
        ├── App.jsx             # State + data fetching
        ├── api.js              # fetch helpers
        ├── styles.css
        └── components/
            ├── UploadForm.jsx
            ├── ResourceList.jsx
            └── ResourceCard.jsx
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB database (local, or free [MongoDB Atlas](https://www.mongodb.com/atlas))
- A free [Cloudinary](https://cloudinary.com/) account

### 1. Backend

```bash
cd server
npm install
npm start               # starts on http://localhost:5000
```

Fill `.env` with your credentials:

### 2. Frontend

```bash
cd client
npm install
npm run dev               # starts on http://localhost:5173
```

Open **http://localhost:5173** — the Vite dev server proxies `/api` calls to the
backend, so no extra config is needed locally.

---

## 🧱 Tech Stack

React (Vite) · Node.js · Express · MongoDB (Mongoose) · Cloudinary · Multer

---
