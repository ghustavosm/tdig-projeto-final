import React, { useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

const removerFirebase = (tipo, id) => {
  return true;
};

const RemoverSucesso = () => {
  const history = useHistory();
  return (
  <div className="remover-sucesso">
    <h1>Removido com sucesso!</h1>
    <hr />
    <button type="button" className="btn btn-secondary btn-lg" onClick={() => { history.goBack() }}>Retornar</button>
  </div>
  )
};

const RemoverErro = () => {
  const history = useHistory();
  return (
  <div className="remover-erro">
    <h1>Erro ao remover!</h1>
    <hr />
    <button type="button" className="btn btn-secondary btn-lg" onClick={() => { history.goBack() }}>Retornar</button>
  </div>
  )
};

/*
 * Página
 */
const Remover = () => {
  const history = useHistory();
  const { tipo, id } = useRouteMatch().params;
  const [confirmado, setConfirmado] = useState(false);

  if(!confirmado) {
    return (
      <div className="remover-confirmar">
        <h1>Tem certeza que deseja remover?</h1>
        <hr />
        <button type="button" className="btn btn-primary btn-lg" onClick={() => { setConfirmado(true) }}>Confirmar</button>
        <button type="button" className="btn btn-secondary btn-lg" onClick={() => { history.goBack() }}>Cancelar</button>
      </div>
    )
  } else {
      if(removerFirebase(tipo, id) === true) {
        return <RemoverSucesso />;
      } else {
        return <RemoverErro />;
      }
  }  
}

export default Remover;