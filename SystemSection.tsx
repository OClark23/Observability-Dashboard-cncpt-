import React from 'react';
import { MetricCard } from './MetricCard';

interface SystemSectionProps {
  title: string;
  metrics: Record<string, any>;
  metricConfigs: {
    key: string;
    title: string;
    unit?: string;
  }[];
}

export const SystemSection: React.FC<SystemSectionProps> = ({ title, metrics, metricConfigs }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricConfigs.map(({ key, title, unit }) => (
          <MetricCard
            key={key}
            title={title}
            metric={metrics[key]}
            unit={unit}
          />
        ))}
      </div>
    </div>
  );
};