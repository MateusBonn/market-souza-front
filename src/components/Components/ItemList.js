import styles from './ItemList.module.css';

function ItemList({ previsoes, selecionados, setSelectedItem, setShowValueModal }) {
  return (
    <ul>
      {previsoes && previsoes.length > 0 ? (
      previsoes.map((previsao,index) => (
        <div key={index} className={styles.item_container}>
             <p>Você queria dizer:</p>
          <li>Código: {previsao.codeProduct}</li>
          <li>Produto: {previsao.nameProduct}</li>
          <li>Valor: R$ {previsao.priceProduct}</li>
        </div>
      ))
      ) : (
        <p>Nenhum dado disponível.</p>
      )}
           <div>
        {selecionados.map((item, index) => (
          <div key={index} className={styles.item_container_selected}>
            <p>Itens Selecionados:</p>
            <li>Código: {item.codeProduct}</li>
            <li>Produto: {item.nameProduct}</li>
            <li>Valor: R$ {item.priceProduct}</li>
          </div>
        ))}
      </div>
    </ul>
  );
}

export default ItemList;
