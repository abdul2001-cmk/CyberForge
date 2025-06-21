/**
 * Security utility functions for CyberForge
 */

import { SeverityLevel, IOC } from '../types';

/**
 * Validates IP address format
 */
export function isValidIP(ip: string): boolean {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

/**
 * Validates domain name format
 */
export function isValidDomain(domain: string): boolean {
  const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
  return domainRegex.test(domain);
}

/**
 * Validates URL format
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitizes user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Generates secure random string
 */
export function generateSecureId(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Calculates password strength score
 */
export function calculatePasswordStrength(password: string): {
  score: number;
  feedback: string[];
} {
  let score = 0;
  const feedback: string[] = [];

  // Length check
  if (password.length >= 8) score += 20;
  else feedback.push('Use at least 8 characters');

  if (password.length >= 12) score += 10;
  else feedback.push('Consider using 12+ characters for better security');

  // Character variety checks
  if (/[a-z]/.test(password)) score += 15;
  else feedback.push('Include lowercase letters');

  if (/[A-Z]/.test(password)) score += 15;
  else feedback.push('Include uppercase letters');

  if (/[0-9]/.test(password)) score += 15;
  else feedback.push('Include numbers');

  if (/[^A-Za-z0-9]/.test(password)) score += 25;
  else feedback.push('Include special characters');

  // Common patterns check
  if (!/(.)\1{2,}/.test(password)) score += 10;
  else feedback.push('Avoid repeating characters');

  return { score: Math.min(score, 100), feedback };
}

/**
 * Validates IOC (Indicator of Compromise) format
 */
export function validateIOC(ioc: IOC): boolean {
  switch (ioc.type) {
    case 'ip':
      return isValidIP(ioc.value);
    case 'domain':
      return isValidDomain(ioc.value);
    case 'url':
      return isValidURL(ioc.value);
    case 'hash':
      return /^[a-fA-F0-9]{32,128}$/.test(ioc.value);
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ioc.value);
    default:
      return false;
  }
}

/**
 * Gets severity color class
 */
export function getSeverityColor(severity: SeverityLevel): string {
  switch (severity) {
    case 'critical':
      return 'text-red-400 bg-red-500/20 border-red-500/30';
    case 'high':
      return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
    case 'medium':
      return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    case 'low':
      return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
    default:
      return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
  }
}

/**
 * Formats timestamp for display
 */
export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString();
}

/**
 * Generates mock hash (for demonstration purposes)
 */
export function generateMockHash(input: string, algorithm: string): string {
  // This is a simple mock hash function for demonstration
  // In production, use proper cryptographic libraries
  let hash = 0;
  const fullInput = input + algorithm;
  
  for (let i = 0; i < fullInput.length; i++) {
    const char = fullInput.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  const hashStr = Math.abs(hash).toString(16);
  const targetLength = algorithm === 'MD5' ? 32 : 
                      algorithm === 'SHA-1' ? 40 : 
                      algorithm === 'SHA-256' ? 64 : 128;
  
  return hashStr.padEnd(targetLength, '0').substring(0, targetLength);
}

/**
 * Validates port number
 */
export function isValidPort(port: number): boolean {
  return port >= 1 && port <= 65535;
}

/**
 * Parses port range string
 */
export function parsePortRange(portRange: string): number[] {
  const ports: number[] = [];
  const ranges = portRange.split(',');
  
  for (const range of ranges) {
    if (range.includes('-')) {
      const [start, end] = range.split('-').map(p => parseInt(p.trim()));
      if (isValidPort(start) && isValidPort(end) && start <= end) {
        for (let port = start; port <= end; port++) {
          ports.push(port);
        }
      }
    } else {
      const port = parseInt(range.trim());
      if (isValidPort(port)) {
        ports.push(port);
      }
    }
  }
  
  return [...new Set(ports)].sort((a, b) => a - b);
}

/**
 * Checks if IP is in private range
 */
export function isPrivateIP(ip: string): boolean {
  const privateRanges = [
    /^10\./,
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
    /^192\.168\./,
    /^127\./,
    /^169\.254\./
  ];
  
  return privateRanges.some(range => range.test(ip));
}