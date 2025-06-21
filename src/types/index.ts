// Core application types
export interface User {
  id: string;
  username: string;
  role: 'admin' | 'analyst' | 'viewer';
  lastLogin: string;
}

// Security Event Types
export interface SecurityEvent {
  id: string;
  timestamp: string;
  type: 'intrusion' | 'malware' | 'anomaly' | 'policy_violation' | 'authentication';
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: string;
  destination: string;
  description: string;
  status: 'active' | 'investigating' | 'resolved' | 'false_positive';
  assignedTo?: string;
  tags?: string[];
}

// Network Scanning Types
export interface ScanResult {
  ip: string;
  hostname: string;
  status: 'online' | 'offline' | 'filtered';
  ports: PortInfo[];
  os: string;
  lastSeen: string;
  services?: ServiceInfo[];
}

export interface PortInfo {
  port: number;
  service: string;
  status: 'open' | 'closed' | 'filtered';
  version?: string;
  banner?: string;
}

export interface ServiceInfo {
  name: string;
  version: string;
  protocol: string;
  vulnerabilities?: string[];
}

// Vulnerability Assessment Types
export interface VulnerabilityResult {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  target: string;
  cve?: string;
  cvss?: number;
  solution: string;
  status: 'found' | 'patched' | 'false-positive';
  discoveredAt: string;
  category: string;
}

export interface TestModule {
  id: string;
  name: string;
  description: string;
  category: 'web' | 'network' | 'system' | 'wireless';
  enabled: boolean;
  status: 'idle' | 'running' | 'completed' | 'failed';
  lastRun?: string;
  findings?: number;
}

// Threat Intelligence Types
export interface ThreatData {
  id: string;
  type: 'malware' | 'phishing' | 'botnet' | 'ransomware' | 'apt';
  name: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  firstSeen: string;
  lastSeen: string;
  affectedCountries: string[];
  indicators: IOC[];
  description: string;
  mitigation: string;
  attribution?: string;
  tags?: string[];
}

export interface IOC {
  type: 'ip' | 'domain' | 'hash' | 'url' | 'email';
  value: string;
  confidence: number;
  source: string;
}

export interface GeographicThreat {
  country: string;
  countryCode: string;
  threatCount: number;
  primaryThreat: string;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  coordinates?: [number, number];
}

// Cryptographic Types
export interface HashResult {
  algorithm: string;
  hash: string;
  inputLength: number;
  computedAt: string;
}

export interface EncryptionResult {
  algorithm: string;
  encryptedData: string;
  keyHash: string;
  iv?: string;
  timestamp: string;
}

// Dashboard Types
export interface SystemMetric {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  unit?: string;
}

export interface ThreatAlert {
  id: string;
  type: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  timestamp: string;
  source: string;
  acknowledged: boolean;
  assignedTo?: string;
}

// Configuration Types
export interface ScanConfiguration {
  targetRange: string;
  scanType: 'quick' | 'comprehensive' | 'stealth' | 'aggressive';
  ports?: string;
  timeout: number;
  threads: number;
  excludeHosts?: string[];
}

export interface MonitoringConfiguration {
  alertThreshold: 'low' | 'medium' | 'high' | 'critical';
  enableRealTime: boolean;
  retentionDays: number;
  notificationChannels: string[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Utility Types
export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low';
export type EventStatus = 'active' | 'investigating' | 'resolved' | 'false_positive';
export type ScanStatus = 'idle' | 'running' | 'completed' | 'failed';
export type ThreatType = 'malware' | 'phishing' | 'botnet' | 'ransomware' | 'apt';