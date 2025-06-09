# Job Portal - Full Stack Web Application

A modern, responsive job portal application built with React and Node.js that connects job seekers with recruiters. Features user authentication, job posting, application management, and role-based access control.

## Features

- **Multi-Role Authentication**: Job seekers, recruiters, and administrators
- **Job Management**: Post, edit, delete, and browse job listings
- **Application System**: Apply for jobs and track application status
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Live application status updates
- **Secure Authentication**: JWT-based authentication with refresh tokens
- **Password Management**: Secure password reset and change functionality

## Project Structure

```
job-portal/
├── client/                     # Frontend React application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── api/               # API configuration and interceptors
│   │   ├── components/        # React components
│   │   │   ├── Admin/         # Admin dashboard components
│   │   │   ├── Auth/          # Authentication components
│   │   │   ├── JobSeeker/     # Job seeker specific components
│   │   │   ├── Layout/        # Layout components (Navbar, Footer)
│   │   │   ├── Profile/       # User profile components
│   │   │   └── Recruiter/     # Recruiter dashboard components
│   │   ├── context/           # React context providers
│   │   ├── styles/            # CSS stylesheets
│   │   └── main.jsx           # Application entry point
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
├── server/                     # Backend Node.js application
│   ├── config/                # Database configuration
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Custom middleware
│   ├── models/                # MongoDB models
│   ├── routes/                # API routes
│   ├── package.json           # Backend dependencies
│   └── index.js               # Server entry point
├── .env.example               # Environment variables template
├── DEPLOYMENT.md              # Deployment guide
├── USER_ACCESS_GUIDE.md       # User access documentation
└── README.md                  # This file
```

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **Autoprefixer** - CSS vendor prefixes
- **PostCSS** - CSS processing
- **Tailwind CSS** - Utility-first CSS framework

## Setup Instructions for Local Development

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd job-portal
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# Start the server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to client directory (from root)
cd client

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# Start the development server
npm run dev
```

### 4. Access the Application
- Frontend: http://127.0.0.1:5173
- Backend API: http://127.0.0.1:5001
- API Health Check: http://127.0.0.1:5001/health

## Environment Variables

### Backend (.env)
```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/jobportal
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://keshav:Apple%40123@jobportaldata.ahl1xgi.mongodb.net/


# Server Configuration
PORT=5001
NODE_ENV=development

# CORS Configuration
CLIENT_URL=http://127.0.0.1:5173
```

### Frontend (.env)
```env
# API Configuration
VITE_API_URL=http://127.0.0.1:5001/api
```

### Production Environment Variables

#### Backend (.env)
```env
MONGO_URI=your_production_mongodb_atlas_connection_string
JWT_SECRET=
JWT_REFRESH_SECRET=
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com
```

#### Frontend (.env.production)
```env
VITE_API_URL=https://jobportal-yk51.onrender.com/api
```

##  How to Run in Production

### 1. Build the Frontend
```bash
cd client
npm run build
```

### 2. Deploy Backend
```bash
cd server
# Set NODE_ENV=production
# Configure production environment variables
npm start
```

### 3. Deployment Details

####  Vercel (Frontend) + Render (Backend)
1. **Frontend**: Deploy `client` folder to Vercel
2. **Backend**: Deploy `server` folder to Render
3. **Database**: Use MongoDB Atlas


## API Documentation

### Authentication Endpoints
```
POST /api/auth/register          # Register new user
POST /api/auth/login             # User login
POST /api/auth/logout            # User logout
POST /api/auth/refresh           # Refresh access token
POST /api/auth/forgot-password   # Reset password
POST /api/auth/change-password   # Change password (authenticated)
GET  /api/auth/profile           # Get user profile (authenticated)
PUT  /api/auth/profile           # Update user profile (authenticated)
```

### Job Endpoints
```
GET    /api/jobs                 # Get all jobs (public)
GET    /api/jobs/:id             # Get job by ID (public)
POST   /api/jobs                 # Create job (recruiter only)
PUT    /api/jobs/:id             # Update job (recruiter only)
DELETE /api/jobs/:id             # Delete job (recruiter only)
GET    /api/jobs/my-jobs         # Get recruiter's jobs (authenticated)
```

### Application Endpoints
```
GET  /api/applications/my-applications     # Get user's applications
POST /api/applications                     # Submit job application
GET  /api/applications/job/:jobId          # Get applications for job (recruiter)
PUT  /api/applications/:applicationId     # Update application status (recruiter)
```

### Admin Endpoints
```
GET /api/admin                   # Admin dashboard data
```

### Request/Response Examples

#### Register User
```javascript
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "jobseeker" // or "recruiter"
}

Response:
{
  "token": "jwt_access_token",
  "refreshToken": "jwt_refresh_token",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "jobseeker"
  }
}
```

#### Create Job
```javascript
POST /api/jobs
Authorization: Bearer <token>
{
  "title": "Software Engineer",
  "company": "Tech Corp",
  "location": "Remote",
  "type": "Full-time",
  "description": "We are looking for a skilled software engineer...",
  "requirements": [
    "3+ years of React experience",
    "Node.js knowledge",
    "Strong problem-solving skills"
  ]
}
```

##  User Roles

### Job Seeker
- Browse and search jobs
- Apply for positions
- Track application status
- Manage profile

### Recruiter
- Post job openings
- Manage job listings
- Review applications
- Accept/reject candidates

### Administrator
- Manage all users
- Moderate job postings
- View system analytics
- Admin dashboard access

## Security Features

- JWT-based authentication with refresh tokens
- Password hashing with bcrypt
- CORS protection
- Input validation and sanitization
- Rate limiting (recommended for production)
- Secure HTTP headers (recommended for production)

## Testing

```bash
# Run frontend tests
cd client
npm test

# Run backend tests (if implemented)
cd server
npm test
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Author

**Keshav Sharma**
- GitHub: https://github.com/keshavSharma1017
- Email: keshavbusharma2001@gail.com


**Live Demo**: [https://job-portal-blue-sigma.vercel.app/](https://job-portal-blue-sigma.vercel.app/)

**Made with React, Node.js, and MongoDB**