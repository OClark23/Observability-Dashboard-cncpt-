import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { searchMetrics } from '../utils/nlpSearch';
import { DynatraceMetrics, JenkinsMetrics, SalesforceMetrics, SplunkMetrics } from '../types';

interface SearchSectionProps {
  metrics: {
    salesforce: SalesforceMetrics;
    splunk: SplunkMetrics;
    dynatrace: DynatraceMetrics;
    jenkins: JenkinsMetrics;
  };
}

export const SearchSection: React.FC<SearchSectionProps> = ({ metrics }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);

  const handleSearch = () => {
    if (!query.trim()) return;
    const results = searchMetrics(query, metrics);
    setSearchResults(results);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search metrics (e.g., 'show critical errors in APAC' or 'check system health')"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>

      {searchResults && (
        <div className="space-y-4">
          <div className="text-sm text-gray-600 border-b pb-2">
            {searchResults.summary}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.results.map((result: any, index: number) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    {result.source}
                  </span>
                  {getStatusIcon(result.status)}
                </div>
                <div className="text-lg font-medium text-gray-900 mb-1">
                  {result.metric}
                </div>
                <div className="text-sm text-gray-600">
                  Value: {typeof result.value === 'number' ? result.value.toFixed(2) : result.value}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(result.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};