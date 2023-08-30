import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Purchase() {
    const [products, setProducts] = useState([]);
  const [code, setCode] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!code || !productName || !quantity || !purchasePrice || !sellingPrice) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const newProduct = {
      code,
      productName,
      quantity,
      purchasePrice,
      sellingPrice,
    };
    
    try {
        const response = await fetch('http://localhost:8081//supermercado-souza/product/add-product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
    
        if (response.ok) {
          setProducts([...products, newProduct]);
          clearForm();
        } else {
          alert('Ocorreu um erro ao enviar o produto.');
        }
      } catch (error) {
        console.error('Erro ao enviar o produto:', error);
        alert('Ocorreu um erro ao enviar o produto.');
      }

    setProducts([...products, newProduct]);
    clearForm();
  };

  const clearForm = () => {
    setCode('');
    setProductName('');
    setQuantity('');
    setPurchasePrice('');
    setSellingPrice('');
  };

  return (
    <div>
      <h2>Cadastro de Produtos</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Código:
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
        </label>
        <br />
        <label>
          Nome do Produto:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Quantidade:
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </label>
        <br />
        <label>
          Preço de Compra:
          <input
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
          />
        </label>
        <br />
        <label>
          Preço de Venda:
          <input
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Adicionar Produto</button>
      </form>

      <h2>Lista de Produtos</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            Código: {product.code}, Nome: {product.productName}, Quantidade: {product.quantity}, 
            Preço de Compra: {product.purchasePrice}, Preço de Venda: {product.sellingPrice}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Purchase