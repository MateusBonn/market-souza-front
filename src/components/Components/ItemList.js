import React from 'react';
import styles from './ItemList.module.css';

function ItemList({ previsoes, selecionados, setSelectedItem, setShowValueModal }) {
  return (
    <ul>
      {previsoes.map(previsao => (
        <div key={previsao.id} className={styles.item_container}>
             <p>Você queria dizer:</p>
          <li>Código: {previsao.id}</li>
          <li>Produto: {previsao.name}</li>
          <li>Valor: R$ {previsao.value}</li>
        </div>
      ))}
      <div>
        {selecionados.map(item => (
          <div key={item.id} className={styles.item_container_selected}>
            <p>Itens Selecionados:</p>
            <li>Código: {item.id}</li>
            <li>Produto: {item.name}</li>
            <li>Valor: R$ {item.value}</li>
          </div>
        ))}
      </div>
    </ul>
  );
}

export default ItemList;
