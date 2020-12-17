import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import firebaseDB from '../../services/Firebase';
import Carregando from '../../components/Carregando';
import BotaoVoltar from '../../components/BotaoVoltar';

/*
 * Página
 */
const VerProfessor = () => {

    const [sucesso, setSucesso] = useState(false);  
    const [valoresIniciais, setValoresIniciais] = useState({ usuario: '', senha: '', tipo: 'professor', nome: '', matricula: '', atuacao: '', formacao: ''});
    const { id } = useRouteMatch().params;

  useEffect(() => {
    let snapshot;
    snapshot = firebaseDB.firestore().collection('usuarios').doc(id).onSnapshot((doc) => {
        let usuario = doc.data();
        usuario.id = doc.id;
        setSucesso(true);
        setValoresIniciais({ usuario: usuario.usuario, senha: usuario.senha, tipo: usuario.tipo, nome: usuario.nome, matricula: usuario.matricula, atuacao: usuario.atuacao, formacao: usuario.formacao});
    });
    return () => {
      snapshot && snapshot();
    }
  }, [id]);

  if(sucesso === true) {
    return (
        <div className="visualizar ver-professor">
            <h1>{valoresIniciais.nome}</h1>
            <hr />
            <table className="table">
                <tbody>
                    <tr>
                        <th scope="row">Matrícula</th>
                        <td>{valoresIniciais.matricula}</td>
                    </tr>
                    <tr>
                        <th scope="row">Área de atuação</th>
                        <td>{valoresIniciais.atuacao}</td>
                    </tr>
                    <tr>
                        <th scope="row">Formação</th>
                        <td>{valoresIniciais.formacao}</td>
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

export default VerProfessor;