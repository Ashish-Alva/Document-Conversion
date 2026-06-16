# Document Convertor

A MERN stack application for document and image conversion.

## Features
- User Authentication (Registration/Login)
- Admin Dashboard (Manage Users & Stats)
- File Upload & Management
- Conversions:
  - DOCX → PDF
  - PDF → DOCX
  - TXT → PDF
  - Image (PNG/JPG) → PDF
  - PDF → Image (PNG/JPG)
  - Image → Image (PNG ↔ JPG)

## Prerequisites
- Node.js
- MongoDB (Atlas or Local)
- Python 3.x

## Setup

### 1. Backend
1. Go to `backend/` folder.
2. Install dependencies:
   ```bash
   npm install
   pip install -r requirements.txt
   ```
3. Configure `.env` (MONGO_URI, JWT_SECRET).
4. Start server:
   ```bash
   node server.js
   ```

### 2. Frontend
1. Go to `frontend/` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start React app:
   ```bash
   npm start
   ```

## Admin Credentials (Default)
- **Email:** `admin@example.com`
- **Password:** `admin123`
