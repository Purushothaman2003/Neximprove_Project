function FilingList({ filings, onSelectFiling }) {
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

  return (
    <div className="filing-list">
      <h2>Filings</h2>
      {filings.length === 0 ? (
        <p>No filings submitted yet.</p>
      ) : (
        <div className="filing-items">
          {filings.map((filing) => (
            <div
              key={filing.No}
              className="filing-card"
              onClick={() => onSelectFiling(filing)}
            >
              <div className="filing-header">
                <h3>{filing.filing_no}</h3>
                <span className={`status-badge ${getStatusClass(filing.status)}`}>
                  {filing.status}
                </span>
              </div>
              <div className="filing-details">
                <p><strong>Customer:</strong> {filing.customer_id}</p>
                <p><strong>Port:</strong> {filing.port}</p>
                <p><strong>Last Updated:</strong>{now.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilingList;