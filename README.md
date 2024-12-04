# College Scheduling System - Admin Panel and Role-Based Access Control (RBAC)

## Overview

This repository contains the codebase for a **College Scheduling System** built using modern JavaScript technologies, primarily **React** for the frontend, and **Node.js/Express** for the backend. The application allows the administration and management of college class schedules, including teacher assignments, student management, and role-based access control (RBAC) for different users (Admin, Teacher, and Student).

The system is designed to:
- **Manage Class Schedules**: Admins (Head of Department) can assign teachers to classes and manage class schedules.
- **RBAC Implementation**: A secure role-based access system where users are granted permissions based on their roles (Admin, Teacher, Student).
- **Teacher Availability**: Teachers can view their schedules, request changes, and see which classes they are assigned to.
- **User Management**: Admins can add, modify, or delete users and manage their roles and permissions.

## Technologies Used

- **Frontend**:
  - **React**: A powerful JavaScript library for building user interfaces.
  - **Redux**: For state management, ensuring efficient data flow across components.
  - **React Router**: For managing navigation and routing within the application.
  - **Material-UI**: A popular React UI framework to build modern and responsive UIs.
  - **Framer Motion**: For adding animations and transitions.
  - **Lucide**: A collection of open-source icons, used in the app for a clean and modern interface.

- **Backend**:
  - **Node.js**: A JavaScript runtime environment used to build the server-side of the application.
  - **Express**: A web application framework for Node.js to handle routes and API requests.
  - **MongoDB**: A NoSQL database used to store user data, schedules, roles, and permissions.
  - **JWT (JSON Web Token)**: For secure authentication and role-based authorization.
  - **Bcrypt.js**: For password hashing to ensure security.
  - **Mongoose**: A MongoDB object modeling tool for Node.js, used to interact with MongoDB databases.

- **Other Tools**:
  - **Redux Toolkit**: For efficient and scalable Redux implementation.
  - **Axios**: For making HTTP requests from the frontend to the backend.
  - **dotenv**: For managing environment variables.
  - **Toastify**: For displaying notifications like success or error messages.

## Features

### 1. **Role-Based Access Control (RBAC)**

The system is built with a robust **Role-Based Access Control** to manage the access levels of different users. Each user is assigned one of the following roles:

- **Admin (HOD)**: Can manage schedules, approve/reject changes, assign teachers to classes, manage user roles, and perform administrative tasks.
- **Teacher**: Can view their schedule, request schedule changes, and manage their own profile.
- **Student**: Can view class schedules and teachers assigned to each class.

#### Role Flow and Permissions:

| Role      | Permissions                                                             |
|-----------|-------------------------------------------------------------------------|
| **Admin** | Can view, modify, delete schedules, manage users, assign teachers.       |
| **Teacher** | Can view their schedule, request changes, and manage own profile.    |
| **Student** | Can view class schedules and their assigned teachers.                 |

### 2. **Scheduling System**

The **Admin** (Head of Department) can assign teachers to various periods of the day, taking into account the availability of teachers. If a teacher is unavailable, the Admin can see that information and ensure that there are no scheduling conflicts.

### 3. **Teacher Assignment**

Teachers are dynamically assigned to classes based on the schedules. The system allows for:
- Viewing of schedules by teachers.
- Assigning teachers to specific time slots for particular classes.
- Removing or changing teacher assignments.

### 4. **Search and Filter**

A comprehensive **search and filter** system is implemented for schedules. Admins can filter by day, class, or teacher to view specific schedules quickly.

### 5. **User Management**

Admins can:
- Create, modify, and delete users.
- Assign roles (Admin, Teacher, Student) to users.
- Restrict access based on roles and permissions.

### 6. **Responsive Design**

The system uses a **responsive design**, ensuring that the application is fully functional across devices, from desktops to mobile phones.

## Project Structure

The project is structured to keep the code clean, organized, and maintainable:

