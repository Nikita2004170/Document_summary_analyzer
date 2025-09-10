import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import { fileAPI } from '../services/api';
import toast from 'react-hot-toast';

const FileUpload = ({ onFileUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/tiff',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid file type (PDF, images, or documents)');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    await uploadFile(file);
  }, []);

  const uploadFile = async (file) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fileAPI.uploadFile(formData);
      
      if (response.data.success) {
        setUploadedFile(response.data.file);
        toast.success('File uploaded successfully!');
        if (onFileUploaded) {
          onFileUploaded(response.data.file);
        }
      } else {
        toast.error(response.data.message || 'Upload failed');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Upload failed';
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.tiff'],
      'text/plain': ['.txt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false,
    disabled: uploading
  });

  const removeFile = () => {
    setUploadedFile(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
            ${isDragActive 
              ? 'border-indigo-500 bg-indigo-50' 
              : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
            }
            ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              {uploading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              ) : (
                <Upload className="w-8 h-8 text-indigo-600" />
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {uploading ? 'Uploading...' : 'Upload your document'}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {isDragActive
                  ? 'Drop the file here...'
                  : 'Drag & drop a file here, or click to select'
                }
              </p>
            </div>
            
            <div className="text-xs text-gray-500">
              <p>Supported formats: PDF, Images (JPG, PNG, GIF, BMP, TIFF), Documents (DOC, DOCX), Text files</p>
              <p>Maximum file size: 10MB</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {uploadedFile.fileType?.split('/')[1]?.toUpperCase() || 'FILE'}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Uploaded successfully
                  </p>
                </div>
                <button
                  onClick={removeFile}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-2 text-xs text-gray-500">
                <p>File ID: {uploadedFile._id}</p>
                <p>Uploaded: {new Date(uploadedFile.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
