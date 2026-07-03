import React from 'react';
import './GuessRow.css'; // Importando o CSS

const AttributeBlock = ({ value, status }) => {
  const statusClass = status ? `status-${status}` : 'status-red';

  return (
    <div className={`attribute-block ${statusClass}`}>
      <span>{value}</span>
    </div>
  );
};

const GuessRow = ({ attributes }) => {
  return (
    <div className="guess-row">
      {attributes.map((attr, index) => (
        <AttributeBlock 
          key={index} 
          value={attr.value} 
          status={attr.status} 
        />
      ))}
    </div>
  );
};

export default GuessRow;