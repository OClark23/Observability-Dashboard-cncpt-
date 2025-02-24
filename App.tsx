import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { SystemSection } from './components/SystemSection';
import { JenkinsSection } from './components/JenkinsSection';
import { DynatraceSection } from './components/DynatraceSection';
import { SearchSection } from './components/SearchSection';
import { getSalesforceMetrics, getSplunkMetrics, getDynatraceMetrics, getJenkinsMetrics } from './mockData';

function App() {
  const [metrics, setMetrics] = useState({
    salesforce: getSalesforceMetrics(),
    splunk: getSplunkMetrics(),
    dynatrace: getDynatraceMetrics(),
    jenkins: getJenkinsMetrics()
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        salesforce: getSalesforceMetrics(),
        splunk: getSplunkMetrics(),
        dynatrace: getDynatraceMetrics(),
        jenkins: getJenkinsMetrics()
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const salesforceConfig = [
    { key: 'activeUsers', title: 'Active Users', unit: 'users' },
    { key: 'responseTime', title: 'Response Time', unit: 'ms' },
    { key: 'errorRate', title: 'Error Rate', unit: '%' },
    { key: 'transactions', title: 'Transactions', unit: '/min' }
  ];

  const splunkConfig = [
    { key: 'logsPerMinute', title: 'Logs per Minute', unit: 'logs' },
    { key: 'errorLogs', title: 'Error Logs', unit: '/min' },
    { key: 'warningLogs', title: 'Warning Logs', unit: '/min' },
    { key: 'systemLoad', title: 'System Load', unit: '%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">System Health Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <SearchSection metrics={metrics} />
        <JenkinsSection metrics={metrics.jenkins} />
        <SystemSection
          title="Salesforce Metrics"
          metrics={metrics.salesforce}
          metricConfigs={salesforceConfig}
        />
        <SystemSection
          title="Splunk Analytics"
          metrics={metrics.splunk}
          metricConfigs={splunkConfig}
        />
        <DynatraceSection metrics={metrics.dynatrace} />
      </main>
    </div>
  );
}

export default App;