import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Firebase import
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import '../../styles/globalForms.css';
import '../../styles/globalButtons.css';
import '../../styles/globalTypography.css';
import '../../styles/globalContainers.css';
import '../../styles/globalMessages.css'; // Mesaj stillerini ekliyoruz
import '../../styles/globalAccordions.css';

const TransactionTypes = () => {
  const [transactionType, setTransactionType] = useState('');
  const [transactionTypeName, setTransactionTypeName] = useState('');
  const [sortNumber, setSortNumber] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchTransactionTypes = async () => {
      const querySnapshot = await getDocs(collection(db, 'transactionTypes'));
      const transactionTypesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactionTypes(transactionTypesList);
    };

    fetchTransactionTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateDoc(doc(db, 'transactionTypes', editId), {
          transactionType,
          transactionTypeName,
          sortNumber: Number(sortNumber),
          createDate: new Date().toISOString()
        });
        setMessage({ text: 'Transaction type updated successfully', type: 'success' });
      } else {
        await addDoc(collection(db, 'transactionTypes'), {
          transactionType,
          transactionTypeName,
          sortNumber: Number(sortNumber),
          createDate: new Date().toISOString()
        });
        setMessage({ text: 'Transaction type added successfully', type: 'success' });
      }
      
      // Formu temizleyin
      setTransactionType('');
      setTransactionTypeName('');
      setSortNumber('');
      setEditMode(false);
      setEditId(null);

      // Kayıtları yeniden fetch edin
      const querySnapshot = await getDocs(collection(db, 'transactionTypes'));
      const transactionTypesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactionTypes(transactionTypesList);
    } catch (error) {
      console.error('Error adding/updating document: ', error);
      setMessage({ text: 'Error adding/updating transaction type', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'transactionTypes', id));
      setMessage({ text: 'Transaction type deleted successfully', type: 'success' });

      // Kayıtları yeniden fetch edin
      const querySnapshot = await getDocs(collection(db, 'transactionTypes'));
      const transactionTypesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactionTypes(transactionTypesList);
    } catch (error) {
      console.error('Error deleting document: ', error);
      setMessage({ text: 'Error deleting transaction type', type: 'error' });
    }
  };

  const handleEdit = (transactionType) => {
    setTransactionType(transactionType.transactionType);
    setTransactionTypeName(transactionType.transactionTypeName);
    setSortNumber(transactionType.sortNumber);
    setEditMode(true);
    setEditId(transactionType.id);
  };

  const handleCancelEdit = () => {
    setTransactionType('');
    setTransactionTypeName('');
    setSortNumber('');
    setEditMode(false);
    setEditId(null);
  };

  const handleAccordionToggle = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const renderAccordionContent = (transactionType) => {
    return (
      <ul>
        <li className="list-item">Transaction Type: {transactionType.transactionType}</li>
        <li className="list-item">Transaction Type Name: {transactionType.transactionTypeName}</li>
        <li className="list-item">Sort Number: {transactionType.sortNumber}</li>
        <li className="list-item">Create Date: {transactionType.createDate}</li>
      </ul>
    );
  };

  return (
    <div>
      <div className="form-wrapper">
        <h2 className="form-header">Transaction Types</h2>
        <p className="form-description">Please fill out the fields below to create a new transaction type.</p>

        <div className="form-container">
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {/* Transaction Type Input */}
            <div className="form-group">
              <label className="form-label" htmlFor="transactionType">Transaction Type</label>
              <input
                type="text"
                id="transactionType"
                className="form-input"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                placeholder="Enter transaction type..."
                required
              />
            </div>

            {/* Transaction Type Name Input */}
            <div className="form-group">
              <label className="form-label" htmlFor="transactionTypeName">Transaction Type Name</label>
              <input
                type="text"
                id="transactionTypeName"
                className="form-input"
                value={transactionTypeName}
                onChange={(e) => setTransactionTypeName(e.target.value)}
                placeholder="Enter transaction type name..."
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
        <h2 className="form-header">Existing Transaction Types</h2>
        <p className="form-description">Here you can see existing transaction types.</p>
        <div className="form-container">
          <div className="accordion">
            {transactionTypes.map((transactionType, index) => (
              <div className="accordion-item" key={transactionType.id}>
                <div
                  className="accordion-header"
                  onClick={() => handleAccordionToggle(index)}
                >
                  <div
                    className={`accordion-title ${activeAccordion === index ? 'active' : ''}`}
                  >
                    {transactionType.transactionTypeName}
                  </div>
                  <div className="accordion-actions">
                    <button className="btn btn-primary btn-small" onClick={() => handleEdit(transactionType)}>Edit</button>
                    <button className="btn btn-danger btn-small" onClick={() => handleDelete(transactionType.id)}>Delete</button>
                  </div>
                </div>
                {activeAccordion === index && (
                  <div className="accordion-content active">
                    {renderAccordionContent(transactionType)}
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

export default TransactionTypes;
