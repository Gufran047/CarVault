CarVault – Car Inventory Management System

Overview

CarVault is a Full Stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to manage and organize cars within an inventory system.

The system provides complete CRUD functionality, image upload capability, search and filtering features, pagination, status management, and inventory aggregation.

This project demonstrates practical implementation of full-stack architecture, RESTful API design, database schema modeling using Mongoose, and modular React component development.

Project Links

GitHub Repository
Add your GitHub repository link here
Live Deployment (Render)
Features

Car Management (CRUD Operations)

• Add new cars with validation
• Retrieve and display all cars
• View detailed information of a single car
• Update car details
• Delete car records with confirmation
• Automatic createdAt and updatedAt timestamps using Mongoose
Inventory Control

• Store car details such as brand, model, year, price, fuel type, transmission, and color
• Upload and store car images
• Prevent invalid data entries using validation

⸻

Status Management

• Maintain car availability status (Available / Sold)
• Update car status when a vehicle is sold
• Display car availability in the user interface

⸻

Aggregation Feature

• Use database aggregation to calculate inventory statistics
• Display total number of Available cars
• Display total number of Sold cars
• Provide a quick overview of inventory status

⸻

Search, Filter and Pagination

• Search cars by brand or model
• Filter cars by fuel type
• Filter cars by availability status
• Filter cars by price range
• Pagination to handle large datasets efficiently

⸻

User Interface

• Responsive design
• Clean and structured layout
• Loading state handling
• Empty state handling
• Toast notifications for actions (add, update, delete)
• Modern UI built using Tailwind CSS and DaisyUI

⸻

Tech Stack

Frontend

React.js
React Router DOM
Axios
Tailwind CSS
DaisyUI
Lucide React
React Hot Toast

Backend

Node.js
Express.js
MongoDB
Mongoose
Multer (Image Upload)
CORS
dotenv

⸻

System Architecture

Client (React Frontend)
↓
REST API (Express Backend)
↓
MongoDB Database

The frontend communicates with the backend through RESTful APIs, while the backend handles business logic, validation, image uploads, and database operations.
API Endpoints
Database Schema

Each car document includes:

• brand (String)
• model (String)
• year (Number)
• price (Number)
• fuelType (String)
• transmission (String)
• color (String)
• status (Available / Sold)
• image (String)
• createdAt (Date)
• updatedAt (Date)
Project Structure
---

## 📂 Project Structure


CarVault/
│
├── backend/
│   └── src/
│       ├── server.js
│       │
│       ├── config/
│       │   └── db.js
│       │
│       ├── controllers/
│       │   └── carController.js
│       │
│       ├── middleware/
│       │   └── upload.js
│       │
│       ├── models/
│       │   └── Car.js
│       │
│       ├── routes/
│       │   └── carRoutes.js
│       │
│       ├── uploads/
│       │
│       └── .env
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   │
│   ├── public/
│   │
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       │
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── CarCard.jsx
│       │   └── CarNotFound.jsx
│       │
│       ├── lib/
│       │   ├── axios.js
│       │   └── utils.js
│       │
│       └── pages/
│           ├── HomePage.jsx
│           ├── CreatePage.jsx
│           └── CarDetailPage.jsx
│
├── package.json
├── .gitignore
└── README.md
Installation and Setup

Backend Setup
cd backend
npm install
npm run dev
Frontend Setup
cd frontend
npm install
npm run dev
Learning Outcomes

• Full Stack MERN Development
• REST API design and implementation
• MongoDB schema design using Mongoose
• Backend validation and middleware usage
• Image upload handling using Multer
• React component-based architecture
• API integration using Axios
• Clean and modular project structuring

⸻

Author

Gufran Khan