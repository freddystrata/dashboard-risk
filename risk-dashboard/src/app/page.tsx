'use client';

import { useState } from 'react';
import RiskTable from '@/components/RiskTable';
import RiskSummary from '@/components/RiskSummary';
import RiskForm from '@/components/RiskForm';
import ExcelUpload from '@/components/ExcelUpload';
import { SAMPLE_RISKS } from '@/data/sampleRisks';
import { RiskItem } from '@/types/risk';

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export default function RiskDashboard() {
  const [risks, setRisks] = useState<RiskItem[]>(SAMPLE_RISKS);
  const [activeTab, setActiveTab] = useState<'summary' | 'table'>('summary');
  
  // Modal states
  const [isRiskFormOpen, setIsRiskFormOpen] = useState(false);
  const [isExcelUploadOpen, setIsExcelUploadOpen] = useState(false);
  const [editingRisk, setEditingRisk] = useState<RiskItem | null>(null);

  // Risk management functions
  const handleAddRisk = (riskData: Omit<RiskItem, 'id'>) => {
    const newRisk: RiskItem = {
      ...riskData,
      id: generateId(),
    };
    setRisks(prev => [...prev, newRisk]);
    setIsRiskFormOpen(false);
  };

  const handleEditRisk = (risk: RiskItem) => {
    setEditingRisk(risk);
    setIsRiskFormOpen(true);
  };

  const handleUpdateRisk = (riskData: Omit<RiskItem, 'id'>) => {
    if (editingRisk) {
      setRisks(prev => prev.map(r => 
        r.id === editingRisk.id 
          ? { ...riskData, id: editingRisk.id }
          : r
      ));
      setEditingRisk(null);
      setIsRiskFormOpen(false);
    }
  };

  const handleDeleteRisk = (riskId: string) => {
    setRisks(prev => prev.filter(r => r.id !== riskId));
  };

  const handleUpdateStatus = (riskId: string, status: 'Open' | 'In Progress' | 'Mitigated' | 'Closed') => {
    setRisks(prev => prev.map(r => 
      r.id === riskId 
        ? { ...r, status, updatedAt: new Date().toISOString() }
        : r
    ));
  };

  const handleExcelImport = (importedRisks: RiskItem[]) => {
    setRisks(prev => [...prev, ...importedRisks]);
  };

  const handleCloseRiskForm = () => {
    setEditingRisk(null);
    setIsRiskFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Risk Management Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsExcelUploadOpen(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                📤 Import Excel
              </button>
              <button
                onClick={() => setIsRiskFormOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                ➕ Add Risk
              </button>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('summary')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'summary'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard Summary
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'table'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Risk Table
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'summary' && <RiskSummary risks={risks} />}
        {activeTab === 'table' && (
          <RiskTable 
            risks={risks} 
            onEditRisk={handleEditRisk}
            onDeleteRisk={handleDeleteRisk}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </main>

              {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-sm text-gray-500">
              <p>Risk Management Dashboard - Enhanced with Full Data Management</p>
              <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
            </div>
          </div>
        </footer>

        {/* Modals */}
        <RiskForm
          risk={editingRisk}
          onSave={editingRisk ? handleUpdateRisk : handleAddRisk}
          onCancel={handleCloseRiskForm}
          isOpen={isRiskFormOpen}
        />

        <ExcelUpload
          onImport={handleExcelImport}
          isOpen={isExcelUploadOpen}
          onClose={() => setIsExcelUploadOpen(false)}
        />
      </div>
    );
  }
