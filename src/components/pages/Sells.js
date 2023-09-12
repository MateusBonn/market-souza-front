import React, { useState, useEffect } from 'react';
import ValueModal from '../../modals/ValueModal';
import ItemList from '../Components/ItemList'
import Summary from '../Components/Summary'
import styles from './Sells.module.css'

function Sells() {
  const [termo, setTermo] = useState('');
  const [previsoes, setPrevisoes] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const [showValueModal, setShowValueModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (termo) {
      fetch(`http://localhost:5000/Storage?codeProduct_like=${termo}`)
        .then(response => response.json())
        .then(data => {
          setPrevisoes(data);
        })
        .catch(error => {
          console.error('Erro ao buscar previsões:', error);
        });
    } else {
      setPrevisoes([]);
    }
  }, [termo]);

  const handleKeyPress = async event => {
    if (event.key === 'Enter') {
      const itemSelecionado = previsoes.find(previsao => previsao.id.toString() === termo);
      if (itemSelecionado) {
        const response = await fetch(`http://localhost:5000/parameters?id_like=${termo}`);
        const data = await response.json();

        if (data.length > 0) {
          setSelectedItem(itemSelecionado);
          setShowValueModal(true);
        } else {
          const selectedItem = {
            id: itemSelecionado.id,
            name: itemSelecionado.name,
            value: itemSelecionado.value
          };
          setSelecionados([...selecionados, selectedItem]);
        }
      }
      setTermo('');
    }
  };

  const handleModalConfirm = newValue => {
    const updatedItem = {
      id: selectedItem.id,
      name: selectedItem.name,
      value: newValue
    };
    setSelecionados([...selecionados, updatedItem]);
    setShowValueModal(false);
    setSelectedItem(null);
  };

  return (
    <div >
      <div className={styles.page_container}>
      <p>Insira o código de barras</p>
      <input
        type="text"
        value={termo}
        onChange={e => setTermo(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Digite um código"
      />
      </div>
      <ItemList previsoes={previsoes} selecionados={selecionados} setSelectedItem={setSelectedItem} setShowValueModal={setShowValueModal} />
      <Summary selecionados={selecionados} />
      {showValueModal && selectedItem && (
        <ValueModal
          initialValue={selectedItem.value}
          onConfirm={handleModalConfirm}
          onCancel={() => setShowValueModal(false)}
        />
      )}
    </div>
  );
}

export default Sells;
