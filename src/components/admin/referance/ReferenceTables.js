import React, { useEffect } from 'react';
import '../../../styles/globalTables.css';
import '../../../styles/globalTypography.css';
import '../../../styles/globalButtons.css';
import '../../../styles/globalContainers.css';

const ReferenceTables = () => {
  useEffect(() => {
    const tableRows = document.querySelectorAll('.table-body .table-row');
    tableRows.forEach((row, index) => {
      const buttonGroup = row.querySelector('.button-group');
      if (buttonGroup) {
        const rowRect = row.getBoundingClientRect();
        const tableRect = row.closest('.table').getBoundingClientRect();
        buttonGroup.style.top = `${rowRect.top - tableRect.top + rowRect.height / 2}px`;
      }
    });
  }, []);

  return (
    <section className="section">
      {/* Basic Table */}
      <div className="form-wrapper">
        <h2 className="form-header">Basic Table</h2>
        <div className="form-description">
          This is a description of the basic table section. Here you can see examples of a basic table.
        </div>
        <div className="form-container">
          <table className="table">
            <thead className="table-head">
              <tr className="table-row">
                <th className="table-cell">Header 1</th>
                <th className="table-cell">Header 2</th>
                <th className="table-cell">Header 3</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr className="table-row">
                <td className="table-cell">Data 1</td>
                <td className="table-cell">Data 2</td>
                <td className="table-cell">Data 3</td>
              </tr>
              <tr className="table-row">
                <td className="table-cell">Data 4</td>
                <td className="table-cell">Data 5</td>
                <td className="table-cell">Data 6</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Table with Actions */}
      <div className="form-wrapper">
        <h2 className="form-header">Table with Actions</h2>
        <div className="form-description">
          This is a description of the table with actions section. Here you can see examples of a table with actions.
        </div>
        <div className="form-container">
          <table className="table">
            <thead className="table-head">
              <tr className="table-row">
                <th className="table-cell">Header 1</th>
                <th className="table-cell">Header 2</th>
                <th className="table-cell">Header 3</th>
                <th className="table-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr className="table-row">
                <td className="table-cell">Data 1</td>
                <td className="table-cell">Data 2</td>
                <td className="table-cell">Data 3</td>
                <td className="table-cell">
                  <div className="button-group">
                    <button className="btn btn-primary btn-small">Edit</button>
                    <button className="btn btn-danger btn-small">Delete</button>
                  </div>
                </td>
              </tr>
              <tr className="table-row">
                <td className="table-cell">Data 4</td>
                <td className="table-cell">Data 5</td>
                <td className="table-cell">Data 6</td>
                <td className="table-cell">
                  <div className="button-group">
                    <button className="btn btn-primary btn-small">Edit</button>
                    <button className="btn btn-danger btn-small">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ReferenceTables;
