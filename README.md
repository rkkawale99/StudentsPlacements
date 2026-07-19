# 🎓 Student Placement Management System - Frontend

A modern **React + Vite** based frontend for the **Student Placement Management System**. This application provides separate dashboards and functionalities for Students, Companies, and Administrators to streamline the campus placement process.

---

## 🚀 Features

### 👨‍🎓 Student Module
- Student Registration & Login
- JWT Authentication
- Dashboard
- Complete Profile Management
- Academic Details
- Skills Management
- Projects & Certifications
- Resume Upload
- Company Search
- Job Listings
- Apply for Jobs
- Track Applications
- Interview Schedule
- Notifications
- Placement Status

---

### 🏢 Company Module
- Company Registration & Login
- Dashboard
- Company Profile
- Create Job Drives
- Manage Job Drives
- View Applicants
- Schedule Interviews
- Publish Results
- Offer Letter Management

---

### 👨‍💼 Admin Module
- Dashboard
- Manage Students
- Manage Companies
- Manage Departments
- Announcements
- Monitor Placement Statistics

---

## 🛠️ Tech Stack

- React 19
- Vite
- React Router DOM
- Axios
- Bootstrap 5
- React Icons
- Context API
- JWT Authentication

---


---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/StudentPlacementFrontend.git
```

Go to project folder

```bash
cd StudentPlacementFrontend
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

The application will run at

```
http://localhost:5173
```

---

## 🔗 Backend API

This frontend communicates with the Spring Boot backend.

Default Backend URL

```
http://localhost:8080
```

Update your API configuration inside:

```
src/utils/axios.js
```

Example

```javascript
import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080/api",
});
```

---

## 🔐 Authentication

The application uses **JWT Token Authentication**.

After successful login:

- JWT Token is stored in Local Storage
- Axios automatically sends the Authorization header
- Protected Routes are secured using React Router

---

## 📸 Major Screens

- Login
- Register
- Student Dashboard
- Company Dashboard
- Admin Dashboard
- Job Management
- Application Management
- Interview Management
- Notifications
- Profile Management

---

## 📦 Build Project

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

## 👨‍💻 Developed By

**Rushikesh Kawale**

---

## 📄 License

This project is developed for educational purposes as part of the **Student Placement Management System**.