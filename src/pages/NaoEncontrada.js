import React from 'react';
import { useHistory } from 'react-router-dom';

/*
 * Página
 */
const NaoEncontrada = () => {  
  const history = useHistory();
  return (
    <div className="not-found">
        <h1>404 - Página não encontrada</h1>
        <hr />
        <button type="button" className="btn btn-secondary btn-lg" onClick={() => { history.goBack() }}>Retornar</button>
    </div>
  )
};

export default NaoEncontrada;