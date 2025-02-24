import { DynatraceMetrics, JenkinsMetrics, SalesforceMetrics, SplunkMetrics, SystemMetric } from '../types';

type MetricResult = {
  source: string;
  metric: string;
  value: number;
  status: string;
  timestamp: number;
};

type SearchResult = {
  results: MetricResult[];
  summary: string;
};

const keywords = {
  error: ['error', 'failure', 'failed', 'critical', 'issue'],
  performance: ['performance', 'speed', 'response', 'time', 'apdex'],
  health: ['health', 'status', 'condition', 'state'],
  region: ['region', 'location', 'area', 'zone'],
  time: ['recent', 'latest', 'today', 'now', 'current'],
};

const extractMetrics = (
  metrics: SystemMetric,
  source: string,
  metricName: string
): MetricResult => ({
  source,
  metric: metricName,
  value: metrics.value,
  status: metrics.status,
  timestamp: metrics.timestamp,
});

export const searchMetrics = (
  query: string,
  {
    salesforce,
    splunk,
    dynatrace,
    jenkins,
  }: {
    salesforce: SalesforceMetrics;
    splunk: SplunkMetrics;
    dynatrace: DynatraceMetrics;
    jenkins: JenkinsMetrics;
  }
): SearchResult => {
  const normalizedQuery = query.toLowerCase();
  const queryWords = normalizedQuery.split(' ');
  const results: MetricResult[] = [];

  // Helper function to check if query matches keywords
  const matchesCategory = (category: string[]) =>
    category.some(word => queryWords.some(q => q.includes(word)));

  // Check for errors and critical status
  if (matchesCategory(keywords.error)) {
    if (salesforce.errorRate.status === 'critical') {
      results.push(extractMetrics(salesforce.errorRate, 'Salesforce', 'Error Rate'));
    }
    results.push(...dynatrace.posErrors
      .filter(error => error.errorRate.status === 'critical')
      .map(error => ({
        source: 'POS System',
        metric: `${error.storeName} Error Rate`,
        value: error.errorRate.value,
        status: error.errorRate.status,
        timestamp: error.errorRate.timestamp,
      })));
    results.push(...jenkins.recentErrors
      .filter(error => error.status === 'new')
      .map(error => ({
        source: 'Jenkins',
        metric: error.pipeline,
        value: 1,
        status: 'critical',
        timestamp: error.timestamp,
      })));
  }

  // Check for performance metrics
  if (matchesCategory(keywords.performance)) {
    results.push(extractMetrics(salesforce.responseTime, 'Salesforce', 'Response Time'));
    results.push(extractMetrics(dynatrace.apdexScore, 'Dynatrace', 'Apdex Score'));
  }

  // Check for health status
  if (matchesCategory(keywords.health)) {
    results.push(extractMetrics(dynatrace.hostHealth, 'Dynatrace', 'Host Health'));
    results.push(extractMetrics(jenkins.buildSuccess, 'Jenkins', 'Build Success Rate'));
  }

  // Filter by region if specified
  if (matchesCategory(keywords.region)) {
    const regionMatches = dynatrace.posErrors.filter(error =>
      normalizedQuery.includes(error.region.toLowerCase()) ||
      normalizedQuery.includes(error.subRegion.toLowerCase())
    );
    results.push(...regionMatches.map(error => ({
      source: 'POS System',
      metric: `${error.storeName} (${error.region})`,
      value: error.errorRate.value,
      status: error.errorRate.status,
      timestamp: error.errorRate.timestamp,
    })));
  }

  // Generate a summary based on the results
  const summary = generateSummary(results, query);

  return {
    results: results.sort((a, b) => b.timestamp - a.timestamp),
    summary,
  };
};

const generateSummary = (results: MetricResult[], query: string): string => {
  if (results.length === 0) {
    return `No metrics found matching "${query}"`;
  }

  const criticalCount = results.filter(r => r.status === 'critical').length;
  const warningCount = results.filter(r => r.status === 'warning').length;
  const healthyCount = results.filter(r => r.status === 'healthy').length;

  return `Found ${results.length} matching metrics: ${criticalCount} critical, ${warningCount} warnings, ${healthyCount} healthy`;
};