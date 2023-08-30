import React, { useState } from 'react';

function Parameters() {
    const [codigo, setCodigo] = useState('');
    const [nomeProduto, setNomeProduto] = useState('');
  
    const handleSubmit = async event => {
      event.preventDefault();
  
      const formData = {
        id: parseInt(codigo), // Converte para número inteiro
        name: nomeProduto
      };
  
      try {
        const responseParameters = await fetch('http://localhost:5000/parameters', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (responseParameters.ok) {
          console.log('Dados enviados com sucesso!');
          window.location.reload();
        } else {
          console.error('Erro ao enviar dados.');
        }
        
        
      // Envia os mesmos dados para o segundo endpoint
      const responseCode = await fetch('http://localhost:8081//supermercado-souza/product/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (responseCode.ok) {
        console.log('Dados enviados com sucesso para o segundo endpoint!');
        // Após o envio bem-sucedido, recarregue a página para limpar o formulário
        window.location.reload();
      } else {
        console.error('Erro ao enviar dados para o segundo endpoint.');
      }

      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
    };
  
    return (
      <div>
        <h2>Enviar Dados para Parâmetros</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Código:</label>
            <input type="number" value={codigo} onChange={e => setCodigo(e.target.value)} />
          </div>
          <div>
            <label>Nome do Produto:</label>
            <input type="text" value={nomeProduto} onChange={e => setNomeProduto(e.target.value)} />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  }
export default Parameters