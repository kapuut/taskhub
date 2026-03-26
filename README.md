# TaskHub Final Project (Fullstack)

TaskHub adalah aplikasi Task Manager kolaboratif berbasis React + Redux (frontend) dan Node.js + Express + MongoDB (backend).

## Kriteria yang Dipenuhi

- Task CRUD (Create, Read, Update, Delete)
- Filter dan sorting task
- Global state management dengan Redux Toolkit
- Asynchronous API operations (GET, POST, PUT, DELETE)
- Testing minimal 2 komponen (React Testing Library)
- Advanced topic (lazy loading komponen ringkasan)
- Build dan deployment ke Vercel

## Struktur

- `client/` - Aplikasi React (Create React App)
- `server/` - Express app dan MongoDB model/controller/route
- `api/index.js` - Vercel Serverless Function entrypoint

## Development Lokal

### 1) Backend

Buat file `.env` di root project berdasarkan `.env.example`.

Contoh:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/taskhub
CORS_ORIGIN=http://localhost:3000
```

Jalankan backend (port default 5000):

```bash
node server/server.js
```

### 2) Frontend

Buat file `.env` di folder `client` berdasarkan `client/.env.example`.

Contoh:

```env
HOST=localhost
REACT_APP_API_URL=http://localhost:5000/api
```

Jalankan frontend:

```bash
cd client
npm start
```

## Deploy Aman ke Vercel

### 1) Hubungkan repository ke Vercel

Vercel akan menggunakan konfigurasi di `vercel.json`.

### 2) Set Environment Variables di Vercel Project

- `MONGODB_URI` = koneksi MongoDB Atlas
- `CORS_ORIGIN` = URL aplikasi Vercel kamu, contoh `https://taskhub-abc.vercel.app`
- `REACT_APP_API_URL` = `/api`

### 3) Deploy

Vercel akan:

- Build frontend dari `client/`
- Menyediakan API lewat `api/index.js`
- Rewrite `/api/*` ke function backend

## Catatan Keamanan

- CORS dibatasi dengan whitelist dari `CORS_ORIGIN`.
- API tidak mengekspos detail error sensitif pada response produksi.
- Backend melakukan validasi input untuk create/update task.
