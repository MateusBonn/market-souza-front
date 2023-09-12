import React, { useState, useContext } from 'react';
import Cookies from 'universal-cookie';

import { AuthContext } from "../../contexts/Auth"
import {api ,sendStorage, recoveredToken } from '../services/api'

function Purchase() {
  const { logout } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [codeProduct, setCodeProduct] = useState('');
  const [nameProduct, setNameProduct] = useState('');
  const [productQuantityBought, setProductQuantityBought] = useState('');
  const [priceProductBought, setPriceProductBought] = useState('');
  const [priceProductToSell, setPriceProductToSell] = useState('');
  var cookie = new Cookies();


  const newProduct = {
    codeProduct,
    nameProduct,
    productQuantityBought,
    priceProductBought,
    priceProductToSell,
  };

  const addProductSend = async (e) => {
    e.preventDefault();
    setProducts([...products, newProduct])
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendStorage(products);

      if(response.status === 201){
        console.log('Produto adicionado com sucesso!');
      }
      if(response.status === 401) {
        try {
          const responseToken = recoveredToken(cookie.get("refreshToken"))
          if(responseToken.status === 200){
            console.log('Tokem recuperado');
            const loggedUser = responseToken.data.login;
            const token = responseToken.data.token;
            cookie.set("firstName",loggedUser.firstName)
            cookie.set("role",loggedUser.role)

            cookie.set("accessToken",token.accessToken)
            cookie.set("refreshToken", token.refreshToken)
            api.defaults.headers.Authorization = `Bearer ${token.accessToken}`
          }
        } catch(error) {
          console.error('Erro ao recuperar o token', error);
          alert('Ocorreu um erro ao recuperar o token.', error);
          logout()
        }
      }
    } catch (error) {
      console.error('Erro ao enviar o produto:', error);
      alert('Ocorreu um erro ao enviar o produto.', error);
    }
  };


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
