# Document Summary Analyzer - Complete Setup Guide

This guide will help you set up both the backend and frontend for the Document Summary Analyzer application.

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB (running locally or MongoDB Atlas)
- Cloudinary account (for file storage)

## Backend Setup

### 1. Install Backend Dependencies

```bash
# Navigate to the project root
cd /Users/dhruvgupta/Document_summary

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the project root:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/document_summary

# JWT Tokens
ACCESS_TOKEN=your_access_token_secret_key_here
REFRESH_TOKEN=your_refresh_token_secret_key_here
ACEESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Cloudinary (for file storage)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server
PORT=8000
```

### 3. Start Backend Server

```bash
# Development mode
npm run dev

# Or production mode
node src/index.js
```

The backend will be available at `http://localhost:4000`

## Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Run Setup Script

```bash
# Make script executable and run
chmod +x setup.sh
./setup.sh
```

### 3. Manual Setup (Alternative)

If you prefer manual setup:

```bash
# Install dependencies
npm install

# Create environment file
echo "REACT_APP_API_URL=http://localhost:4000/api/v1" > .env

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/loginuser` - Login user
- `POST /api/v1/user/logoutuser` - Logout user

### File Management
- `POST /api/v1/file/upload` - Upload file
- `GET /api/v1/file/files` - Get user files
- `GET /api/v1/file/summary/:fileId` - Get file summary

## Features

### Backend Features
- User authentication with JWT
- File upload with Cloudinary integration
- Text extraction from various file types
- AI-powered document summarization
- MongoDB for data persistence

### Frontend Features
- Modern React UI with Tailwind CSS
- User authentication (Login/Register)
- Drag & drop file upload
- Real-time file processing status
- AI-powered summary generation
- Copy/Download summary functionality
- Responsive design

## Supported File Types

- PDF documents
- Images (JPG, PNG, GIF, BMP, TIFF)
- Word documents (DOC, DOCX)
- Text files (TXT)

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured to allow frontend origin
   - Check if backend is running on correct port

2. **File Upload Issues**
   - Verify Cloudinary credentials
   - Check file size limits (max 10MB)
   - Ensure file type is supported

3. **Authentication Issues**
   - Check JWT token configuration
   - Verify cookie settings
   - Ensure backend is running

4. **Database Connection**
   - Verify MongoDB is running
   - Check connection string in .env
   - Ensure database exists

### Development Tips

1. **Backend Development**
   - Use `npm run dev` for auto-restart
   - Check console logs for errors
   - Test API endpoints with Postman

2. **Frontend Development**
   - Use React DevTools for debugging
   - Check browser console for errors
   - Verify network requests in DevTools

## Production Deployment

### Backend Deployment
1. Set up production environment variables
2. Use PM2 or similar process manager
3. Configure reverse proxy (Nginx)
4. Set up SSL certificates

### Frontend Deployment
1. Build production bundle: `npm run build`
2. Deploy to static hosting (Netlify, Vercel, etc.)
3. Update API URL in environment variables
4. Configure CORS on backend

## Project Structure

```
Document_summary/
├── src/                    # Backend source code
│   ├── controller/         # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── app.js             # Express app configuration
│   └── index.js           # Server entry point
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   ├── services/      # API services
│   │   └── App.js         # Main App component
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── public/                # Backend static files
├── package.json           # Backend dependencies
└── README.md              # Project documentation
```

## Support

If you encounter any issues:

1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check if all services (MongoDB, Cloudinary) are accessible

## License

This project is licensed under the ISC License.
