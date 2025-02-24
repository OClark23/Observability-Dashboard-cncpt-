import React from 'react';
import { SystemMetric } from '../types';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface MetricCardProps {
  title: string;
  metric: SystemMetric;
  unit?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, metric, unit }) => {
  const getStatusIcon = () => {
    switch (metric.status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (metric.status) {
      case 'healthy':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'critical':
        return 'bg-red-50 border-red-200';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getStatusColor()} transition-colors duration-300`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {getStatusIcon()}
      </div>
      <div className="flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">
          {metric.value}
          {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
        </p>
      </div>
    </div>
  );
};