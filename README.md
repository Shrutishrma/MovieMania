# 🎬 CineHub: Full-Stack Movie Management System

**CineHub** is a robust, data-driven web application built for managing a comprehensive cinema library. This project features a **React 19** frontend and an **Express 5** backend, utilizing **MySQL** for persistent storage with a focus on performance through connection pooling and secure SSL database communication.

---

## 🚀 Key Features

* **Full CRUD Operations:** Seamlessly create, read, update, and delete movie entries in a centralized database.
* **Dynamic Data Seeding:** Includes a specialized script (`seed.js`) to rapidly populate the database with curated movie data for testing and development.
* **Secure Connection Architecture:** Implements `.env` variable management and SSL encryption to ensure secure communication with cloud-hosted databases (Clever Cloud).
* **Scalable Performance:** Utilizes `mysql2.createPool` instead of single connections to handle multiple concurrent user requests efficiently.
* **Intuitive UI/UX:** A responsive, modern interface styled with **Tailwind CSS**, featuring real-time movie details and a dedicated user feedback system.

---

## 🛠️ Technical Stack

### **Frontend**
* **Library:** React 19
* **Routing:** React Router v7
* **Styling:** Tailwind CSS & PostCSS
* **API Communication:** Axios

### **Backend**
* **Framework:** Node.js & Express 5
* **Database Engine:** MySQL (using `mysql2` driver)
* **Security & Env:** Dotenv, CORS, and SSL

---

## 📂 Project Architecture

```text
CineHub/
├── backend/
│   ├── server.js          # REST API & Database pooling logic
│   ├── seed.js            # Initial database population script
│   └── package.json       # Backend dependencies
└── client/
    ├── src/
    │   ├── App.js         # Navigation and routing controller
    │   ├── components/    # Reusable UI elements (Navbar)
    │   └── pages/         # View logic (Home, MovieDetail, Feedback)
    └── tailwind.config.js # Custom design configuration
```

---

## 📡 API Endpoints

The backend provides a clean RESTful interface for the frontend to consume movie data:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/movies` | Fetch all movies from the library |
| `GET` | `/movies/:id` | Retrieve detailed information for a single movie |
| `POST` | `/movies` | Add a new movie to the database |
| `PUT` | `/movies/:id` | Update existing movie attributes |
| `DELETE` | `/movies/:id` | Permanently remove a movie from the registry |

---
