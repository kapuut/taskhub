# Final Project Submission - TaskHub (Fullstack)

## 1. Judul Proyek

TaskHub - A Collaborative Task Manager

## 2. Deskripsi Singkat

TaskHub adalah aplikasi manajemen task kolaboratif berbasis web dengan arsitektur fullstack:

- Frontend: React (Create React App)
- State Management: Redux Toolkit
- Backend: Node.js + Express (REST API)
- Database: MongoDB
- Deployment: Vercel

Aplikasi mendukung pengelolaan task tim secara end-to-end dengan operasi asynchronous API, filter/sorting, pengujian komponen, serta deployment publik.

## 3. Arsitektur

- client/: aplikasi React + Redux
- server/: Express app, model, controller, routes
- api/index.js: entrypoint serverless function Vercel
- vercel.json: konfigurasi build frontend, rewrite API, dan security headers

Alur data:

1. Frontend melakukan request async ke endpoint /api/tasks.
2. Backend memproses request CRUD dan validasi payload.
3. Data disimpan/dibaca dari MongoDB.
4. Respons JSON dikonsumsi Redux thunk untuk update global state.

## 4. Fitur Wajib dan Status

### A. Task CRUD (Create, Read, Update, Delete) - TERPENUHI

- Create: tambah task baru
- Read: menampilkan daftar task
- Update: ubah status task (To Do, In Progress, Done)
- Delete: hapus task

Seluruh operasi dilakukan melalui backend REST API.

### B. Filter & Sorting Task - TERPENUHI

- Filter status: All, To Do, In Progress, Done
- Search berdasarkan judul/deskripsi
- Sorting: newest, oldest, title, status

### C. State Management Global (Redux/Vuex) - TERPENUHI

Menggunakan Redux Toolkit untuk:

- Menyimpan daftar task global
- Menyimpan state loading/error
- Menyimpan state filter/sorting

### D. Asynchronous API Operations - TERPENUHI

Menggunakan async thunk (fetch/post/update/delete):

- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

### E. Testing Minimal 2 Komponen - TERPENUHI

Testing dengan React Testing Library (3 test suite):

- App.test.js
- TaskForm.test.js
- TaskFilters.test.js

### F. Advanced Topic - TERPENUHI

Menggunakan lazy loading dengan React lazy + Suspense untuk komponen ringkasan task.

### G. Build dan Deployment ke Platform Publik - TERPENUHI

- Build frontend berhasil
- Konfigurasi deploy Vercel disiapkan untuk frontend + backend serverless API

## 5. Keamanan dan Hardening

Penerapan keamanan dasar untuk deployment:

1. CORS whitelist berbasis environment variable CORS_ORIGIN
2. Security headers di Vercel:
   - X-Content-Type-Options: nosniff
   - X-Frame-Options: DENY
   - Referrer-Policy: strict-origin-when-cross-origin
3. Validasi input backend pada create/update task
4. Respons error API dibatasi agar tidak mengekspos detail sensitif

## 6. Konfigurasi Environment

### Root project (.env)

- MONGODB_URI=<connection string MongoDB>
- CORS_ORIGIN=https://your-app.vercel.app,http://localhost:3000

### Client (.env)

- HOST=localhost
- REACT_APP_API_URL=http://localhost:5000/api

### Vercel Environment Variables

- MONGODB_URI
- CORS_ORIGIN
- REACT_APP_API_URL=/api

## 7. Endpoint API

- GET /api/tasks -> Ambil semua task
- POST /api/tasks -> Buat task baru
- PUT /api/tasks/:id -> Perbarui task
- DELETE /api/tasks/:id -> Hapus task

## 8. Bukti Validasi Teknis

- Frontend test: lulus (3/3 suite)
- Frontend production build: berhasil
- Backend app load smoke test: berhasil

## 9. Cara Menjalankan Lokal

### Backend

1. Buat file .env di root
2. Isi MONGODB_URI dan CORS_ORIGIN
3. Jalankan: node server/server.js

### Frontend

1. Buat file .env di folder client
2. Isi HOST dan REACT_APP_API_URL
3. Jalankan: cd client
4. Jalankan: npm start

## 10. Kesimpulan

TaskHub telah memenuhi seluruh kriteria Final Project Back-End:

- CRUD task
- Filter dan sorting
- State management global
- Operasi asynchronous API
- Testing komponen
- Topik lanjutan
- Build dan deployment publik

Dengan arsitektur fullstack ini, proyek valid untuk penilaian yang mewajibkan integrasi backend dan siap dideploy secara aman di Vercel.
