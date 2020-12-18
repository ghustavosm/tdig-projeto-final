import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import firebaseDB from '../../services/Firebase';
import Carregando from '../../components/Carregando';
import BotaoVoltar from '../../components/BotaoVoltar';

/*
 * Página
 */
const VerProjeto = () => {

  var [membros, setMembros] = useState([]);
  var [usuarios, setUsuarios] = useState([]);
  const [sucesso, setSucesso] = useState(false);
  const [valoresIniciais, setValoresIniciais] = useState({ nome: '', descricao: '' });
  const { id } = useRouteMatch().params;

  useEffect(() => {
    let snapshot;
    firebaseDB.firestore().collection('membros').where('projeto', '==', id).get().then((snapshot) => {
      let membros = [];
      snapshot.forEach(function (doc) {
        membros[doc.id] = doc.data();
      });
      setMembros(membros);
      firebaseDB.firestore().collection('usuarios').orderBy('nome').get().then((snapshot) => {
        let usuarios = [];
        snapshot.forEach(function (doc) {
          usuarios[doc.id] = doc.data();
        });
        setUsuarios(usuarios);
        snapshot = firebaseDB.firestore().collection('projetos').doc(id).onSnapshot((doc) => {
            let projeto = doc.data();
            projeto.id = doc.id;
            setSucesso(true);
            setValoresIniciais({ nome: projeto.nome, descricao: projeto.descricao });
        });
      }).catch(function (error) {
        setSucesso(false);
        console.error("Erro ao carregar usuários!", error);
      });
    }).catch(function (error) {
      setSucesso(false);
      console.error("Erro ao carregar membros!", error);
    });
    return () => {
      snapshot && snapshot();
    }
  }, [id]);

  if (sucesso === true) {
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
            <tr>
            <th scope="row">Membros do projeto</th>
            <td>{
                Object.keys(membros).map((key) => (
                    <div key={key}>
                        {usuarios[membros[key].usuario].nome} ({membros[key].funcao})<br />
                    </div>
                ))
            }</td>
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