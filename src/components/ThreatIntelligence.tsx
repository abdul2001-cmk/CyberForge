import React, { useState, useEffect } from 'react';
import { Globe, TrendingUp, AlertTriangle, MapPin, Users, Clock, Database, Search } from 'lucide-react';

interface ThreatData {
  id: string;
  type: 'malware' | 'phishing' | 'botnet' | 'ransomware' | 'apt';
  name: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  firstSeen: string;
  lastSeen: string;
  affectedCountries: string[];
  indicators: string[];
  description: string;
  mitigation: string;
}

interface GeographicThreat {
  country: string;
  threatCount: number;
  primaryThreat: string;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
}

interface ThreatTrend {
  date: string;
  malware: number;
  phishing: number;
  ransomware: number;
  apt: number;
}

export default function ThreatIntelligence() {
  const [threats, setThreats] = useState<ThreatData[]>([
    {
      id: '1',
      type: 'ransomware',
      name: 'BlackCat Ransomware',
      severity: 'critical',
      firstSeen: '2024-01-10',
      lastSeen: '2024-01-15',
      affectedCountries: ['US', 'UK', 'DE', 'FR', 'JP'],
      indicators: ['bc4f8a2e3d1c5b6a', '192.168.100.50', 'blackcat-payload.exe'],
      description: 'Advanced ransomware strain targeting enterprise networks with double extortion tactics.',
      mitigation: 'Implement network segmentation, maintain offline backups, and deploy endpoint detection.'
    },
    {
      id: '2',
      type: 'apt',
      name: 'APT-29 Campaign',
      severity: 'high',
      firstSeen: '2024-01-05',
      lastSeen: '2024-01-14',
      affectedCountries: ['US', 'CA', 'AU', 'NO'],
      indicators: ['cozy-bear.dll', '203.0.113.45', 'svchosts.exe'],
      description: 'State-sponsored group targeting government and defense contractors.',
      mitigation: 'Enhanced monitoring of privileged accounts and network traffic analysis.'
    },
    {
      id: '3',
      type: 'phishing',
      name: 'Office365 Credential Harvesting',
      severity: 'medium',
      firstSeen: '2024-01-12',
      lastSeen: '2024-01-15',
      affectedCountries: ['US', 'UK', 'CA', 'AU', 'NZ'],
      indicators: ['office365-login.phishing.com', 'credential-stealer.js'],
      description: 'Large-scale phishing campaign impersonating Microsoft Office365 login pages.',
      mitigation: 'User awareness training and implementation of multi-factor authentication.'
    }
  ]);

  const [geographicThreats] = useState<GeographicThreat[]>([
    { country: 'United States', threatCount: 1247, primaryThreat: 'Ransomware', riskLevel: 'critical' },
    { country: 'China', threatCount: 892, primaryThreat: 'APT', riskLevel: 'high' },
    { country: 'Russia', threatCount: 756, primaryThreat: 'Malware', riskLevel: 'high' },
    { country: 'United Kingdom', threatCount: 543, primaryThreat: 'Phishing', riskLevel: 'medium' },
    { country: 'Germany', threatCount: 432, primaryThreat: 'Botnet', riskLevel: 'medium' },
  ]);

  const [selectedThreat, setSelectedThreat] = useState<ThreatData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredThreats = threats.filter(threat => {
    const matchesSearch = threat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         threat.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || threat.type === filterType;
    return matchesSearch && matchesType;
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ransomware': return 'bg-red-500/20 text-red-400';
      case 'apt': return 'bg-purple-500/20 text-purple-400';
      case 'phishing': return 'bg-yellow-500/20 text-yellow-400';
      case 'malware': return 'bg-orange-500/20 text-orange-400';
      case 'botnet': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Threat Intelligence</h2>
          <p className="text-gray-400">Global threat landscape and intelligence feeds</p>
        </div>
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400">Global Intelligence</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                placeholder="Search threats, indicators, or descriptions..."
              />
            </div>
          </div>
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="ransomware">Ransomware</option>
              <option value="apt">APT</option>
              <option value="phishing">Phishing</option>
              <option value="malware">Malware</option>
              <option value="botnet">Botnet</option>
            </select>
          </div>
        </div>
      </div>

      {/* Geographic Threat Overview */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Geographic Threat Distribution</h3>
          <div className="flex items-center space-x-2 text-gray-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Top 5 Countries</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {geographicThreats.map((geo, index) => (
            <div key={index} className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-4 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium text-sm">{geo.country}</h4>
                <div className={`w-3 h-3 rounded-full ${
                  geo.riskLevel === 'critical' ? 'bg-red-500' :
                  geo.riskLevel === 'high' ? 'bg-orange-500' :
                  geo.riskLevel === 'medium' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}></div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Threats</span>
                  <span className="text-white font-medium">{geo.threatCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Primary</span>
                  <span className="text-cyan-400 text-xs">{geo.primaryThreat}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Risk Level</span>
                  <span className={`text-xs font-medium ${getRiskLevelColor(geo.riskLevel)}`}>
                    {geo.riskLevel.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Threats */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Active Threat Campaigns</h3>
          <div className="flex items-center space-x-2 text-gray-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">{filteredThreats.length} active campaigns</span>
          </div>
        </div>

        <div className="space-y-4">
          {filteredThreats.map((threat) => (
            <div 
              key={threat.id} 
              className={`border rounded-lg p-4 cursor-pointer hover:scale-[1.02] transition-all duration-200 ${getSeverityColor(threat.severity)}`}
              onClick={() => setSelectedThreat(threat)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(threat.type)}`}>
                      {threat.type.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      threat.severity === 'critical' ? 'bg-red-500 text-white' :
                      threat.severity === 'high' ? 'bg-orange-500 text-white' :
                      threat.severity === 'medium' ? 'bg-yellow-500 text-black' :
                      'bg-blue-500 text-white'
                    }`}>
                      {threat.severity.toUpperCase()}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">Last seen: {threat.lastSeen}</span>
                    </div>
                  </div>
                  <h4 className="text-white font-medium mb-2">{threat.name}</h4>
                  <p className="text-gray-300 text-sm mb-3">{threat.description}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span>{threat.affectedCountries.length} countries affected</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Database className="w-3 h-3" />
                      <span>{threat.indicators.length} indicators</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Threat Details Modal */}
      {selectedThreat && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setSelectedThreat(null)}>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Threat Intelligence Report</h3>
              <button 
                onClick={() => setSelectedThreat(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Threat Name</label>
                    <div className="text-white text-lg font-medium">{selectedThreat.name}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Type & Severity</label>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(selectedThreat.type)}`}>
                        {selectedThreat.type.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        selectedThreat.severity === 'critical' ? 'bg-red-500 text-white' :
                        selectedThreat.severity === 'high' ? 'bg-orange-500 text-white' :
                        selectedThreat.severity === 'medium' ? 'bg-yellow-500 text-black' :
                        'bg-blue-500 text-white'
                      }`}>
                        {selectedThreat.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Timeline</label>
                    <div className="space-y-1">
                      <div className="text-white text-sm">First Seen: {selectedThreat.firstSeen}</div>
                      <div className="text-white text-sm">Last Seen: {selectedThreat.lastSeen}</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Affected Countries</label>
                    <div className="flex flex-wrap gap-1">
                      {selectedThreat.affectedCountries.map((country, index) => (
                        <span key={index} className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs">
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Indicators of Compromise</label>
                    <div className="space-y-1">
                      {selectedThreat.indicators.map((indicator, index) => (
                        <div key={index} className="text-white font-mono text-sm bg-gray-700/50 rounded px-2 py-1">
                          {indicator}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Threat Description</label>
                <div className="text-white bg-gray-700/50 rounded p-4">{selectedThreat.description}</div>
              </div>

              {/* Mitigation */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Recommended Mitigation</label>
                <div className="text-green-400 bg-green-500/10 border border-green-500/30 rounded p-4">
                  {selectedThreat.mitigation}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}