# Document Summary Analyzer

**[Live Link](https://document-summary-analyzer-gamma.vercel.app/)**

A full-stack web application that allows users to upload documents and generate AI-powered summaries. Built with React frontend and Node.js backend.

## 🚀 Features

- **User Authentication**: Register, login, and logout functionality
- **File Upload**: Support for PDFs, images, and various document formats
- **AI Summarization**: Generate summaries of different lengths using Hugging Face API
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **File Management**: Upload, store, and manage your documents

## 📁 Project Structure

```
Document_summary/
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── controller/     # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   ├── app.js          # Express app configuration
│   │   └── index.js        # Server entry point
│   ├── public/             # Static files
│   ├── package.json        # Backend dependencies
│   └── .env                # Backend environment variables
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── services/       # API services
│   │   └── App.js          # Main App component
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   └── .env                # Frontend environment variables
├── package.json            # Root package.json for scripts
└── README.md               # This file
```

## 🛠️ Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- Cloudinary account (for file storage)
- Hugging Face API key (for AI summarization)

### Installation

1. **Clone and install all dependencies:**
   ```bash
   npm run install-all
   ```

2. **Set up environment variables:**

   **Backend (.env in backend/ folder):**
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
   
   # Hugging Face API
   HF_API_KEY=your_hugging_face_api_key
   
   # Server
   PORT=4000
   ```

   **Frontend (.env in frontend/ folder):**
   ```env
   REACT_APP_API_URL=http://localhost:4000/api/v1
   ```

3. **Start both servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend on `http://localhost:4000`
   - Frontend on `http://localhost:3000`

## 🎯 Available Scripts

### Root Level Commands

- `npm run dev` - Start both backend and frontend in development mode
- `npm run backend` - Start only the backend server
- `npm run frontend` - Start only the frontend server
- `npm run install-all` - Install dependencies for all projects
- `npm run build` - Build the frontend for production
- `npm start` - Start the backend in production mode

### Backend Commands (in backend/ folder)

- `npm run dev` - Start backend with nodemon (auto-restart)
- `npm start` - Start backend in production mode

### Frontend Commands (in frontend/ folder)

- `npm start` - Start React development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🔧 Development

### Backend Development

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Start with auto-restart:
   ```bash
   npm run dev
   ```

### Frontend Development

1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```

2. Start development server:
   ```bash
   npm start
   ```

## 🌐 API Endpoints

### Authentication
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/loginuser` - Login user
- `POST /api/v1/user/logoutuser` - Logout user

### File Management
- `POST /api/v1/file/upload` - Upload file
- `GET /api/v1/file/files` - Get user files
- `GET /api/v1/file/summary/:fileId` - Get file summary

## 📦 Supported File Types

- PDF documents
- Images (JPG, PNG, GIF, BMP, TIFF)
- Word documents (DOC, DOCX)
- Text files (TXT)

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Use PM2 or similar process manager
3. Configure reverse proxy (Nginx)
4. Set up SSL certificates

### Frontend Deployment
1. Build production bundle: `npm run build`
2. Deploy to static hosting (Netlify, Vercel, etc.)
3. Update API URL in environment variables

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS is configured for frontend origin
2. **File Upload Issues**: Verify Cloudinary credentials and file size limits
3. **Authentication Issues**: Check JWT token configuration and cookie settings
4. **Database Connection**: Verify MongoDB is running and connection string is correct

### Development Tips

- Use `npm run dev` to start both servers simultaneously
- Check console logs for detailed error messages
- Use browser DevTools to debug frontend issues
- Use Postman to test API endpoints

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues:

1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure all services (MongoDB, Cloudinary) are accessible
4. Check the troubleshooting section above
