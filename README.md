# Teacher Management System(MERN Stack)

A full-stack Teacher Management System built using React.js, Node.js, Express.js, and MongoDB.

The system helps teachers manage students, classes, attendance, assignments, performance records, and profile information through a centralized dashboard.

---

## Features

### Authentication
- Teacher Registration
- Teacher Login
- JWT Authentication
- Protected Routes

### Dashboard
- Dynamic Welcome Message
- Teacher Information Overview

### Student Management
- Add Student
- Update Student
- Delete Student
- View Student Records

### Class Management
- Add Classes
- Update Classes
- Delete Classes
- Session Date Management
- Session Time Management

### Attendance Management
- Mark Attendance
- Track Attendance Records

### Assignment Management
- Create Assignments
- Update Assignments
- Delete Assignments
- Due Date Tracking
- Due Time Tracking
- PDF Upload Support

### Profile Management
- Update Teacher Profile
- Store Professional Information

### Performance Tracking
- Student Performance Monitoring

---

# Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Icons
- Vite

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas / MongoDB Compass
- Mongoose

## Authentication
- JWT
- bcryptjs

---

# Project Structure

```
Teacher_dashboard/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

# Prerequisites

Install the following software before running the project:

### 1. Node.js

Download:
https://nodejs.org

Verify Installation:

```bash
node -v
npm -v
```

---

### 2. MongoDB

Option 1:

MongoDB Compass

Download:
https://www.mongodb.com/products/compass

Option 2:

MongoDB Atlas

Create free cluster:
https://www.mongodb.com/atlas

---

### 3. Visual Studio Code

Download:

https://code.visualstudio.com

Recommended Extensions:

- ES7 React Snippets
- Prettier
- MongoDB for VS Code
- Tailwind CSS IntelliSense

---

# Installation Steps

## Clone Repository

```bash
git clone https://github.com/aarti12217444/teacher_dashboard.git
```

Move into project folder:

```bash
cd teacher_dashboard
```

---

# Backend Setup

Move to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Start backend:

```bash
npm start
```

or

```bash
nodemon server.js
```

Backend runs on:

```
http://localhost:5000
```

---

# Frontend Setup

Open new terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

### Get Profile

```
GET /api/auth/profile/:id
```

### Update Profile

```
PUT /api/auth/profile/:id
```

---

## Students

```
GET /api/students
POST /api/students
PUT /api/students/:id
DELETE /api/students/:id
```

---

## Classes

```
GET /api/classes
POST /api/classes
PUT /api/classes/:id
DELETE /api/classes/:id
```

---

## Assignments

```
GET /api/assignments
POST /api/assignments
PUT /api/assignments/:id
DELETE /api/assignments/:id
```

---

# Environment Variables

Backend `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# Common Issues

### MongoDB Connection Error

Check:

```env
MONGO_URI
```

value is correct.

---

### JWT Error

Check:

```env
JWT_SECRET
```

exists in `.env`.

---

### Frontend Not Connecting

Check backend is running:

```
http://localhost:5000
```

and Axios base URL is correct.

---

# Future Enhancements

- Student Assignment Submission
- Assignment Evaluation
- Email Notifications
- Attendance Reports
- Analytics Dashboard
- Charts & Graphs
- Admin Panel
- Cloud Storage Integration

---

# New Features Added

## Security Features

### Google reCAPTCHA

* Bot Protection on Login
* Bot Protection on Registration
* Prevents Automated Attacks

### Password Security

* Minimum Password Length Validation
* Encrypted Password Storage using bcryptjs

### Forgot Password System

* Email-based Password Recovery
* OTP Generation
* OTP Verification
* Secure Password Reset

### Email Service

* Nodemailer Integration
* Gmail App Password Authentication
* OTP Delivery via Email

---

# Additional Backend Packages

```bash
npm install nodemailer
npm install bcryptjs
npm install jsonwebtoken
npm install multer
npm install dotenv
npm install cors
npm install mongoose
```

---

# Additional Frontend Packages

```bash
npm install react-google-recaptcha
npm install react-router-dom
npm install axios
npm install react-icons
```

---

# Authentication Flow

Register
→ Verify reCAPTCHA
→ Create Account

Login
→ Verify reCAPTCHA
→ Access Dashboard

Forgot Password
→ Enter Email
→ Receive OTP
→ Verify OTP
→ Reset Password
→ Login Again

---

# Environment Variables

Backend `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL_USER=your_gmail@gmail.com

EMAIL_PASS=your_google_app_password
```

Frontend `.env`

```env
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

---

# Security Implementations

* JWT Authentication
* Password Hashing (bcryptjs)
* Google reCAPTCHA
* Protected Routes
* Environment Variables
* OTP-Based Password Reset
* Secure Email Authentication

---

# Current Version

Version: 2.0

Latest Updates:

* Added Google reCAPTCHA
* Added Forgot Password Feature
* Added OTP Verification
* Added Password Reset
* Added Email Notifications
* Improved Authentication Security
* Added PDF Upload Support

```
```


# Source Code

Repository:

https://github.com/aarti12217444/teacher_dashboard

---

If you find any issues or have suggestions for improvement, feel free to create an issue or contribute to the project.