```
├── backend
│   ├── models
│   │   ├── User.js
│   │   ├── Schedule.js
│   │   └── Role.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── scheduleRoutes.js
│   │   └── userRoutes.js
│   └── controllers
│       ├── authController.js
│       ├── scheduleController.js
│       └── userController.js
├── frontend
│   ├── components
│   │   ├── Header.js
│   │   ├── ScheduleTable.js
│   │   ├── Sidebar.js
│   │   └── UserProfile.js
│   ├── redux
│   │   ├── actions.js
│   │   ├── reducers.js
│   │   └── store.js
│   ├── pages
│   │   ├── Dashboard.js
│   │   ├── Schedule.js
│   │   └── Users.js
│   ├── App.js
│   ├── index.js
│   └── routes.js
└── .env
```

## API Endpoints

The backend exposes the following API endpoints:

### Authentication & User Management
- **POST /api/auth/register** - Register a new user.
- **POST /api/auth/login** - Login and retrieve JWT token.
- **GET /api/users** - Get a list of all users (Admin only).
- **PATCH /api/users/:id** - Update user details.
- **DELETE /api/users/:id** - Delete a user (Admin only).

### Schedule Management
- **GET /api/admin/classS/:classId** - Fetch schedules for a specific class.
- **POST /api/admin/assignS** - Assign a teacher to a class.
- **POST /api/admin/deleteS/:scheduleId** - Delete a schedule entry.

## Database Models

### 1. **User Model**
```javascript
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Teacher', 'Student'], default: 'Student' },
});
```

### 2. **Schedule Model**
```javascript
const ScheduleSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  classId: { type: String, required: true },
  day: { type: String, enum: ['M', 'T', 'W', 'Th', 'F'], required: true },
  period: { type: Number, required: true },
});
```


## Frontend Components

### 1. **ScheduleTable Component**
The `ScheduleTable` component is responsible for displaying the class schedule in a tabular format. It includes functionalities such as:
- Viewing teacher assignments.
- Assigning teachers to free periods using the "Plus" button.
- Deleting existing assignments.

### 2. **Sidebar Component**
The sidebar provides navigation between various parts of the application:
- Dashboard
- Schedules
- Users
- Settings

### 3. **UserProfile Component**
The `UserProfile` component allows teachers and students to view and edit their profiles. Admins can update any user's information.



## Setup Instructions

### Prerequisites
- MongoDB installed and running
- Node.js and npm installed

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/college-scheduling-system.git
   cd college-scheduling-system
   ```

2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables in `.env` file:
   ```bash
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/schedule_db
   JWT_SECRET=your_jwt_secret
   ```

4. Import Collation Data
   The project includes a `RBAC.zip` file containing JSON files for initializing MongoDB collections. Follow these steps to import the data:

   a. Extract the `RBAC.zip` file
   
   b. Use MongoDB's `mongoimport` utility to import the collections:
   ```bash
   # Make sure you're in the directory containing the JSON files
   
   # Import Users Collection
   mongoimport --db schedule_db --collection users --file users.json --jsonArray
   
   # Import Schedules Collection
   mongoimport --db schedule_db --collection schedules --file schedules.json --jsonArray
   
   # Import Roles Collection
   mongoimport --db schedule_db --collection roles --file roles.json --jsonArray
   ```

   Note: Replace `schedule_db` with the database name specified in your `MONGODB_URI` if different.

5. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React application:
   ```bash
   npm start
   ```

### Running Both Backend and Frontend
You can run both the backend and frontend concurrently using tools like **Nodemon** for the backend and the default React development server for the frontend.

### Troubleshooting
- Ensure MongoDB is running before launching the application
- Verify that all JSON files from `RBAC.zip` are imported correctly
- Check that environment variables are correctly set
- Confirm that all dependencies are installed


### Running Both Backend and Frontend
You can run both the backend and frontend concurrently using tools like **Nodemon** for the backend and the default React development server for the frontend.

## Conclusion

This **College Scheduling System** offers a complete solution for managing schedules, teachers, and students with an emphasis on security through **RBAC** and a smooth user experience. With modern tools such as **React**, **Redux**, and **Material-UI**, it provides a scalable, maintainable, and efficient platform for academic management.

---

**Note**: Ensure that MongoDB is running before launching the application, and use valid environment variables for secure connections.
