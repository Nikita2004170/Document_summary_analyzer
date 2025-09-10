#!/bin/bash

echo "🚀 Setting up Document Summary Analyzer Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    echo "REACT_APP_API_URL=http://localhost:4000/api/v1" > .env
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  npm start"
echo ""
echo "Make sure your backend server is running on http://localhost:4000"
echo ""
echo "The frontend will be available at http://localhost:3000"
