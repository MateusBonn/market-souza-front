import React, { useState, useEffect, useRef } from 'react';
import {getProduct } from '../services/api'
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
  const inputRef = useRef(null);

  useEffect(() => {
    if (termo) {
          getProduct(termo)
          .then((response) => {
          console.log(response)
            setPrevisoes(response.data.content)
        }).catch((error) => {
          console.log(error)
        })
    }else {
      setPrevisoes([]);
    }
  }, [termo]);

  useEffect(() => {
    if (!showValueModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showValueModal]);

  const handleKeyPress = async event => {
    if (event.key === 'Enter') {
      const itemSelecionado = previsoes.find(previsao => previsao.codeProduct === termo || previsao.nameProduct === termo.toUpperCase() ) ;
      console.log(itemSelecionado)
      if (itemSelecionado) {

        if (itemSelecionado.priceProduct == null) {
          setSelectedItem(itemSelecionado);
          setShowValueModal(true);
        } else {
          const selectedItem = {
            codeProduct: itemSelecionado.codeProduct,
            nameProduct: itemSelecionado.nameProduct,
            priceProduct: itemSelecionado.priceProduct
          };
          setSelecionados([...selecionados, selectedItem]);
        }
      }
      setTermo('');
    }
  };

  const handleModalConfirm = newValue => {
    const updatedItem = {
      codeProduct: selectedItem.codeProduct,
      nameProduct: selectedItem.nameProduct,
      priceProduct: newValue
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
        ref={inputRef}
        value={termo}
        onChange={e => setTermo(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Digite o código ou o nome do produto"
        autoFocus
      />
      </div>
      <ItemList previsoes={previsoes} selecionados={selecionados} setSelectedItem={setSelectedItem} setShowValueModal={setShowValueModal} />
      <Summary selecionados={selecionados} />
      {showValueModal && selectedItem && (
        <ValueModal
          initialValue={selectedItem.priceProduct}
          onConfirm={handleModalConfirm}
          onCancel={() => setShowValueModal(false)}
        />
      )}
    </div>
  );
}

export default Sells;
