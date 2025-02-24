import React, { useState } from 'react';
import { MetricCard } from './MetricCard';
import { POSErrorCard } from './POSErrorCard';
import { DynatraceMetrics } from '../types';
import { Globe } from 'lucide-react';

interface DynatraceSectionProps {
  metrics: DynatraceMetrics;
}

export const DynatraceSection: React.FC<DynatraceSectionProps> = ({ metrics }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const metricConfigs = [
    { key: 'apdexScore', title: 'Apdex Score' },
    { key: 'userSatisfaction', title: 'User Satisfaction', unit: '%' },
    { key: 'hostHealth', title: 'Host Health', unit: '%' },
    { key: 'memoryUsage', title: 'Memory Usage', unit: '%' }
  ];

  const filteredErrors = selectedRegion === 'all'
    ? metrics.posErrors
    : metrics.posErrors.filter(error => error.region === selectedRegion);

  const getErrorCountByStatus = (status: 'critical' | 'warning' | 'healthy') => {
    return filteredErrors.filter(error => error.errorRate.status === status).length;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Dynatrace Monitoring</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metricConfigs.map(({ key, title, unit }) => (
          <MetricCard
            key={key}
            title={title}
            metric={metrics[key]}
            unit={unit}
          />
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h3 className="text-lg font-medium text-gray-800">POS System Status by Store</h3>
            <div className="ml-4 flex items-center space-x-2 text-sm">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-red-100 text-red-800">
                Critical: {getErrorCountByStatus('critical')}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                Warning: {getErrorCountByStatus('warning')}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                Healthy: {getErrorCountByStatus('healthy')}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <Globe className="w-5 h-5 text-gray-500 mr-2" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="all">All Regions</option>
              <option value="NA">North America</option>
              <option value="EMEA">EMEA</option>
              <option value="APAC">APAC</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredErrors.map((error) => (
            <POSErrorCard key={error.storeId} error={error} />
          ))}
        </div>
      </div>
    </div>
  );
};