import React, { useState } from 'react';

function FilingStatus({ filing, onUpdateStatus, onBack }) {
  const [currentStatus, setCurrentStatus] = useState(filing.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus) => {
    setIsUpdating(true);
    try {
      setCurrentStatus(newStatus);
      
      await onUpdateStatus(filing.id, newStatus);
    } catch (err) {
      console.error("Failed to update status:", err);
    
      setCurrentStatus(filing.status);
      alert("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Draft': return 'status-draft';
      case 'Submitted': return 'status-submitted';
      case 'Approved': return 'status-approved';
      case 'Rejected': return 'status-rejected';
      default: return '';
    }
  };
  const now = new Date();

  const canSubmit = currentStatus === 'Draft';
  const canApproveReject = currentStatus === 'Submitted';

  return (
    <div className="filing-status">
      <button onClick={onBack} className="btn btn-back">
        &larr; Back to List
      </button>
      
      <h2>Filing Details</h2>
      <div className="filing-card">
        <h3>{filing.filing_no}</h3>
        <p>Customer: {filing.customer_id}</p>
        <p>Port: {filing.port}</p>
        <p>Last Updated: {now.toLocaleString()}</p>
        
        <div className={`status-badge ${getStatusClass(currentStatus)}`}>
          {currentStatus}
        </div>

        <div className="status-actions">
          {canSubmit && (
            <button 
              className="btn btn-submit" 
              onClick={() => handleStatusUpdate('Submitted')}
              disabled={isUpdating}
            >
              {isUpdating ? 'Submitting...' : 'Submit Filing'}
            </button>
          )}

          {canApproveReject && (
            <>
              <button 
                className="btn btn-approve" 
                onClick={() => handleStatusUpdate('Approved')}
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Approve'}
              </button>
              <button 
                className="btn btn-reject" 
                onClick={() => handleStatusUpdate('Rejected')}
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Reject'}
              </button>
            </>
          )}

          {currentStatus === 'Approved' && (
            <p className="status-message">This filing has been approved.</p>
          )}

          {currentStatus === 'Rejected' && (
            <p className="status-message">This filing has been rejected.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilingStatus;