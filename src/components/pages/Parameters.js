import React, { useState, useContext } from 'react';

import { AuthContext } from "../../contexts/Auth"
import {sendStorage, recoveredToken } from '../services/api'
import Cookies from 'universal-cookie';



function Parameters() {
    const { logout } = useContext(AuthContext);
    var cookie = new Cookies()
    const [codigo, setCodigo] = useState('');
    const [nomeProduto, setNomeProduto] = useState('');
  
    const handleSubmit = async event => {
      event.preventDefault();
  
      const formData = {
        id: parseInt(codigo),
        name: nomeProduto
      };
  
      try {
        var response = await sendStorage(formData);
  
        if(response.status === 201){
          console.log('Produto adicionado com sucesso!');
        }
      
      } catch (auth) {
  
        if(auth.response.status === 401) {
  
          try {
            await recoveredToken(cookie.get('refreshToken'))
            
            
              response = await sendStorage(formData);
  
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