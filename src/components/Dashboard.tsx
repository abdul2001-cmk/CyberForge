import React, { useState, useEffect } from 'react';
import { Activity, Shield, AlertTriangle, Users, Server, Globe, TrendingUp, Zap } from 'lucide-react';

interface SystemMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface ThreatAlert {
  id: string;
  type: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  timestamp: string;
  source: string;
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { label: 'Active Threats', value: '23', change: '+5', trend: 'up', color: 'text-red-400' },
    { label: 'Blocked Attacks', value: '1,247', change: '+89', trend: 'up', color: 'text-green-400' },
    { label: 'Network Scans', value: '156', change: '-12', trend: 'down', color: 'text-cyan-400' },
    { label: 'Vulnerabilities', value: '8', change: '-3', trend: 'down', color: 'text-orange-400' },
  ]);

  const [alerts, setAlerts] = useState<ThreatAlert[]>([
    { id: '1', type: 'critical', message: 'Suspicious login attempt from 192.168.1.100', timestamp: '2 min ago', source: 'Auth System' },
    { id: '2', type: 'high', message: 'Port scan detected on network perimeter', timestamp: '5 min ago', source: 'Network Monitor' },
    { id: '3', type: 'medium', message: 'Outdated SSL certificate on web server', timestamp: '15 min ago', source: 'SSL Scanner' },
    { id: '4', type: 'low', message: 'Routine security scan completed', timestamp: '1 hour ago', source: 'Vulnerability Scanner' },
  ]);

  const [systemLoad, setSystemLoad] = useState(67);
  const [networkTraffic, setNetworkTraffic] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLoad(prev => Math.max(20, Math.min(95, prev + (Math.random() - 0.5) * 10)));
      setNetworkTraffic(prev => Math.max(10, Math.min(90, prev + (Math.random() - 0.5) * 15)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'high': return 'border-orange-500 bg-orange-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Security Dashboard</h2>
          <p className="text-gray-400">Real-time monitoring and threat analysis</p>
        </div>
        <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-lg border border-green-500/30">
          <Shield className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-medium">System Secure</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-700/50 rounded-lg">
                {index === 0 && <AlertTriangle className="w-5 h-5 text-red-400" />}
                {index === 1 && <Shield className="w-5 h-5 text-green-400" />}
                {index === 2 && <Activity className="w-5 h-5 text-cyan-400" />}
                {index === 3 && <Server className="w-5 h-5 text-orange-400" />}
              </div>
              <div className={`flex items-center space-x-1 text-sm ${metric.trend === 'up' ? 'text-green-400' : metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                <TrendingUp className="w-4 h-4" />
                <span>{metric.change}</span>
              </div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
              <div className="text-gray-400 text-sm">{metric.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* System Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">System Load</h3>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-medium">{systemLoad}%</span>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-yellow-400 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${systemLoad}%` }}
            ></div>
          </div>
          <p className="text-gray-400 text-sm">CPU and memory utilization</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Network Traffic</h3>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 font-medium">{networkTraffic}%</span>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-blue-400 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${networkTraffic}%` }}
            ></div>
          </div>
          <p className="text-gray-400 text-sm">Bandwidth utilization</p>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Security Alerts</h3>
          <div className="flex items-center space-x-2 text-gray-400">
            <Activity className="w-4 h-4" />
            <span className="text-sm">Live Feed</span>
          </div>
        </div>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`border rounded-lg p-4 ${getAlertColor(alert.type)} hover:scale-[1.02] transition-transform duration-200`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      alert.type === 'critical' ? 'bg-red-500 text-white' :
                      alert.type === 'high' ? 'bg-orange-500 text-white' :
                      alert.type === 'medium' ? 'bg-yellow-500 text-black' :
                      'bg-blue-500 text-white'
                    }`}>
                      {alert.type.toUpperCase()}
                    </span>
                    <span className="text-gray-400 text-sm">{alert.source}</span>
                  </div>
                  <p className="text-white mb-1">{alert.message}</p>
                  <p className="text-gray-400 text-sm">{alert.timestamp}</p>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Users className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}