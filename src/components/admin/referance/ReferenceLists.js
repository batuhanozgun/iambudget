import React from 'react';
import '../../../styles/globalLists.css';
import '../../../styles/globalTypography.css';
import '../../../styles/globalContainers.css';

const ReferenceLists = () => (
  <section className="section">
    <div className="form-wrapper">
      <h2 className="form-header">Lists</h2>
      <div className="form-description">
        This is a description of the list section. Here you can see examples of different types of lists.
      </div>
      <div className="form-container">
        <ul className="list">
          <li className="list-item">List Item 1</li>
          <li className="list-item">List Item 2</li>
          <li className="list-item">List Item 3</li>
        </ul>
      </div>
    </div>
  </section>
);

export default ReferenceLists;
