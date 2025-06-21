import React, { useState, useEffect } from 'react';
import { Eye, Shield, AlertTriangle, Activity, Globe, Lock, Unlock, TrendingUp } from 'lucide-react';

interface SecurityEvent {
  id: string;
  timestamp: string;
  type: 'intrusion' | 'malware' | 'anomaly' | 'policy_violation' | 'authentication';
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: string;
  destination: string;
  description: string;
  status: 'active' | 'investigating' | 'resolved' | 'false_positive';
}

interface MonitoringMetric {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

export default function SecurityMonitoring() {
  const [events, setEvents] = useState<SecurityEvent[]>([
    {
      id: '1',
      timestamp: '2024-01-15 14:32:15',
      type: 'intrusion',
      severity: 'critical',
      source: '203.0.113.45',
      destination: '192.168.1.100',
      description: 'Multiple failed SSH login attempts detected',
      status: 'active'
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:28:42',
      type: 'malware',
      severity: 'high',
      source: '192.168.1.150',
      destination: 'external',
      description: 'Suspicious outbound connection to known C&C server',
      status: 'investigating'
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:25:18',
      type: 'anomaly',
      severity: 'medium',
      source: '192.168.1.75',
      destination: '192.168.1.200',
      description: 'Unusual data transfer volume detected',
      status: 'resolved'
    },
    {
      id: '4',
      timestamp: '2024-01-15 14:20:33',
      type: 'policy_violation',
      severity: 'low',
      source: '192.168.1.120',
      destination: 'social-media.com',
      description: 'Access to blocked website category',
      status: 'resolved'
    }
  ]);

  const [metrics, setMetrics] = useState<MonitoringMetric[]>([
    { label: 'Threats Blocked', value: 1247, unit: 'today', trend: 'up', color: 'text-green-400' },
    { label: 'Active Connections', value: 342, unit: 'current', trend: 'stable', color: 'text-cyan-400' },
    { label: 'Bandwidth Usage', value: 78, unit: '%', trend: 'up', color: 'text-yellow-400' },
    { label: 'Failed Logins', value: 23, unit: 'last hour', trend: 'down', color: 'text-red-400' }
  ]);

  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, metric.value + (Math.random() - 0.5) * 10)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredEvents = events.filter(event => {
    const typeMatch = filterType === 'all' || event.type === filterType;
    const severityMatch = filterSeverity === 'all' || event.severity === filterSeverity;
    return typeMatch && severityMatch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-400 bg-red-500/20';
      case 'investigating': return 'text-yellow-400 bg-yellow-500/20';
      case 'resolved': return 'text-green-400 bg-green-500/20';
      case 'false_positive': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'intrusion': return <Shield className="w-4 h-4" />;
      case 'malware': return <AlertTriangle className="w-4 h-4" />;
      case 'anomaly': return <Activity className="w-4 h-4" />;
      case 'policy_violation': return <Lock className="w-4 h-4" />;
      case 'authentication': return <Unlock className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Security Monitoring</h2>
          <p className="text-gray-400">Real-time security event monitoring and analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400">Live Monitoring</span>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-700/50 rounded-lg">
                {index === 0 && <Shield className="w-5 h-5 text-green-400" />}
                {index === 1 && <Globe className="w-5 h-5 text-cyan-400" />}
                {index === 2 && <Activity className="w-5 h-5 text-yellow-400" />}
                {index === 3 && <AlertTriangle className="w-5 h-5 text-red-400" />}
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                metric.trend === 'up' ? 'text-green-400' : 
                metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'
              }`}>
                <TrendingUp className="w-4 h-4" />
                <span>{metric.trend}</span>
              </div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                {Math.floor(metric.value).toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">{metric.label}</div>
              <div className="text-gray-500 text-xs">{metric.unit}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Event Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="intrusion">Intrusion</option>
              <option value="malware">Malware</option>
              <option value="anomaly">Anomaly</option>
              <option value="policy_violation">Policy Violation</option>
              <option value="authentication">Authentication</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Severity</label>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex items-end">
            <div className="text-sm text-gray-400">
              Showing {filteredEvents.length} of {events.length} events
            </div>
          </div>
        </div>
      </div>

      {/* Security Events */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Recent Security Events</h3>
        <div className="space-y-3">
          {filteredEvents.map((event) => (
            <div 
              key={event.id} 
              className={`border rounded-lg p-4 cursor-pointer hover:scale-[1.02] transition-all duration-200 ${getSeverityColor(event.severity)}`}
              onClick={() => setSelectedEvent(event)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="p-2 bg-gray-700/50 rounded-lg">
                    {getTypeIcon(event.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        event.severity === 'critical' ? 'bg-red-500 text-white' :
                        event.severity === 'high' ? 'bg-orange-500 text-white' :
                        event.severity === 'medium' ? 'bg-yellow-500 text-black' :
                        'bg-blue-500 text-white'
                      }`}>
                        {event.severity.toUpperCase()}
                      </span>
                      <span className="text-gray-400 text-sm capitalize">{event.type.replace('_', ' ')}</span>
                      <span className="text-gray-500 text-sm">{event.timestamp}</span>
                    </div>
                    <p className="text-white mb-2">{event.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>Source: {event.source}</span>
                      <span>→</span>
                      <span>Destination: {event.destination}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setSelectedEvent(null)}>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Event Details</h3>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Event ID</label>
                  <div className="text-white font-mono">{selectedEvent.id}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Timestamp</label>
                  <div className="text-white">{selectedEvent.timestamp}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
                  <div className="text-white capitalize">{selectedEvent.type.replace('_', ' ')}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Severity</label>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    selectedEvent.severity === 'critical' ? 'bg-red-500 text-white' :
                    selectedEvent.severity === 'high' ? 'bg-orange-500 text-white' :
                    selectedEvent.severity === 'medium' ? 'bg-yellow-500 text-black' :
                    'bg-blue-500 text-white'
                  }`}>
                    {selectedEvent.severity.toUpperCase()}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Source</label>
                  <div className="text-white font-mono">{selectedEvent.source}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Destination</label>
                  <div className="text-white font-mono">{selectedEvent.destination}</div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <div className="text-white bg-gray-700/50 rounded p-3">{selectedEvent.description}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedEvent.status)}`}>
                  {selectedEvent.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}