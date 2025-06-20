import React, { useState } from 'react';
import { submitFiling } from '../services/api';

function FilingForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    filing_no: '',
    customer_id: '',
    port: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitFiling({
        filingNo: formData.filing_no,
        customerId: formData.customer_id,
        port: formData.port,
      });

      const newFiling = {
        id: response.id, 
        filing_no: response.filingNo,
        customer_id: response.customerId,
        port: response.port,
        status: response.status || 'Draft',
        updated_at:  new Date().toISOString(),
      };

      onSubmit(newFiling);

      setFormData({ filing_no: '', customer_id: '', port: '' });

      console.log("Backend response:", response);
      console.log("New Filing from backend:", response.id);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <div className="filing-form">
      <h2>Submit New Filing</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="filing_no">Filing Number</label>
          <input
            type="text"
            id="filing_no"
            name="filing_no"
            value={formData.filing_no}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customer_id">Customer ID</label>
          <input
            type="text"
            id="customer_id"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="port">Port</label>
          <select
            id="port"
            name="port"
            value={formData.port}
            onChange={handleChange}
            required
          >
            <option value="">Select Port</option>
            <option value="JFK">JFK</option>
            <option value="LAX">LAX</option>
            <option value="ORD">ORD</option>
            <option value="MIA">MIA</option>
            <option value="SFO">SFO</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit Filing</button>
      </form>
    </div>
  );
}

export default FilingForm;
