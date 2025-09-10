import React, { useState } from 'react';
import { FileText, Copy, Check, Download, RefreshCw } from 'lucide-react';
import { fileAPI } from '../services/api';
import toast from 'react-hot-toast';

const SummaryDisplay = ({ fileId, onSummaryGenerated }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [summaryLength, setSummaryLength] = useState('medium');

  const generateSummary = async () => {
    if (!fileId) {
      toast.error('Please upload a file first');
      return;
    }

    try {
      setLoading(true);
      const response = await fileAPI.getFileSummary(fileId, summaryLength);
      
      if (response.data.success) {
        setSummary(response.data.summary);
        toast.success('Summary generated successfully!');
        if (onSummaryGenerated) {
          onSummaryGenerated(response.data.summary);
        }
      } else {
        toast.error(response.data.message || 'Failed to generate summary');
      }
    } catch (error) {
      console.error('Summary generation error:', error);
      let message = 'Failed to generate summary';
      
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      } else if (error.code === 'ERR_NETWORK') {
        message = 'Network error. Please check your connection.';
      }
      
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      toast.success('Summary copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const downloadSummary = () => {
    const element = document.createElement('a');
    const file = new Blob([summary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `summary-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Summary downloaded!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Document Summary</h3>
              <p className="text-sm text-gray-500">Generate AI-powered summary of your document</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label htmlFor="summaryLength" className="block text-sm font-medium text-gray-700 mb-2">
                Summary Length
              </label>
              <select
                id="summaryLength"
                value={summaryLength}
                onChange={(e) => setSummaryLength(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="short">Short (1-2 sentences)</option>
                <option value="medium">Medium (3-5 sentences)</option>
                <option value="long">Long (6-10 sentences)</option>
              </select>
            </div>
            
            <div className="flex-shrink-0">
              <button
                onClick={generateSummary}
                disabled={loading || !fileId}
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Summary
                  </>
                )}
              </button>
            </div>
          </div>

          {summary && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-700">Generated Summary</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={downloadSummary}
                    className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {summary}
                </p>
              </div>
            </div>
          )}

          {!fileId && (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Please upload a file first to generate summary</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryDisplay;
