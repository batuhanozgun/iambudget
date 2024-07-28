import React, { useState } from 'react';
import '../../../styles/globalAccordions.css';
import '../../../styles/globalButtons.css';
import '../../../styles/globalTypography.css';
import '../../../styles/globalContainers.css';

const ReferenceAccordions = () => {
  const [activeAccordion1, setActiveAccordion1] = useState(null);
  const [activeAccordion2, setActiveAccordion2] = useState(null);

  const handleAccordionToggle1 = (index) => {
    setActiveAccordion1(activeAccordion1 === index ? null : index);
  };

  const handleAccordionToggle2 = (index) => {
    setActiveAccordion2(activeAccordion2 === index ? null : index);
  };

  const renderAccordionContent1 = () => (
    <ul>
      <li className="list-item">Madde 1 (list-item)</li>
      <li className="list-item">Madde 2 (list-item)</li>
      <li className="list-item">Madde 3 (list-item)</li>
    </ul>
  );

  const renderAccordionContent2 = () => (
    <ul>
      <li className="list-item">
        Option 1 (list-item)
        <button className="btn btn-primary btn-small">Edit (btn btn-primary btn-small)</button>
        <button className="btn btn-danger btn-small">Delete (btn btn-danger btn-small)</button>
      </li>
      <li className="list-item">
        Option 2 (list-item)
        <button className="btn btn-primary btn-small">Edit (btn btn-primary btn-small)</button>
        <button className="btn btn-danger btn-small">Delete (btn btn-danger btn-small)</button>
      </li>
    </ul>
  );

  return (
    <div>
      <section className="section">
        <div className="form-wrapper">
          <h2 className="form-header">Accordion Type 1 (form-header)</h2>
          <div className="form-description">
            This is a description of the accordion section. Here you can see examples of different types of accordions. (form-description)
          </div>
          <div className="form-container">
            <div className="accordion">
              <div className="accordion-item">
                <div
                  className="accordion-header"
                  onClick={() => handleAccordionToggle1(1)}
                >
                  <div
                    className={`accordion-title ${activeAccordion1 === 1 ? 'active' : ''}`}
                  >
                    Accordion Type 1 (accordion-title)
                  </div>
                  <div className="accordion-actions">
                    <button className="btn btn-primary btn-small">Edit (btn btn-primary btn-small)</button>
                    <button className="btn btn-danger btn-small">Delete (btn btn-danger btn-small)</button>
                  </div>
                </div>
                {activeAccordion1 === 1 && (
                  <div className="accordion-content active">
                    {renderAccordionContent1()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="form-wrapper">
          <h2 className="form-header">Accordion Type 2 (form-header)</h2>
          <div className="form-description">
            This is a description of the accordion section. Here you can see examples of different types of accordions. (form-description)
          </div>
          <div className="form-container">
            <div className="accordion">
              <div className="accordion-item">
                <div
                  className="accordion-header"
                  onClick={() => handleAccordionToggle2(1)}
                >
                  <div
                    className={`accordion-title ${activeAccordion2 === 1 ? 'active' : ''}`}
                  >
                    Accordion Type 2 (accordion-title)
                  </div>
                  <div className="accordion-actions">
                    <button className="btn btn-primary btn-small">Edit (btn btn-primary btn-small)</button>
                    <button className="btn btn-danger btn-small">Delete (btn btn-danger btn-small)</button>
                  </div>
                </div>
                {activeAccordion2 === 1 && (
                  <div className="accordion-content active">
                    {renderAccordionContent2()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReferenceAccordions;
