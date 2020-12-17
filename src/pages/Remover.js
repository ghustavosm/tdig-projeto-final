import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import firebaseDB from '../services/Firebase';
import Carregando from '../components/Carregando';
import Mensagem from '../components/Mensagem';

const ResultadoRemover = () => {
  const { tipo, id } = useRouteMatch().params;
  const [sucesso, setSucesso] = useState(null);

  useEffect(() => {
    if(tipo === 'aluno' || tipo === 'professor') {
      firebaseDB.firestore().collection('usuarios').doc(id).delete().then(function() {
        setSucesso(true);
      }).catch(function(error) {
        setSucesso(false);
        console.error("Erro ao remover cadastro!", error);
      });
    } else {
      firebaseDB.firestore().collection('projetos').doc(id).delete().then(function() {
        setSucesso(true);
      }).catch(function(error) {
        setSucesso(false);
        console.error("Erro ao remover cadastro!", error);
      });
    }
  }, [tipo, id]);

  if(sucesso === true) {
    return <Mensagem titulo="Removido com sucesso!" texto="Entrada removida com seucesso do banco de dados." />;
  } else if (sucesso === false) {
    return <Mensagem titulo="Erro ao remover!" texto="HOuve um erro ao tentar remover a entrada do banco de dados." />;
  } else {
    return <Carregando />;
  }

}

/*
 * Página
 */
const Remover = () => {
  const [confirmado, setConfirmado] = useState(false);  

  if(!confirmado) {
    return <Mensagem titulo="Confirmação necessária!" texto="Tem certeza que deseja remover este cadastro?" botaoAcao={{acao: () => { setConfirmado(true) }, nome: "Confirmar"}} />
  } else {
    return <ResultadoRemover />
  }  
}

export default Remover;