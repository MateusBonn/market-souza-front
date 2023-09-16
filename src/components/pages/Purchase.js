import React, { useState, useContext } from 'react';

import { AuthContext } from "../../contexts/Auth"
import {sendStorage, recoveredToken } from '../services/api'
import Cookies from 'universal-cookie';

function Purchase() {
  var cookie = new Cookies()
  const { logout } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [codeProduct, setCodeProduct] = useState('');
  const [nameProduct, setNameProduct] = useState('');
  const [productQuantityBought, setProductQuantityBought] = useState('');
  const [priceProductBought, setPriceProductBought] = useState('');
  const [priceProductToSell, setPriceProductToSell] = useState('');
  const [username, setUsername] = useState('');




  const newProduct = {
    codeProduct,
    nameProduct,
    productQuantityBought,
    priceProductBought,
    priceProductToSell,
    username
  };

  const addProductSend = async (e) => {
    e.preventDefault();
    setUsername(cookie.get('user'))
    setProducts([...products, newProduct])
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      var response = await sendStorage(products);

      if(response.status === 201){
        console.log('Produto adicionado com sucesso!');
      }
    
    } catch (auth) {

      if(auth.response.status === 401) {

        try {
          await recoveredToken(cookie.get('refreshToken'))
          
          
            response = await sendStorage(products);

            if(response.status === 201){
              console.log('Produto adicionado com sucesso!');
            }
        } catch(error) {
          console.error('Erro ao recuperar o token', error);
          alert('Ocorreu um erro ao recuperar o token.', error);
          logout()
        }

      }
    }
  }



  return (
    <div>
      <h2>Cadastro de Produtos</h2>
      <form onSubmit={addProductSend}>
        <label>
          Código:
          <input type="text" value={codeProduct} onChange={(e) => setCodeProduct(e.target.value)} required/>
        </label>
        <br />
        <label>
          Nome do Produto:
          <input
            type="text"
            value={nameProduct}
            onChange={(e) => setNameProduct(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Quantidade:
          <input type="number" value={productQuantityBought} onChange={(e) => setProductQuantityBought(e.target.value)} required/>
        </label>
        <br />
        <label>
          Preço de Compra:
          <input
            type="number"
            value={priceProductBought}
            onChange={(e) => setPriceProductBought(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Preço de Venda:
          <input
            type="number"
            value={priceProductToSell}
            onChange={(e) => setPriceProductToSell(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Adicionar Produto</button>
      </form>

      <h2>Lista de Produtos</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            Código: {product.codeProduct}, Nome: {product.nameProduct}, Quantidade: {product.productQuantityBought}, 
            Preço de Compra: {product.priceProductBought}, Preço de Venda: {product.priceProductToSell}
          </li>
        ))}
      </ul>
      <button onClick={handleFormSubmit}>Enviar</button>
    </div>
  );
}

export default Purchase;
