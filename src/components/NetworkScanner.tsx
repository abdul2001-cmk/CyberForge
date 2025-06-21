import React, { useState, useEffect } from 'react';
import { Wifi, Search, Target, Globe, Server, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface ScanResult {
  ip: string;
  hostname: string;
  status: 'online' | 'offline' | 'filtered';
  ports: { port: number; service: string; status: 'open' | 'closed' | 'filtered' }[];
  os: string;
  lastSeen: string;
}

interface ScanProgress {
  current: number;
  total: number;
  status: 'idle' | 'scanning' | 'completed';
}

export default function NetworkScanner() {
  const [targetRange, setTargetRange] = useState('192.168.1.1-254');
  const [scanType, setScanType] = useState('quick');
  const [progress, setProgress] = useState<ScanProgress>({ current: 0, total: 0, status: 'idle' });
  const [results, setResults] = useState<ScanResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const mockResults: ScanResult[] = [
    {
      ip: '192.168.1.1',
      hostname: 'router.local',
      status: 'online',
      ports: [
        { port: 22, service: 'SSH', status: 'open' },
        { port: 80, service: 'HTTP', status: 'open' },
        { port: 443, service: 'HTTPS', status: 'open' },
      ],
      os: 'Linux 4.x',
      lastSeen: '2 min ago'
    },
    {
      ip: '192.168.1.100',
      hostname: 'workstation-01',
      status: 'online',
      ports: [
        { port: 135, service: 'RPC', status: 'open' },
        { port: 445, service: 'SMB', status: 'open' },
        { port: 3389, service: 'RDP', status: 'filtered' },
      ],
      os: 'Windows 10',
      lastSeen: '1 min ago'
    },
    {
      ip: '192.168.1.50',
      hostname: 'server-db',
      status: 'online',
      ports: [
        { port: 22, service: 'SSH', status: 'open' },
        { port: 3306, service: 'MySQL', status: 'open' },
        { port: 5432, service: 'PostgreSQL', status: 'open' },
      ],
      os: 'Ubuntu 20.04',
      lastSeen: '30 sec ago'
    }
  ];

  const startScan = () => {
    setIsScanning(true);
    setProgress({ current: 0, total: 254, status: 'scanning' });
    setResults([]);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev.current >= prev.total) {
          clearInterval(interval);
          setIsScanning(false);
          setResults(mockResults);
          return { ...prev, status: 'completed' };
        }
        return { ...prev, current: prev.current + Math.floor(Math.random() * 5) + 1 };
      });
    }, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'offline': return 'text-red-400';
      case 'filtered': return 'text-yellow-400';
      case 'open': return 'text-green-400';
      case 'closed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'offline': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'filtered': return <Clock className="w-4 h-4 text-yellow-400" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Network Scanner</h2>
          <p className="text-gray-400">Discover and analyze network hosts and services</p>
        </div>
        <div className="flex items-center space-x-2">
          <Wifi className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400">Network Discovery</span>
        </div>
      </div>

      {/* Scan Configuration */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Scan Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Target Range</label>
            <input
              type="text"
              value={targetRange}
              onChange={(e) => setTargetRange(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
              placeholder="192.168.1.1-254"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Scan Type</label>
            <select
              value={scanType}
              onChange={(e) => setScanType(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="quick">Quick Scan</option>
              <option value="comprehensive">Comprehensive</option>
              <option value="stealth">Stealth Scan</option>
              <option value="aggressive">Aggressive</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={startScan}
              disabled={isScanning}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>{isScanning ? 'Scanning...' : 'Start Scan'}</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {progress.status === 'scanning' && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Scanning Progress</span>
              <span className="text-sm text-cyan-400">{progress.current}/{progress.total} hosts</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Scan Results */}
      {results.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Scan Results</h3>
            <div className="flex items-center space-x-2 text-green-400">
              <Target className="w-4 h-4" />
              <span className="text-sm">{results.length} hosts discovered</span>
            </div>
          </div>

          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-4 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(result.status)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{result.ip}</span>
                        <span className="text-gray-400">({result.hostname})</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-400">{result.os}</span>
                        <span className="text-sm text-gray-500">{result.lastSeen}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    result.status === 'online' ? 'bg-green-500/20 text-green-400' :
                    result.status === 'offline' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {result.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Open Ports & Services</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {result.ports.map((port, portIndex) => (
                      <div key={portIndex} className="flex items-center justify-between bg-gray-800/50 rounded px-3 py-2">
                        <div className="flex items-center space-x-2">
                          <Server className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-white">{port.port}</span>
                          <span className="text-xs text-gray-400">{port.service}</span>
                        </div>
                        <span className={`text-xs ${getStatusColor(port.status)}`}>
                          {port.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}