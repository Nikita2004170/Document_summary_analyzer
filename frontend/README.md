# Document Summary Analyzer - Frontend

A modern React frontend for the Document Summary Analyzer application.

## Features

- 🔐 User Authentication (Login/Register)
- 📁 File Upload with Drag & Drop
- 🤖 AI-Powered Document Summarization
- 📱 Responsive Design
- 🎨 Modern UI with Tailwind CSS
- 📋 Copy/Download Summary
- 🔄 Real-time Status Updates

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the frontend directory:
   ```
   REACT_APP_API_URL=http://localhost:4000/api/v1
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Backend Requirements

Make sure your backend server is running on `http://localhost:4000` with the following endpoints:

- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/loginuser` - User login
- `POST /api/v1/user/logoutuser` - User logout
- `POST /api/v1/file/upload` - File upload
- `GET /api/v1/file/files` - Get user files
- `GET /api/v1/file/summary/:fileId` - Get file summary

## Supported File Types

- PDF documents
- Images (JPG, PNG, GIF, BMP, TIFF)
- Word documents (DOC, DOCX)
- Text files (TXT)

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.js
│   │   └── Register.js
│   ├── Dashboard.js
│   ├── FileUpload.js
│   └── SummaryDisplay.js
├── contexts/
│   └── AuthContext.js
├── services/
│   └── api.js
├── App.js
├── App.css
├── index.js
└── index.css
```

## Technologies Used

- React 18
- React Router DOM
- Axios for API calls
- React Dropzone for file uploads
- React Hot Toast for notifications
- Lucide React for icons
- Tailwind CSS for styling
