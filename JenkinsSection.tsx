import React from 'react';
import { MetricCard } from './MetricCard';
import { ErrorLog } from './ErrorLog';
import { JenkinsMetrics } from '../types';

interface JenkinsSectionProps {
  metrics: JenkinsMetrics;
}

export const JenkinsSection: React.FC<JenkinsSectionProps> = ({ metrics }) => {
  const metricConfigs = [
    { key: 'buildSuccess', title: 'Build Success Rate', unit: '%' },
    { key: 'buildFailures', title: 'Recent Failures', unit: 'builds' },
    { key: 'avgBuildTime', title: 'Avg Build Time', unit: 'min' },
    { key: 'activeBuilds', title: 'Active Builds', unit: 'builds' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Jenkins Pipeline Status</h2>
      
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
        <h3 className="text-lg font-medium mb-3 text-gray-800">Recent Build Errors</h3>
        <div className="space-y-3">
          {metrics.recentErrors.map((error) => (
            <ErrorLog key={error.id} error={error} />
          ))}
        </div>
      </div>
    </div>
  );
};