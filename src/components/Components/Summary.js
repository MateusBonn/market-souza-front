import React from 'react';
import styles from './Summary.module.css';
import {sendSold } from '../services/api'


function Summary({ selecionados }) {

  const calculateTotalValue = () => {
    const total = selecionados.reduce((acc, item) => acc + parseFloat(item.priceProduct), 0);
    return total.toFixed(2);
  };  

  const handleConcluirVenda = async event => {
          const response = await sendSold(selecionados)
          if (response.ok) {
            console.log('Venda concluída com sucesso!');
            window.location.reload();
          } else {
            console.error('Erro ao concluir a venda.');
          }
      };

  return (
    <div className={styles.summary}>
      <p>Total: R$ {calculateTotalValue()}</p>
      <button className={styles.concluirButton} onClick={handleConcluirVenda}>
        Concluir venda
        </button>
    </div>
  );
}

export default Summary;
