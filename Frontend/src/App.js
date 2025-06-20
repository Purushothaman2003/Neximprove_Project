import React, { useState, useEffect } from 'react';
import './App.css';
import FilingForm from './components/FilingForm';
import FilingList from './components/FilingList';
import StatusUpdateSimulator from './components/StatusUpdateSimulator';
import FilingStatus from './components/FilingStatus';
import { updateFilingStatus } from './services/api';
function App() {
  const [filings, setFilings] = useState([]);
  const [selectedFiling, setSelectedFiling] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const savedFilings = localStorage.getItem('customsFilings');
    if (savedFilings) {
      setFilings(JSON.parse(savedFilings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('customsFilings', JSON.stringify(filings));
  }, [filings]);

  const handleSubmitFiling = (newFiling) => {
    const filingWithDefaults = {
      ...newFiling,
      status: 'Draft',
      updated_at: new Date().toISOString()
    };
    setFilings(prev => [...prev, filingWithDefaults]);
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {

      const updatedFiling = await updateFilingStatus(id, newStatus);

      setFilings(prev =>
        prev.map(f =>
          f.id === id ? { ...f, status: updatedFiling.status, updated_at: updatedFiling.updated_at } : f
        )
      );
      if (selectedFiling && selectedFiling.id === id) {
        setSelectedFiling(prev => ({
          ...prev,
          status: updatedFiling.status,
          updated_at: updatedFiling.updated_at
        }));
      }
    } catch (error) {
      console.error("Error updating filing status:", error);
      alert("Failed to update status in backend.");
    }
  };

  const handleSelectFiling = (filing) => {
    setSelectedFiling(filing);
  };

  const handleBackToList = () => {
    setSelectedFiling(null);
  };

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Customs Filing Tracker</h1>
      </header>

      <div className="app-content">
        {!selectedFiling ? (
          <>
            <div className="form-section">
              <FilingForm onSubmit={handleSubmitFiling} />
              {/* <StatusUpdateSimulator
                isActive={isSimulating}
                onToggle={toggleSimulation}
                filings={filings}
                onUpdateStatus={handleUpdateStatus}
              /> */}
            </div>

            <div className="list-section">
              <FilingList filings={filings} onSelectFiling={handleSelectFiling} />
            </div>
          </>
        ) : (
          <div className="status-section">
            <FilingStatus
              filing={selectedFiling}
              onUpdateStatus={handleUpdateStatus}
              onBack={handleBackToList}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;