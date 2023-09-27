import React from 'react';
import styles from './Summary.module.css';

function Summary({ selecionados }) {
  const calculateTotalValue = () => {
    const total = selecionados.reduce((acc, item) => acc + parseFloat(item.priceProduct), 0);
    return total.toFixed(2); // Arredonda para 2 casas decimais
  };  
  const handleConcluirVenda = async () => {
        try {
          const response = await fetch('http://localhost:5000/sold', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(selecionados)
          });
    
          if (response.ok) {
            console.log('Venda concluída com sucesso!');
            window.location.reload();
          } else {
            console.error('Erro ao concluir a venda.');
          }

        } catch (error) {
          console.error('Erro ao enviar a venda:', error);
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
