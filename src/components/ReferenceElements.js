import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/globalAccordions.css';
import '../styles/globalButtons.css';
import '../styles/globalTypography.css';
import '../styles/globalContainers.css';

const ReferenceElements = () => (
  <div style={{ padding: '20px' }}>
    <h1>Reference Elements</h1>
    <h3>Bu sayfa, projede kullanılacak öğelerin referansları içindir.</h3>

    <nav>
      <ul>
        <li><Link to="/buttons">Buttons</Link></li>
        <li><Link to="/forms">Forms</Link></li>
        <li><Link to="/headers">Headers</Link></li>
        <li><Link to="/tables">Tables</Link></li>
        <li><Link to="/accordions">Accordions</Link></li>
        <li><Link to="/lists">Lists</Link></li>
        <li><Link to="/menus">Menus</Link></li>
        <li><Link to="/typography">Typography</Link></li>
      </ul>
    </nav>
  </div>
);

export default ReferenceElements;
