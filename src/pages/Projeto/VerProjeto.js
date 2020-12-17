import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import firebaseDB from '../../services/Firebase';
import Carregando from '../../components/Carregando';
import BotaoVoltar from '../../components/BotaoVoltar';

/*
 * Página
 */
const VerProjeto = () => {

    const [sucesso, setSucesso] = useState(false);  
    const [valoresIniciais, setValoresIniciais] = useState({ nome: '', descricao: ''});
    const { id } = useRouteMatch().params;

  useEffect(() => {
    let snapshot;
    snapshot = firebaseDB.firestore().collection('projetos').doc(id).onSnapshot((doc) => {
        let projeto = doc.data();
        projeto.id = doc.id;
        setSucesso(true);
        setValoresIniciais({ nome: projeto.nome, descricao: projeto.descricao });
    });
    return () => {
      snapshot && snapshot();
    }
  }, [id]);

  if(sucesso === true) {
    return (
        <div className="visualizar ver-projeto">
            <h1>{valoresIniciais.nome}</h1>
            <hr />
            <table className="table">
                <tbody>
                    <tr>
                        <th scope="row">Descrição</th>
                        <td>{valoresIniciais.descricao}</td>
                    </tr>
                </tbody>
            </table>
            <BotaoVoltar />
        </div>        
    )
  } else if (sucesso === false) {
    return <Carregando />;
  }
};

export default VerProjeto;