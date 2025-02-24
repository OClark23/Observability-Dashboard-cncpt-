import React from 'react';
import { POSError } from '../types';
import { Store, MapPin } from 'lucide-react';

interface POSErrorCardProps {
  error: POSError;
}

export const POSErrorCard: React.FC<POSErrorCardProps> = ({ error }) => {
  const getStatusColor = () => {
    const { status } = error.errorRate;
    switch (status) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'healthy':
        return 'bg-green-50 border-green-200';
    }
  };

  const getStatusTextColor = () => {
    const { status } = error.errorRate;
    switch (status) {
      case 'critical':
        return 'text-red-700';
      case 'warning':
        return 'text-yellow-700';
      case 'healthy':
        return 'text-green-700';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getStatusColor()}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          <Store className="w-5 h-5 text-gray-600 mr-2" />
          <span className="font-medium text-gray-900">{error.storeName}</span>
        </div>
        <span className={`text-sm font-medium ${getStatusTextColor()}`}>
          {error.errorRate.value.toFixed(2)}% Error Rate
        </span>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <MapPin className="w-4 h-4 mr-1" />
        <span>{error.region} - {error.subRegion}</span>
      </div>
    </div>
  );
};