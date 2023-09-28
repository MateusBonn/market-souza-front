import React, { useState } from 'react';

function ValueModal({ initialValue, onConfirm, onCancel }) {
  const [newValue, setNewValue] = useState(initialValue);

  const handleInputChange = event => {
    setNewValue(event.target.value);
  };

  const handleConfirm = () => {
    onConfirm(newValue);
  };

  const handleConfirmEnter = async event => {
    if (event.key === 'Enter') {
      handleConfirm();
    }
    
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Atualizar Valor</h2>
        <p>Insira um novo valor:</p>
        <input
          type="number"
          value={newValue}
          onChange={handleInputChange}
          onKeyDown={handleConfirmEnter}
          autoFocus
        />
        <div className="modal-actions">
          <button onClick={handleConfirm}>Confirmar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default ValueModal;
