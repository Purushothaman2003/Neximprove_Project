const API_BASE_URL = 'http://localhost:9090/api';

export const submitFiling = async (filingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/filings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filingData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit filing');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Submit filing error:', error);
    throw error;
  }
};

export const getFilingStatus = async (filingId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/filings/${filingId}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get filing status');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Get filing status error:', error);
    throw error;
  }
};

export const updateFilingStatus = async (filingId, newStatus) => {
  try {
    console.log(`Attempting to update filing ${filingId} to ${newStatus}`); // Debug log
    
    const response = await fetch(`${API_BASE_URL}/filings/${filingId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Update status failed:', error); 
      throw new Error(error.message || 'Failed to update status');
    }

    const result = await response.json();
    console.log('Update successful:', result); 
    return result;
  } catch (error) {
    console.error('Update filing status error:', error);
    throw error;
  }
};

export const simulateWebhookUpdate = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/simulate-webhook`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Webhook simulation failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Webhook simulation error:', error);
    throw error;
  }
};