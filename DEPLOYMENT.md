# Deployment Guide

## Environment Configuration

### Backend Environment Variables

Create a `server/.env` file with the following variables:

```env
# MongoDB Configuration
MONGO_URI=your_production_mongodb_connection_string
JWT_SECRET=your_super_secure_jwt_secret_here
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com
```

### Frontend Environment Variables

Create a `client/.env.production` file with:

```env
# Production API Configuration
VITE_API_URL=https://your-backend-domain.com/api
```

## Production Deployment Steps

### 1. Database Setup (MongoDB Atlas)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your server's IP address
5. Get the connection string and update `MONGO_URI`

### 2. Backend Deployment

**Option A: Heroku**
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create new app
heroku create your-app-name-backend

# Set environment variables
heroku config:set MONGO_URI="your_mongodb_atlas_connection_string"
heroku config:set JWT_SECRET="your_secure_jwt_secret"
heroku config:set NODE_ENV="production"
heroku config:set CLIENT_URL="https://your-frontend-domain.com"

# Deploy
git subtree push --prefix server heroku main
```

**Option B: Railway**
1. Connect your GitHub repository
2. Select the `server` folder as root
3. Add environment variables in Railway dashboard
4. Deploy

### 3. Frontend Deployment

**Option A: Netlify**
1. Build the project: `cd client && npm run build`
2. Drag and drop the `dist` folder to Netlify
3. Or connect your GitHub repository

**Option B: Vercel**
1. Connect your GitHub repository
2. Set root directory to `client`
3. Add environment variables
4. Deploy

### 4. Security Checklist

- [ ] Use strong JWT secret (at least 32 characters)
- [ ] Update CORS origin to your frontend domain
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Validate all inputs
- [ ] Add proper error handling

### 5. Testing

1. Test all API endpoints
2. Test user registration and login
3. Test job posting and applications
4. Test all user roles (jobseeker, recruiter, admin)

## Environment Variables Reference

### Required for Production

**Backend:**
- `MONGO_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secure random string for JWT signing
- `NODE_ENV`: Set to "production"
- `CLIENT_URL`: Your frontend domain URL
- `PORT`: Port number (usually set by hosting provider)

**Frontend:**
- `VITE_API_URL`: Your backend API URL

### Optional

- Database connection pool settings
- Email service configuration (for notifications)
- File upload service (AWS S3, Cloudinary)
- Logging service configuration