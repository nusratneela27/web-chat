# 💬 Real-Time Chat Application (MERN Stack)

A full-featured real-time chat application built with the MERN Stack (MongoDB, Express, React, Node.js) that allows users to search and message other users, send images, and receive instant notifications. It includes user authentication, online/offline indicators, and more.

## Live Link:
Hosted in Render [On web Chat](https://web-chat-dpjo.onrender.com)

---

## 🚀 Features

### 🔐 Authentication
- User login and registration using **JWT**
- Passwords hashed using **bcrypt**
- Secure cookies and token handling with **cookie-parser**

### 💬 Real-Time Messaging
- Instant messaging with **Socket.IO**
- Supports **text** and **image** messages via **Multer**
- Real-time **notifications** for new messages
- Displays **online/offline** status of users

### 🧑‍🤝‍🧑 User Experience
- **Search** functionality to find users
- Responsive and modern UI with **Material-UI (MUI)**
- User message notifications with **React Hot Toast**

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO for real-time communication
- JWT for authentication
- Multer for handling image uploads
- dotenv, cors, path, cookie-parser

### Frontend
- React.js
- Redux Toolkit for state management
- React Router for navigation
- Socket.IO Client
- Material-UI (MUI)
- React Hook Form for form handling
- JWT Decode, Axios
