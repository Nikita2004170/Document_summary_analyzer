import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, FileText, Upload as UploadIcon } from 'lucide-react';
import FileUpload from './FileUpload';
import SummaryDisplay from './SummaryDisplay';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [summary, setSummary] = useState('');

  const handleFileUploaded = (file) => {
    setUploadedFile(file);
    setSummary(''); // Clear previous summary
  };

  const handleSummaryGenerated = (generatedSummary) => {
    setSummary(generatedSummary);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Document Summary Analyzer
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>Welcome, {user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Analyze Your Documents
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload your documents and get AI-powered summaries instantly. 
              Support for PDFs, images, and various document formats.
            </p>
          </div>

          {/* File Upload Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UploadIcon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Upload Your Document
              </h3>
              <p className="text-gray-600">
                Drag and drop your file or click to browse
              </p>
            </div>
            
            <FileUpload onFileUploaded={handleFileUploaded} />
          </div>

          {/* Summary Section */}
          <SummaryDisplay 
            fileId={uploadedFile?._id} 
            onSummaryGenerated={handleSummaryGenerated}
          />

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Multiple Formats
              </h4>
              <p className="text-gray-600 text-sm">
                Support for PDFs, images, Word documents, and text files
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <UploadIcon className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Easy Upload
              </h4>
              <p className="text-gray-600 text-sm">
                Simple drag-and-drop interface for quick file uploads
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                AI-Powered
              </h4>
              <p className="text-gray-600 text-sm">
                Advanced AI technology for accurate document summarization
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
