export interface SystemMetric {
  timestamp: number;
  value: number;
  status: 'healthy' | 'warning' | 'critical';
}

export interface POSError {
  storeId: string;
  storeName: string;
  region: string;
  subRegion: string;
  errorRate: SystemMetric;
}

export interface SalesforceMetrics {
  activeUsers: SystemMetric;
  responseTime: SystemMetric;
  errorRate: SystemMetric;
  transactions: SystemMetric;
}

export interface SplunkMetrics {
  logsPerMinute: SystemMetric;
  errorLogs: SystemMetric;
  warningLogs: SystemMetric;
  systemLoad: SystemMetric;
}

export interface DynatraceMetrics {
  apdexScore: SystemMetric;
  userSatisfaction: SystemMetric;
  hostHealth: SystemMetric;
  memoryUsage: SystemMetric;
  posErrors: POSError[];
}

export interface JenkinsError {
  id: string;
  timestamp: number;
  developer: string;
  pipeline: string;
  errorMessage: string;
  status: 'new' | 'investigating' | 'resolved';
}

export interface JenkinsMetrics {
  buildSuccess: SystemMetric;
  buildFailures: SystemMetric;
  avgBuildTime: SystemMetric;
  activeBuilds: SystemMetric;
  recentErrors: JenkinsError[];
}