import React, { useState } from 'react';
import './account.scss';
import { jwtDecode } from "jwt-decode";

const DeleteAcc = () => {
  const [confirmationText, setConfirmationText] = useState('');
  const [reason, setReason] = useState('');

  const handleConfirmationChange = (e) => {
    setConfirmationText(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = async () => {
    if (confirmationText === 'DELETE') {

      console.log('Account will be deleted. Reason:', reason);
      const token = localStorage.getItem('token');
      if (!token) {
          throw new Error('No token found');
      }
      const decoded = jwtDecode(token);
      const username = decoded.sub;
      const formData = {
        username: username,
        reason: reason
    };

      const response = await fetch(`http://localhost:8080/delete/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
},
            body: JSON.stringify(formData)
});
        localStorage.removeItem('token');
        window.location.href = "/";

    } else {
      alert('Please type "DELETE" in all caps to confirm account deletion.');
    }
  };

  return (
    <div className="delete-acc-container">
      <div className="form-group">
        <label htmlFor="confirmationText">Type "DELETE" in all caps:</label>
        <input
          type="text"
          id="confirmationText"
          value={confirmationText}
          onChange={handleConfirmationChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="reason">Reason for account deletion:</label>
        <textarea
          id="reason"
          value={reason}
          onChange={handleReasonChange}
          rows={4}
          cols={50}
          className="form-control"
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-danger">Delete Account</button>
    </div>
  );
};

export default DeleteAcc;
