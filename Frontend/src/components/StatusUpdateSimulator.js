import React, { useState, useEffect } from 'react';

function StatusUpdateSimulator({ isActive, onToggle, filings, onUpdateStatus }) {
  const [log, setLog] = useState([]);

  useEffect(() => {
    let interval;
    if (isActive && filings.length > 0) {
      interval = setInterval(() => {
        const submittedFilings = filings.filter(f => f.status === 'Submitted');
        if (submittedFilings.length > 0) {
          const randomFiling = submittedFilings[
            Math.floor(Math.random() * submittedFilings.length)
          ];
          const newStatus = Math.random() > 0.3 ? 'Approved' : 'Rejected';
          
          onUpdateStatus(randomFiling.id, newStatus);
          
          const logEntry = {
            id: Date.now(),
            message: `Updated filing ${randomFiling.filing_no} to ${newStatus}`,
            timestamp: new Date().toLocaleTimeString(),
          };
          
          setLog(prev => [logEntry, ...prev].slice(0, 10)); // Keep last 10 entries
        }
      }, 10000); 
    }
    
    return () => clearInterval(interval);
  }, [isActive, filings, onUpdateStatus]);

  return (
    <div className="simulator-controls">
      <h3>Status Update Simulator</h3>
      <p>This simulates webhook updates from customs authorities</p>
      
      <button 
        className={`btn ${isActive ? 'btn-danger' : 'btn-primary'}`}
        onClick={onToggle}
      >
        {isActive ? 'Stop Simulation' : 'Start Simulation'}
      </button>
      
      {isActive && (
        <div className="simulator-log">
          <h4>Activity Log</h4>
          {log.length === 0 ? (
            <p>Waiting for status updates...</p>
          ) : (
            <ul>
              {log.map(entry => (
                <li key={entry.id}>
                  [{entry.timestamp}] {entry.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default StatusUpdateSimulator;