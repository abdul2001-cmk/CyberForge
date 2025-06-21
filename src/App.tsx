import React, { useState } from 'react';
import { Shield, Activity, Search, Bug, Eye, Key, Menu, X } from 'lucide-react';
import Dashboard from './components/Dashboard';
import NetworkScanner from './components/NetworkScanner';
import PenTestSuite from './components/PenTestSuite';
import SecurityMonitoring from './components/SecurityMonitoring';
import ThreatIntelligence from './components/ThreatIntelligence';
import CryptoTools from './components/CryptoTools';

type ActiveTab = 'dashboard' | 'scanner' | 'pentest' | 'monitoring' | 'intelligence' | 'crypto';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Activity, component: Dashboard },
    { id: 'scanner', name: 'Network Scanner', icon: Search, component: NetworkScanner },
    { id: 'pentest', name: 'Penetration Testing', icon: Bug, component: PenTestSuite },
    { id: 'monitoring', name: 'Security Monitoring', icon: Eye, component: SecurityMonitoring },
    { id: 'intelligence', name: 'Threat Intelligence', icon: Shield, component: ThreatIntelligence },
    { id: 'crypto', name: 'Crypto Tools', icon: Key, component: CryptoTools },
  ];

  const ActiveComponent = navigation.find(nav => nav.id === activeTab)?.component || Dashboard;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative flex h-screen">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-800/80 backdrop-blur-xl border-r border-gray-700/50 transition-transform duration-300 ease-in-out`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CyberForge</h1>
                <p className="text-xs text-gray-400">Security Platform</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-6 px-3">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as ActiveTab);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Status Indicator */}
          <div className="absolute bottom-6 left-3 right-3">
            <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-400">System Online</span>
              </div>
              <div className="text-xs text-gray-400">
                All security modules operational
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="h-16 bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/50 flex items-center justify-between px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-gray-400">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Live Security Feed</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-gray-700/50 px-3 py-1 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-300">Secure</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">CF</span>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-6">
            <ActiveComponent />
          </main>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default App;