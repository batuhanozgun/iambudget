import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Firebase import
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import '../../styles/globalForms.css';
import '../../styles/globalButtons.css';
import '../../styles/globalTypography.css';
import '../../styles/globalContainers.css';
import '../../styles/globalMessages.css'; // Mesaj stillerini ekliyoruz
import '../../styles/globalAccordions.css';

const CurrencyTypes = () => {
  const [currencyType, setCurrencyType] = useState('');
  const [currencyTypeName, setCurrencyTypeName] = useState('');
  const [sortNumber, setSortNumber] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [currencyTypes, setCurrencyTypes] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchCurrencyTypes = async () => {
      const querySnapshot = await getDocs(collection(db, 'currencyTypes'));
      const currencyTypesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCurrencyTypes(currencyTypesList);
    };

    fetchCurrencyTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateDoc(doc(db, 'currencyTypes', editId), {
          currencyType,
          currencyTypeName,
          sortNumber: Number(sortNumber),
          createDate: new Date().toISOString()
        });
        setMessage({ text: 'Currency type updated successfully', type: 'success' });
      } else {
        await addDoc(collection(db, 'currencyTypes'), {
          currencyType,
          currencyTypeName,
          sortNumber: Number(sortNumber),
          createDate: new Date().toISOString()
        });
        setMessage({ text: 'Currency type added successfully', type: 'success' });
      }
      
      // Formu temizleyin
      setCurrencyType('');
      setCurrencyTypeName('');
      setSortNumber('');
      setEditMode(false);
      setEditId(null);

      // Kayıtları yeniden fetch edin
      const querySnapshot = await getDocs(collection(db, 'currencyTypes'));
      const currencyTypesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCurrencyTypes(currencyTypesList);
    } catch (error) {
      console.error('Error adding/updating document: ', error);
      setMessage({ text: 'Error adding/updating currency type', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'currencyTypes', id));
      setMessage({ text: 'Currency type deleted successfully', type: 'success' });

      // Kayıtları yeniden fetch edin
      const querySnapshot = await getDocs(collection(db, 'currencyTypes'));
      const currencyTypesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCurrencyTypes(currencyTypesList);
    } catch (error) {
      console.error('Error deleting document: ', error);
      setMessage({ text: 'Error deleting currency type', type: 'error' });
    }
  };

  const handleEdit = (currencyType) => {
    setCurrencyType(currencyType.currencyType);
    setCurrencyTypeName(currencyType.currencyTypeName);
    setSortNumber(currencyType.sortNumber);
    setEditMode(true);
    setEditId(currencyType.id);
  };

  const handleCancelEdit = () => {
    setCurrencyType('');
    setCurrencyTypeName('');
    setSortNumber('');
    setEditMode(false);
    setEditId(null);
  };

  const handleAccordionToggle = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const renderAccordionContent = (currencyType) => {
    return (
      <ul>
        <li className="list-item">Currency Type: {currencyType.currencyType}</li>
        <li className="list-item">Currency Type Name: {currencyType.currencyTypeName}</li>
        <li className="list-item">Sort Number: {currencyType.sortNumber}</li>
        <li className="list-item">Create Date: {currencyType.createDate}</li>
      </ul>
    );
  };

  return (
    <div>
      <div className="form-wrapper">
        <h2 className="form-header">Currency Types</h2>
        <p className="form-description">Please fill out the fields below to create a new currency type.</p>

        <div className="form-container">
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {/* Currency Type Input */}
            <div className="form-group">
              <label className="form-label" htmlFor="currencyType">Currency Type</label>
              <input
                type="text"
                id="currencyType"
                className="form-input"
                value={currencyType}
                onChange={(e) => setCurrencyType(e.target.value)}
                placeholder="Enter currency type..."
                required
              />
            </div>

            {/* Currency Type Name Input */}
            <div className="form-group">
              <label className="form-label" htmlFor="currencyTypeName">Currency Type Name</label>
              <input
                type="text"
                id="currencyTypeName"
                className="form-input"
                value={currencyTypeName}
                onChange={(e) => setCurrencyTypeName(e.target.value)}
                placeholder="Enter currency type name..."
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
        <h2 className="form-header">Existing Currency Types</h2>
        <p className="form-description">Here you can see existing currency types.</p>
        <div className="form-container">
          <div className="accordion">
            {currencyTypes.map((currencyType, index) => (
              <div className="accordion-item" key={currencyType.id}>
                <div
                  className="accordion-header"
                  onClick={() => handleAccordionToggle(index)}
                >
                  <div
                    className={`accordion-title ${activeAccordion === index ? 'active' : ''}`}
                  >
                    {currencyType.currencyTypeName}
                  </div>
                  <div className="accordion-actions">
                    <button className="btn btn-primary btn-small" onClick={() => handleEdit(currencyType)}>Edit</button>
                    <button className="btn btn-danger btn-small" onClick={() => handleDelete(currencyType.id)}>Delete</button>
                  </div>
                </div>
                {activeAccordion === index && (
                  <div className="accordion-content active">
                    {renderAccordionContent(currencyType)}
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

export default CurrencyTypes;
