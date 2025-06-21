import React, { useState } from 'react';
import { Key, Lock, Unlock, Hash, Shield, Copy, Check, Eye, EyeOff } from 'lucide-react';

interface HashResult {
  algorithm: string;
  hash: string;
}

export default function CryptoTools() {
  const [activeTab, setActiveTab] = useState('hash');
  const [inputText, setInputText] = useState('');
  const [hashResults, setHashResults] = useState<HashResult[]>([]);
  const [encryptionKey, setEncryptionKey] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  // Mock hash functions (in a real app, you'd use proper crypto libraries)
  const generateHashes = (text: string) => {
    if (!text) {
      setHashResults([]);
      return;
    }

    // Mock hash generation (replace with actual crypto functions)
    const mockHashes: HashResult[] = [
      { algorithm: 'MD5', hash: btoa(text + 'md5').substring(0, 32) },
      { algorithm: 'SHA-1', hash: btoa(text + 'sha1').substring(0, 40) },
      { algorithm: 'SHA-256', hash: btoa(text + 'sha256').substring(0, 64) },
      { algorithm: 'SHA-512', hash: btoa(text + 'sha512').substring(0, 128) },
    ];

    setHashResults(mockHashes);
  };

  // Mock encryption/decryption
  const encryptText = () => {
    if (!inputText || !encryptionKey) return;
    // Simple mock encryption (use proper encryption in production)
    const encrypted = btoa(inputText + encryptionKey);
    setEncryptedText(encrypted);
  };

  const decryptText = () => {
    if (!encryptedText || !encryptionKey) return;
    try {
      // Simple mock decryption
      const decrypted = atob(encryptedText).replace(encryptionKey, '');
      setDecryptedText(decrypted);
    } catch {
      setDecryptedText('Decryption failed - invalid key or data');
    }
  };

  // Password strength calculation
  const calculatePasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength += 20;
    if (pwd.length >= 12) strength += 10;
    if (/[a-z]/.test(pwd)) strength += 15;
    if (/[A-Z]/.test(pwd)) strength += 15;
    if (/[0-9]/.test(pwd)) strength += 15;
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 25;
    return Math.min(strength, 100);
  };

  const handlePasswordChange = (pwd: string) => {
    setPassword(pwd);
    setPasswordStrength(calculatePasswordStrength(pwd));
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    setPasswordStrength(calculatePasswordStrength(result));
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedHash(type);
      setTimeout(() => setCopiedHash(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 30) return 'bg-red-500';
    if (strength < 60) return 'bg-yellow-500';
    if (strength < 80) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength: number) => {
    if (strength < 30) return 'Weak';
    if (strength < 60) return 'Fair';
    if (strength < 80) return 'Good';
    return 'Strong';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Cryptographic Tools</h2>
          <p className="text-gray-400">Hash generation, encryption, and password security tools</p>
        </div>
        <div className="flex items-center space-x-2">
          <Key className="w-5 h-5 text-green-400" />
          <span className="text-green-400">Crypto Suite</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-800/30 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('hash')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
            activeTab === 'hash' 
              ? 'bg-cyan-500 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
          }`}
        >
          <Hash className="w-4 h-4" />
          <span>Hash Generator</span>
        </button>
        <button
          onClick={() => setActiveTab('encrypt')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
            activeTab === 'encrypt' 
              ? 'bg-cyan-500 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Encryption</span>
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
            activeTab === 'password' 
              ? 'bg-cyan-500 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Password Tools</span>
        </button>
      </div>

      {/* Hash Generator Tab */}
      {activeTab === 'hash' && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Hash Generator</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Input Text</label>
              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  generateHashes(e.target.value);
                }}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none resize-none"
                rows={4}
                placeholder="Enter text to generate hashes..."
              />
            </div>

            {hashResults.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-md font-medium text-white">Generated Hashes</h4>
                {hashResults.map((result, index) => (
                  <div key={index} className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-cyan-400 font-medium">{result.algorithm}</span>
                      <button
                        onClick={() => copyToClipboard(result.hash, result.algorithm)}
                        className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
                      >
                        {copiedHash === result.algorithm ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        <span className="text-sm">
                          {copiedHash === result.algorithm ? 'Copied!' : 'Copy'}
                        </span>
                      </button>
                    </div>
                    <div className="text-white font-mono text-sm break-all bg-gray-800/50 rounded p-2">
                      {result.hash}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Encryption Tab */}
      {activeTab === 'encrypt' && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Text Encryption/Decryption</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Encryption */}
              <div className="space-y-4">
                <h4 className="text-md font-medium text-white flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Encryption</span>
                </h4>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Plain Text</label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none resize-none"
                    rows={4}
                    placeholder="Enter text to encrypt..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Encryption Key</label>
                  <input
                    type="text"
                    value={encryptionKey}
                    onChange={(e) => setEncryptionKey(e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="Enter encryption key..."
                  />
                </div>
                <button
                  onClick={encryptText}
                  className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                >
                  Encrypt Text
                </button>
                {encryptedText && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Encrypted Text</label>
                    <div className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-4">
                      <div className="text-white font-mono text-sm break-all">{encryptedText}</div>
                      <button
                        onClick={() => copyToClipboard(encryptedText, 'encrypted')}
                        className="mt-2 flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
                      >
                        {copiedHash === 'encrypted' ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        <span className="text-sm">
                          {copiedHash === 'encrypted' ? 'Copied!' : 'Copy'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Decryption */}
              <div className="space-y-4">
                <h4 className="text-md font-medium text-white flex items-center space-x-2">
                  <Unlock className="w-4 h-4" />
                  <span>Decryption</span>
                </h4>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Encrypted Text</label>
                  <textarea
                    value={encryptedText}
                    onChange={(e) => setEncryptedText(e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none resize-none"
                    rows={4}
                    placeholder="Enter encrypted text..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Decryption Key</label>
                  <input
                    type="text"
                    value={encryptionKey}
                    onChange={(e) => setEncryptionKey(e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="Enter decryption key..."
                  />
                </div>
                <button
                  onClick={decryptText}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                >
                  Decrypt Text
                </button>
                {decryptedText && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Decrypted Text</label>
                    <div className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-4">
                      <div className="text-white text-sm">{decryptedText}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Password Tools Tab */}
      {activeTab === 'password' && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Password Security Tools</h3>
          <div className="space-y-6">
            {/* Password Strength Checker */}
            <div>
              <h4 className="text-md font-medium text-white mb-4">Password Strength Analyzer</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 pr-10 text-white focus:border-cyan-500 focus:outline-none"
                      placeholder="Enter password to analyze..."
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {password && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Strength:</span>
                      <span className={`text-sm font-medium ${
                        passwordStrength < 30 ? 'text-red-400' :
                        passwordStrength < 60 ? 'text-yellow-400' :
                        passwordStrength < 80 ? 'text-orange-400' :
                        'text-green-400'
                      }`}>
                        {getStrengthText(passwordStrength)} ({passwordStrength}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength)}`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <div className={`flex items-center space-x-2 ${password.length >= 8 ? 'text-green-400' : 'text-red-400'}`}>
                          <div className={`w-2 h-2 rounded-full ${password.length >= 8 ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          <span>At least 8 characters</span>
                        </div>
                        <div className={`flex items-center space-x-2 ${/[a-z]/.test(password) ? 'text-green-400' : 'text-red-400'}`}>
                          <div className={`w-2 h-2 rounded-full ${/[a-z]/.test(password) ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          <span>Lowercase letters</span>
                        </div>
                        <div className={`flex items-center space-x-2 ${/[A-Z]/.test(password) ? 'text-green-400' : 'text-red-400'}`}>
                          <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(password) ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          <span>Uppercase letters</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className={`flex items-center space-x-2 ${/[0-9]/.test(password) ? 'text-green-400' : 'text-red-400'}`}>
                          <div className={`w-2 h-2 rounded-full ${/[0-9]/.test(password) ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          <span>Numbers</span>
                        </div>
                        <div className={`flex items-center space-x-2 ${/[^A-Za-z0-9]/.test(password) ? 'text-green-400' : 'text-red-400'}`}>
                          <div className={`w-2 h-2 rounded-full ${/[^A-Za-z0-9]/.test(password) ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          <span>Special characters</span>
                        </div>
                        <div className={`flex items-center space-x-2 ${password.length >= 12 ? 'text-green-400' : 'text-yellow-400'}`}>
                          <div className={`w-2 h-2 rounded-full ${password.length >= 12 ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                          <span>12+ characters (recommended)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    onClick={generateRandomPassword}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    Generate Strong Password
                  </button>
                  {password && (
                    <button
                      onClick={() => copyToClipboard(password, 'password')}
                      className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                    >
                      {copiedHash === 'password' ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span>{copiedHash === 'password' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}