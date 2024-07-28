import React from 'react';
import '../../../styles/globalForms.css';
import '../../../styles/globalButtons.css';
import '../../../styles/globalTypography.css';
import '../../../styles/globalContainers.css';

const ReferenceForms = () => {
  return (
    <div className="form-wrapper">
      <h2 className="form-header">Form Title (form-header)</h2> {/* Form başlığı */}
      <p className="form-description">This is a description of the form. Please fill out the fields below. (form-description)</p> {/* Form açıklama metni */}

      <div className="form-container">
        {/* Text Input */}
        <div className="form-group">
          <label className="form-label" htmlFor="textInput">Text Input (form-label)</label>
          <input type="text" id="textInput" className="form-input" placeholder="Enter text here... (form-input)" />
        </div>

        {/* Textarea */}
        <div className="form-group">
          <label className="form-label" htmlFor="textArea">Textarea (form-label)</label>
          <textarea id="textArea" className="form-textarea" placeholder="Enter text here... (form-textarea)" rows="4"></textarea>
        </div>

        {/* Select Box */}
        <div className="form-group">
          <label className="form-label" htmlFor="selectBox">Select Box (form-label)</label>
          <select id="selectBox" className="form-select">
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        {/* Radio Buttons */}
        <div className="form-group">
          <label className="form-label">Radio Buttons (form-label)</label>
          <div className="form-option-group">
            <div className="form-radio-group">
              <input type="radio" id="radio1" name="radioGroup" className="form-radio" />
              <label htmlFor="radio1">Option 1 (form-radio)</label>
            </div>
            <div className="form-radio-group">
              <input type="radio" id="radio2" name="radioGroup" className="form-radio" />
              <label htmlFor="radio2">Option 2 (form-radio)</label>
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <div className="form-group">
          <label className="form-label">Checkbox (form-label)</label>
          <div className="form-option-group">
            <div className="form-checkbox-group">
              <input type="checkbox" id="checkbox1" className="form-checkbox" />
              <label htmlFor="checkbox1">Option 1 (form-checkbox)</label>
            </div>
            <div className="form-checkbox-group">
              <input type="checkbox" id="checkbox2" className="form-checkbox" />
              <label htmlFor="checkbox2">Option 2 (form-checkbox)</label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button className="btn btn-primary">Submit (btn btn-primary)</button>
        </div>
      </div>
    </div>
  );
};

export default ReferenceForms;
