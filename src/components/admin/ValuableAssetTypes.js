import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Firebase import
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import '../../styles/globalForms.css';
import '../../styles/globalButtons.css';
import '../../styles/globalTypography.css';
import '../../styles/globalContainers.css';
import '../../styles/globalMessages.css'; // Mesaj stillerini ekliyoruz
import '../../styles/globalAccordions.css';

const ValuableAssetTypes = () => {
  const [assetType, setAssetType] = useState('');
  const [assetTypeName, setAssetTypeName] = useState('');
  const [sortNumber, setSortNumber] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [assetTypes, setAssetTypes] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchAssetTypes = async () => {
      const querySnapshot = await getDocs(collection(db, 'valuableAssetTypes'));
      const assetTypesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAssetTypes(assetTypesList);
    };

    fetchAssetTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateDoc(doc(db, 'valuableAssetTypes', editId), {
          assetType,
          assetTypeName,
          sortNumber: Number(sortNumber),
          createDate: new Date().toISOString()
        });
        setMessage({ text: 'Asset type updated successfully', type: 'success' });
      } else {
        await addDoc(collection(db, 'valuableAssetTypes'), {
          assetType,
          assetTypeName,
          sortNumber: Number(sortNumber),
          createDate: new Date().toISOString()
        });
        setMessage({ text: 'Asset type added successfully', type: 'success' });
      }
      
      // Formu temizleyin
      setAssetType('');
      setAssetTypeName('');
      setSortNumber('');
      setEditMode(false);
      setEditId(null);

      // Kayıtları yeniden fetch edin
      const querySnapshot = await getDocs(collection(db, 'valuableAssetTypes'));
      const assetTypesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAssetTypes(assetTypesList);
    } catch (error) {
      console.error('Error adding/updating document: ', error);
      setMessage({ text: 'Error adding/updating asset type', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'valuableAssetTypes', id));
      setMessage({ text: 'Asset type deleted successfully', type: 'success' });

      // Kayıtları yeniden fetch edin
      const querySnapshot = await getDocs(collection(db, 'valuableAssetTypes'));
      const assetTypesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAssetTypes(assetTypesList);
    } catch (error) {
      console.error('Error deleting document: ', error);
      setMessage({ text: 'Error deleting asset type', type: 'error' });
    }
  };

  const handleEdit = (assetType) => {
    setAssetType(assetType.assetType);
    setAssetTypeName(assetType.assetTypeName);
    setSortNumber(assetType.sortNumber);
    setEditMode(true);
    setEditId(assetType.id);
  };

  const handleCancelEdit = () => {
    setAssetType('');
    setAssetTypeName('');
    setSortNumber('');
    setEditMode(false);
    setEditId(null);
  };

  const handleAccordionToggle = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const renderAccordionContent = (assetType) => {
    return (
      <ul>
        <li className="list-item">Asset Type: {assetType.assetType}</li>
        <li className="list-item">Asset Type Name: {assetType.assetTypeName}</li>
        <li className="list-item">Sort Number: {assetType.sortNumber}</li>
        <li className="list-item">Create Date: {assetType.createDate}</li>
      </ul>
    );
  };

  return (
    <div>
      <div className="form-wrapper">
        <h2 className="form-header">Valuable Asset Types</h2>
        <p className="form-description">Please fill out the fields below to create a new valuable asset type.</p>

        <div className="form-container">
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {/* Asset Type Input */}
            <div className="form-group">
              <label className="form-label" htmlFor="assetType">Asset Type</label>
              <input
                type="text"
                id="assetType"
                className="form-input"
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
                placeholder="Enter asset type..."
                required
              />
            </div>

            {/* Asset Type Name Input */}
            <div className="form-group">
              <label className="form-label" htmlFor="assetTypeName">Asset Type Name</label>
              <input
                type="text"
                id="assetTypeName"
                className="form-input"
                value={assetTypeName}
                onChange={(e) => setAssetTypeName(e.target.value)}
                placeholder="Enter asset type name..."
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
        <h2 className="form-header">Existing Valuable Asset Types</h2>
        <p className="form-description">Here you can see existing valuable asset types.</p>
        <div className="form-container">
          <div className="accordion">
            {assetTypes.map((assetType, index) => (
              <div className="accordion-item" key={assetType.id}>
                <div
                  className="accordion-header"
                  onClick={() => handleAccordionToggle(index)}
                >
                  <div
                    className={`accordion-title ${activeAccordion === index ? 'active' : ''}`}
                  >
                    {assetType.assetTypeName}
                  </div>
                  <div className="accordion-actions">
                    <button className="btn btn-primary btn-small" onClick={() => handleEdit(assetType)}>Edit</button>
                    <button className="btn btn-danger btn-small" onClick={() => handleDelete(assetType.id)}>Delete</button>
                  </div>
                </div>
                {activeAccordion === index && (
                  <div className="accordion-content active">
                    {renderAccordionContent(assetType)}
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

export default ValuableAssetTypes;
