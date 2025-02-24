import { SalesforceMetrics, SplunkMetrics, DynatraceMetrics, JenkinsMetrics, JenkinsError, POSError } from './types';

const generateMetric = (baseValue: number, variance: number) => {
  const value = baseValue + (Math.random() * variance * 2 - variance);
  return {
    timestamp: Date.now(),
    value: Number(value.toFixed(2)),
    status: value > baseValue + variance/2 ? 'critical' 
           : value > baseValue ? 'warning' 
           : 'healthy'
  };
};

const stores = [
  { id: 'store-001', name: 'Downtown Mall', region: 'NA', subRegion: 'Northeast' },
  { id: 'store-002', name: 'Westfield Plaza', region: 'NA', subRegion: 'West Coast' },
  { id: 'store-003', name: 'Riverside Galleria', region: 'NA', subRegion: 'Southeast' },
  { id: 'store-004', name: 'Central Market', region: 'NA', subRegion: 'Midwest' },
  { id: 'store-005', name: 'Oxford Street', region: 'EMEA', subRegion: 'UK' },
  { id: 'store-006', name: 'Le Marais', region: 'EMEA', subRegion: 'France' },
  { id: 'store-007', name: 'Shibuya Center', region: 'APAC', subRegion: 'Japan' },
  { id: 'store-008', name: 'Marina Bay', region: 'APAC', subRegion: 'Singapore' },
  { id: 'store-009', name: 'Sydney Central', region: 'APAC', subRegion: 'Australia' }
];

const developers = [
  'Sarah Chen',
  'James Rodriguez',
  'Alex Kim',
  'Maria Garcia',
  'David Smith'
];

const pipelines = [
  'frontend-build',
  'backend-deploy',
  'integration-tests',
  'database-migration',
  'security-scan'
];

const errorMessages = [
  'Failed to resolve dependencies',
  'Test suite execution failed',
  'Memory limit exceeded',
  'Database connection timeout',
  'Security vulnerability detected'
];

const generateJenkinsError = (): JenkinsError => ({
  id: Math.random().toString(36).substr(2, 9),
  timestamp: Date.now() - Math.floor(Math.random() * 3600000),
  developer: developers[Math.floor(Math.random() * developers.length)],
  pipeline: pipelines[Math.floor(Math.random() * pipelines.length)],
  errorMessage: errorMessages[Math.floor(Math.random() * errorMessages.length)],
  status: ['new', 'investigating', 'resolved'][Math.floor(Math.random() * 3)]
});

const generatePOSErrors = (): POSError[] => {
  return stores.map(store => ({
    storeId: store.id,
    storeName: store.name,
    region: store.region,
    subRegion: store.subRegion,
    errorRate: generateMetric(1.5, 1.5)
  }));
};

export const getSalesforceMetrics = (): SalesforceMetrics => ({
  activeUsers: generateMetric(1200, 300),
  responseTime: generateMetric(250, 100),
  errorRate: generateMetric(0.5, 0.3),
  transactions: generateMetric(450, 50)
});

export const getSplunkMetrics = (): SplunkMetrics => ({
  logsPerMinute: generateMetric(1000, 200),
  errorLogs: generateMetric(5, 3),
  warningLogs: generateMetric(15, 5),
  systemLoad: generateMetric(65, 15)
});

export const getDynatraceMetrics = (): DynatraceMetrics => ({
  apdexScore: generateMetric(0.95, 0.1),
  userSatisfaction: generateMetric(95, 5),
  hostHealth: generateMetric(98, 3),
  memoryUsage: generateMetric(70, 10),
  posErrors: generatePOSErrors()
});

export const getJenkinsMetrics = (): JenkinsMetrics => ({
  buildSuccess: generateMetric(85, 15),
  buildFailures: generateMetric(3, 2),
  avgBuildTime: generateMetric(15, 5),
  activeBuilds: generateMetric(8, 4),
  recentErrors: Array.from({ length: 5 }, () => generateJenkinsError())
});