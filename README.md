# Full-Stack To-Do Authentication App

A clean, production-ready To-Do application built with **FastAPI** (Python) and **React** (TypeScript + Tailwind CSS).

## Features
- **Authentication**: JWT-based login and registration with password hashing (bcrypt).
- **Protected Routes**: Dashboard accessible only to authenticated users.
- **To-Do Management**: Create, view, toggle, and delete tasks (per-user storage).
- **Premium UI**: Modern, responsive design using Tailwind CSS and Lucide icons.
- **Security**: CORS enabled, secure password handling, and token expiration.
- **Logging**: All backend requests and errors are logged to `backend/app.log`.

---

## Project Structure
```text
/backend
  ├── auth/           # Auth utilities & JWT
  ├── models/         # SQLAlchemy models
  ├── routes/         # API endpoints
  ├── schemas/        # Pydantic validation
  ├── utils/          # Logging & helpers
  ├── database.py     # DB configuration
  └── main.py         # App entry point
/frontend
  ├── src/api/        # Axios client
  ├── src/components/ # Reusable UI components
  ├── src/pages/      # Auth & Dashboard pages
  ├── src/types/      # TS interfaces
  └── tailwind.config.js
```

---

## Setup Instructions

### 1. Backend Setup (Python)
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - **Windows**: `venv\Scripts\activate`
   - **Mac/Linux**: `source venv/bin/activate`
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Run the server:
   ```bash
   python main.py
   ```
   *The API will be available at http://localhost:8000*

### 2. Frontend Setup (React)
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The app will be available at http://localhost:5173* (or similar)

---

## Technical Details
- **Backend**: FastAPI, SQLAlchemy (SQLite), JWT (python-jose), Passlib.
- **Frontend**: React 18, TypeScript, Tailwind CSS, Axios, React Router, Lucide Icons.
