# #!/bin/bash

# echo "🚀 Starting Document Summary Analyzer..."

# # Kill any existing processes
# echo "🔄 Stopping existing processes..."
# pkill -f nodemon 2>/dev/null || true
# pkill -f "react-scripts" 2>/dev/null || true

# # Wait a moment
# sleep 2

# # Start backend
# echo "🔧 Starting backend server..."
# cd backend
# npm run dev &
# BACKEND_PID=$!

# # Wait for backend to start
# sleep 5

# # Start frontend
# echo "⚛️  Starting frontend server..."
# cd ../frontend
# npm start &
# FRONTEND_PID=$!

# # Wait for frontend to start
# sleep 10

# echo ""
# echo "✅ Both servers are running!"
# echo "🌐 Frontend: http://localhost:3000"
# echo "🔧 Backend: http://localhost:4000"
# echo ""
# echo "Press Ctrl+C to stop both servers"

# # Wait for user to stop
# wait
#!/bin/bash

echo "🚀 Setting up Document Summary Analyzer for your friend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..

# Create .env files
echo "📝 Creating environment files..."

# Backend .env
cat > backend/.env << EOF
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
EOF

# Frontend .env
cat > frontend/.env << EOF
REACT_APP_API_URL=http://localhost:4000/api/v1
EOF

echo ""
echo "🎉 Setup complete!"
echo ""
echo "⚠️  IMPORTANT: Update the .env files with your actual credentials:"
echo "   - backend/.env: Add your MongoDB, Cloudinary, and Hugging Face API keys"
echo "   - frontend/.env: Already configured for localhost"
echo ""
echo "To start the application:"
echo "  npm run dev"
echo ""
echo "Make sure MongoDB is running on your system!"