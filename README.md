# Kanbox

<img src="docs/readme-banner.png" alt="Kanbox Logo" />

<p align="center">
  <strong>A modern Kanban board application for project management</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#api-documentation">API</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## Features

- **📋 Kanban Boards**: Create and manage multiple project boards with customizable lists and cards
- **🎨 Drag & Drop**: Intuitive drag-and-drop interface
- **📝 Rich Text Editing**: Advanced card descriptions
- **🏷️ Labels & Filtering**: Organize cards with color-coded labels and powerful filtering by assigned users
- **📎 File Attachments**: Upload and manage files with Cloudinary integration
- **📱 Responsive Design**: Modern Material-UI interface that works on all devices

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with hooks and concurrent features
- **Vite** - Fast build tool and development server
- **Material-UI (MUI)** - Beautiful, accessible component library
- **Redux** - Predictable state management
- **React Router** - Declarative routing for React
- **Socket.io Client** - Real-time communication
- **React Hook Form** - Performant forms with easy validation
- **@hello-pangea/dnd** - Drag and drop functionality
- **TipTap** - Rich text editor
- **Axios** - HTTP client for API calls

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Cloudinary** - Cloud-based image and file storage
- **Socket.io** - Real-time bidirectional communication
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing

### DevOps & Tools

- **Docker** - Containerization platform
- **Docker Compose** - Multi-container orchestration
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Auto-restart for development

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Docker & Docker Compose** - [Download here](https://www.docker.com/get-started)
- **Git** - [Download here](https://git-scm.com/)

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd kanbox
   ```

2. **Set up environment variables**

   Create a `.env` file in the `backend` directory:

   ```bash
   # Backend Configuration
   PORT=3000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173

   # Database Configuration
   MONGODB_URI=mongodb://admin:password@mongodb:27017/kanbox?authSource=admin
   MONGO_DATABASE=kanbox

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d

   # Cloudinary Configuration (Optional)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   CLOUDINARY_FOLDER=kanbox
   ```

3. **Start the application**

   ```bash
   # Start all services (MongoDB, Backend, Frontend)
   docker compose -f backend/docker-compose.yml up -d

   # Or run in development mode with live reload
   docker compose -f backend/docker-compose.yml up
   ```

4. **Access the application**

   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:3000
   - **MongoDB**: localhost:27017

### Option 2: Manual Setup

1. **Start MongoDB with Docker**

   ```bash
   cd backend
   docker compose up -d mongodb
   ```

2. **Set up the backend**

   ```bash
   cd backend
   npm install
   npm run migrate:up  # Run database migrations
   npm run dev
   ```

3. **Set up the frontend**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📁 Project Structure

```
kanbox/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Custom middleware
│   │   ├── config/         # Configuration files
│   │   └── db/             # Database migrations & seeds
│   └── docker-compose.yml  # Docker orchestration
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # Redux state management
│   │   ├── hooks/         # Custom React hooks
│   │   └── theme/         # MUI theme configuration
│   └── vite.config.js     # Vite configuration
└── docs/                  # Documentation assets
```

## 🔧 Available Scripts

### Backend Scripts

```bash
cd backend

npm run dev          # Start development server with nodemon
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier

# Database commands
npm run migrate:up   # Run pending migrations
npm run migrate:down # Rollback last migration
npm run db:clean     # Clean database
```

### Frontend Scripts

```bash
cd frontend

npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌐 API Documentation

### Authentication Endpoints

- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user profile

### Board Management

- `GET /boards` - Get all user boards
- `POST /boards` - Create new board
- `GET /boards/:id` - Get board by ID
- `PUT /boards/:id` - Update board
- `DELETE /boards/:id` - Delete board

### List Management

- `GET /boards/:boardId/lists` - Get board lists
- `POST /boards/:boardId/lists` - Create new list
- `PUT /lists/:id` - Update list
- `DELETE /lists/:id` - Delete list

### Card Management

- `GET /lists/:listId/cards` - Get list cards
- `POST /lists/:listId/cards` - Create new card
- `PUT /cards/:id` - Update card
- `DELETE /cards/:id` - Delete card
- `POST /cards/:id/attachments` - Upload attachment

## 🔐 Environment Variables

### Required Variables

| Variable      | Description               | Example                            |
| ------------- | ------------------------- | ---------------------------------- |
| `PORT`        | Backend server port       | `3000`                             |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/kanbox` |
| `JWT_SECRET`  | JWT signing secret        | `your-secret-key`                  |
| `CORS_ORIGIN` | Frontend URL for CORS     | `http://localhost:5173`            |

### Optional Variables

| Variable       | Description              | Default       |
| -------------- | ------------------------ | ------------- |
| `NODE_ENV`     | Environment mode         | `development` |
| `JWT_EXPIRE`   | JWT expiration time      | `7d`          |
| `CLOUDINARY_*` | Cloudinary configuration | -             |

## 🐳 Docker Commands

```bash
# Start all services
docker compose -f backend/docker-compose.yml up -d

# View logs
docker compose -f backend/docker-compose.yml logs -f

# Stop all services
docker compose -f backend/docker-compose.yml down

# Rebuild and restart
docker compose -f backend/docker-compose.yml up --build

# Access MongoDB shell
docker exec -it kanbox-mongodb-1 mongosh
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
