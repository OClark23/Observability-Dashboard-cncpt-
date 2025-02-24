import React from 'react';
import { JenkinsError } from '../types';
import { AlertCircle, Clock, User, GitBranch } from 'lucide-react';

interface ErrorLogProps {
  error: JenkinsError;
}

export const ErrorLog: React.FC<ErrorLogProps> = ({ error }) => {
  const getStatusColor = () => {
    switch (error.status) {
      case 'new':
        return 'bg-red-50 border-red-200';
      case 'investigating':
        return 'bg-yellow-50 border-yellow-200';
      case 'resolved':
        return 'bg-green-50 border-green-200';
    }
  };

  const getStatusTextColor = () => {
    switch (error.status) {
      case 'new':
        return 'text-red-700';
      case 'investigating':
        return 'text-yellow-700';
      case 'resolved':
        return 'text-green-700';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getStatusColor()} mb-3 last:mb-0`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <span className="font-medium text-gray-900">{error.errorMessage}</span>
        </div>
        <span className={`text-sm font-medium capitalize ${getStatusTextColor()}`}>
          {error.status}
        </span>
      </div>
      <div className="mt-2 text-sm text-gray-600 space-y-1">
        <div className="flex items-center">
          <User className="w-4 h-4 mr-1" />
          <span>{error.developer}</span>
        </div>
        <div className="flex items-center">
          <GitBranch className="w-4 h-4 mr-1" />
          <span>{error.pipeline}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span>{new Date(error.timestamp).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};