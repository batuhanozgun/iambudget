import React from 'react';
import '../../../styles/globalContainers.css';
import '../../../styles/globalTypography.css';
import '../../../styles/globalButtons.css';

const ReferenceContainers = () => {
  return (
    <div>
      <div className="form-wrapper">
        <div className="form-header">Form Header</div>
        <div className="form-description">This is a form description text.</div>
        <div className="form-container">
          <button className="btn btn-primary">Submit</button>
          <button className="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ReferenceContainers;
