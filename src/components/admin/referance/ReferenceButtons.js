import React from 'react';
import '../../../styles/globalButtons.css';
import '../../../styles/globalTypography.css';

const ReferenceButtons = () => {
  return (
    <div>
      <h2 className="h2">Button Types</h2>

      {/* Temel Butonlar */}
      <div>
        <button className="btn btn-primary">Primary Button</button>
        <button className="btn btn-secondary">Secondary Button</button>
        <button className="btn btn-danger">Danger Button</button>
        <button className="btn btn-success">Success Button</button>
      </div>

      <h2 className="h2">Small Buttons</h2>

      {/* Küçük Butonlar */}
      <div>
        <button className="btn btn-primary btn-small">Primary Small</button>
        <button className="btn btn-secondary btn-small">Secondary Small</button>
        <button className="btn btn-danger btn-small">Danger Small</button>
        <button className="btn btn-success btn-small">Success Small</button>
      </div>

      <h2 className="h2">Outline Buttons</h2>

      {/* Çerçeveli Butonlar */}
      <div>
        <button className="btn btn-outline btn-outline-primary">Outline Primary</button>
        <button className="btn btn-outline btn-outline-secondary">Outline Secondary</button>
        <button className="btn btn-outline btn-outline-danger">Outline Danger</button>
        <button className="btn btn-outline btn-outline-success">Outline Success</button>
      </div>
    </div>
  );
};

export default ReferenceButtons;
