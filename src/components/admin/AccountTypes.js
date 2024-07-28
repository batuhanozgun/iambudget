import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Firebase import
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import '../../styles/globalForms.css';
import '../../styles/globalButtons.css';
import '../../styles/globalTypography.css';
import '../../styles/globalContainers.css';
import '../../styles/globalMessages.css'; // Mesaj stillerini ekliyoruz
import '../../styles/globalAccordions.css';

const AccountTypes = () => {
  const [accountType, setAccountType] = useState('');
  const [accountTypeName, setAccountTypeName] = useState('');
  const [sortNumber, setSortNumber] = useState('');
  const [transactionWay, setTransactionWay] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [accountTypes, setAccountTypes] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchAccountTypes = async () => {
      const querySnapshot = await getDocs(collection(db, 'accountTypes'));
      const accountTypesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAccountTypes(accountTypesList);
    };

    fetchAccountTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateDoc(doc(db, 'accountTypes', editId), {
          accountType,
          accountTypeName,
          sortNumber: Number(sortNumber),
          transactionWay,
          createDate: new Date().toISOString()
        });
        setMessage({ text: 'Account type updated successfully', type: 'success' });
      } else {
        await addDoc(collection(db, 'accountTypes'), {
          accountType,
          accountTypeName,
          sortNumber: Number(sortNumber),
          transactionWay,
          createDate: new Date().toISOString()
        });
        setMessage({ text: 'Account type added successfully', type: 'success' });
      }
      
      // Formu temizleyin
      setAccountType('');
      setAccountTypeName('');
      setSortNumber('');
      setTransactionWay('');
      setEditMode(false);
      setEditId(null);

      // Kayıtları yeniden fetch edin
      const querySnapshot = await getDocs(collection(db, 'accountTypes'));
      const accountTypesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAccountTypes(accountTypesList);
    } catch (error) {
      console.error('Error adding/updating document: ', error);
      setMessage({ text: 'Error adding/updating account type', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'accountTypes', id));
      setMessage({ text: 'Account type deleted successfully', type: 'success' });

      // Kayıtları yeniden fetch edin
      const querySnapshot = await getDocs(collection(db, 'accountTypes'));
      const accountTypesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAccountTypes(accountTypesList);
    } catch (error) {
      console.error('Error deleting document: ', error);
      setMessage({ text: 'Error deleting account type', type: 'error' });
    }
  };

  const handleEdit = (accountType) => {
    setAccountType(accountType.accountType);
    setAccountTypeName(accountType.accountTypeName);
    setSortNumber(accountType.sortNumber);
    setTransactionWay(accountType.transactionWay);
    setEditMode(true);
    setEditId(accountType.id);
  };

  const handleCancelEdit = () => {
    setAccountType('');
    setAccountTypeName('');
    setSortNumber('');
    setTransactionWay('');
    setEditMode(false);
    setEditId(null);
  };

  const handleAccordionToggle = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const renderAccordionContent = (accountType) => {
    return (
      <ul>
        <li className="list-item">Account Type: {accountType.accountType}</li>
        <li className="list-item">Account Type Name: {accountType.accountTypeName}</li>
        <li className="list-item">Sort Number: {accountType.sortNumber}</li>
        <li className="list-item">Transaction Way: {accountType.transactionWay}</li>
        <li className="list-item">Create Date: {accountType.createDate}</li>
      </ul>
    );
  };

  return (
    <div>
      <div className="form-wrapper">
        <h2 className="form-header">Account Types</h2>
        <p className="form-description">Please fill out the fields below to create a new account type.</p>

        <div className="form-container">
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {/* Account Type Input */}
            <div className="form-group">
              <label className="form-label" htmlFor="accountType">Account Type</label>
              <input
                type="text"
                id="accountType"
                className="form-input"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                placeholder="Enter account type..."
                required
              />
            </div>

            {/* Account Type Name Input */}
            <div className="form-group">
              <label className="form-label" htmlFor="accountTypeName">Account Type Name</label>
              <input
                type="text"
                id="accountTypeName"
                className="form-input"
                value={accountTypeName}
                onChange={(e) => setAccountTypeName(e.target.value)}
                placeholder="Enter account type name..."
                required
              />
            </div>

            {/* Sort Number Input */}
            <div className="form-group">
              <label className="form-label" htmlFor="sortNumber">Sort Number</label>
              <input
                type="number"
                id="sortNumber"
                className="form-input"
                value={sortNumber}
                onChange={(e) => setSortNumber(e.target.value)}
                placeholder="Enter sort number..."
                required
              />
            </div>

            {/* Transaction Way Select Box */}
            <div className="form-group">
              <label className="form-label" htmlFor="transactionWay">Transaction Way</label>
              <select
                id="transactionWay"
                className="form-select"
                value={transactionWay}
                onChange={(e) => setTransactionWay(e.target.value)}
                required
              >
                <option value="">Select transaction way</option>
                <option value="OneWay">OneWay</option>
                <option value="TwoWays">TwoWays</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="form-group">
              <button className="btn btn-primary" type="submit">{editMode ? 'Update' : 'Submit'}</button>
              {editMode && (
                <button className="btn btn-secondary" type="button" onClick={handleCancelEdit}>Cancel</button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Accordion Bölümü */}
      <div className="form-wrapper">
        <h2 className="form-header">Existing Account Types</h2>
        <p className="form-description">Here you can see existing account types.</p>
        <div className="form-container">
          <div className="accordion">
            {accountTypes.map((accountType, index) => (
              <div className="accordion-item" key={accountType.id}>
                <div
                  className="accordion-header"
                  onClick={() => handleAccordionToggle(index)}
                >
                  <div
                    className={`accordion-title ${activeAccordion === index ? 'active' : ''}`}
                  >
                    {accountType.accountTypeName}
                  </div>
                  <div className="accordion-actions">
                    <button className="btn btn-primary btn-small" onClick={() => handleEdit(accountType)}>Edit</button>
                    <button className="btn btn-danger btn-small" onClick={() => handleDelete(accountType.id)}>Delete</button>
                  </div>
                </div>
                {activeAccordion === index && (
                  <div className="accordion-content active">
                    {renderAccordionContent(accountType)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTypes;
