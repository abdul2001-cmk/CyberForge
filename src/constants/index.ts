/**
 * Application constants for CyberForge
 */

// Application metadata
export const APP_NAME = 'CyberForge';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Comprehensive Cybersecurity Platform';

// API Configuration
export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
export const API_TIMEOUT = 30000; // 30 seconds

// Security Configuration
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;
export const SESSION_TIMEOUT = 3600000; // 1 hour in milliseconds
export const MAX_LOGIN_ATTEMPTS = 5;

// Scanning Configuration
export const DEFAULT_SCAN_TIMEOUT = 5000; // 5 seconds
export const MAX_CONCURRENT_SCANS = 100;
export const DEFAULT_PORT_RANGE = '1-1000';

// Common port numbers and their services
export const COMMON_PORTS = {
  21: 'FTP',
  22: 'SSH',
  23: 'Telnet',
  25: 'SMTP',
  53: 'DNS',
  80: 'HTTP',
  110: 'POP3',
  143: 'IMAP',
  443: 'HTTPS',
  993: 'IMAPS',
  995: 'POP3S',
  1433: 'MSSQL',
  3306: 'MySQL',
  3389: 'RDP',
  5432: 'PostgreSQL',
  5900: 'VNC',
  6379: 'Redis',
  8080: 'HTTP-Alt',
  8443: 'HTTPS-Alt',
  27017: 'MongoDB'
} as const;

// Severity levels
export const SEVERITY_LEVELS = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
} as const;

// Threat types
export const THREAT_TYPES = {
  MALWARE: 'malware',
  PHISHING: 'phishing',
  BOTNET: 'botnet',
  RANSOMWARE: 'ransomware',
  APT: 'apt'
} as const;

// Event types
export const EVENT_TYPES = {
  INTRUSION: 'intrusion',
  MALWARE: 'malware',
  ANOMALY: 'anomaly',
  POLICY_VIOLATION: 'policy_violation',
  AUTHENTICATION: 'authentication'
} as const;

// Scan types
export const SCAN_TYPES = {
  QUICK: 'quick',
  COMPREHENSIVE: 'comprehensive',
  STEALTH: 'stealth',
  AGGRESSIVE: 'aggressive'
} as const;

// Hash algorithms
export const HASH_ALGORITHMS = [
  'MD5',
  'SHA-1',
  'SHA-256',
  'SHA-512'
] as const;

// Encryption algorithms
export const ENCRYPTION_ALGORITHMS = [
  'AES-256-GCM',
  'AES-192-GCM',
  'AES-128-GCM',
  'ChaCha20-Poly1305'
] as const;

// Color schemes for different severity levels
export const SEVERITY_COLORS = {
  critical: {
    text: 'text-red-400',
    bg: 'bg-red-500/20',
    border: 'border-red-500/30',
    solid: 'bg-red-500'
  },
  high: {
    text: 'text-orange-400',
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/30',
    solid: 'bg-orange-500'
  },
  medium: {
    text: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/30',
    solid: 'bg-yellow-500'
  },
  low: {
    text: 'text-blue-400',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30',
    solid: 'bg-blue-500'
  }
} as const;

// Status colors
export const STATUS_COLORS = {
  active: {
    text: 'text-red-400',
    bg: 'bg-red-500/20'
  },
  investigating: {
    text: 'text-yellow-400',
    bg: 'bg-yellow-500/20'
  },
  resolved: {
    text: 'text-green-400',
    bg: 'bg-green-500/20'
  },
  false_positive: {
    text: 'text-gray-400',
    bg: 'bg-gray-500/20'
  }
} as const;

// Default pagination settings
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100]
} as const;

// Chart colors
export const CHART_COLORS = [
  '#06b6d4', // cyan-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#6366f1', // indigo-500
  '#84cc16'  // lime-500
] as const;

// Network ranges
export const PRIVATE_IP_RANGES = [
  '10.0.0.0/8',
  '172.16.0.0/12',
  '192.168.0.0/16',
  '127.0.0.0/8',
  '169.254.0.0/16'
] as const;

// File size limits
export const FILE_SIZE_LIMITS = {
  AVATAR: 5 * 1024 * 1024, // 5MB
  DOCUMENT: 50 * 1024 * 1024, // 50MB
  LOG: 100 * 1024 * 1024 // 100MB
} as const;

// Regular expressions
export const REGEX_PATTERNS = {
  IP_ADDRESS: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  DOMAIN: /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  HASH_MD5: /^[a-fA-F0-9]{32}$/,
  HASH_SHA1: /^[a-fA-F0-9]{40}$/,
  HASH_SHA256: /^[a-fA-F0-9]{64}$/,
  HASH_SHA512: /^[a-fA-F0-9]{128}$/
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'cyberforge_user_preferences',
  THEME: 'cyberforge_theme',
  SIDEBAR_STATE: 'cyberforge_sidebar_state',
  RECENT_SCANS: 'cyberforge_recent_scans'
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection error. Please check your internet connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied. Insufficient permissions.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Internal server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.'
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  SCAN_COMPLETED: 'Scan completed successfully.',
  DATA_SAVED: 'Data saved successfully.',
  SETTINGS_UPDATED: 'Settings updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  EXPORT_COMPLETED: 'Export completed successfully.'
} as const;