import React, { useState, useEffect } from 'react';
import firebaseDB from '../../services/Firebase';
import { Link } from 'react-router-dom';
import Carregando from '../../components/Carregando';
import Mensagem from '../../components/Mensagem';

/*
 * Página
 */
const ListarProjetos = () => {

  var [projetos, setProjetos] = useState([]);
  const [sucesso, setSucesso] = useState(null);

  useEffect(() => {
    firebaseDB.firestore().collection('projetos').orderBy('nome').get().then((snapshot) => {
      let projetos = [];
      snapshot.forEach(function (doc) {
        projetos[doc.id] = doc.data();
      });
      setSucesso(true);
      setProjetos(projetos);
    }).catch(function (error) {
      setSucesso(false);
      console.error("Erro ao carregar projetos!", error);
    });
  }, []);

  if (sucesso === true) {
    return (
      <div className="listagem listar-projetos">
        <h1>Listagem de projetos cadastrados:</h1>
        <hr />
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Descrição</th>
              <th className="acoes" scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(projetos).map((key) => (
                <tr key={key}>
                  <td>{projetos[key].nome}</td>
                  <td>{projetos[key].descricao}</td>
                  <td className="acoes nowrap">
                    <Link to={"/ver/projeto/" + key} title="Ver"><i className="fa fa-eye"></i></Link>
                    <Link to={"/editar/projeto/" + key} title="Editar"><i className="fa fa-pencil"></i></Link>
                    <Link to={"/vincular/projeto/" + key} title="Vincular membro"><i className="fa fa-link"></i></Link>
                    <Link to={"/remover/projeto/" + key} title="Remover"><i className="fa fa-trash"></i></Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  } else if (sucesso === false) {
    return <Mensagem titulo="Erro ao carregar projetos!" texto="Houve um erro ao carregar os projetos do banco de dados." />;
  } else {
    return <Carregando />;
  }
};

export default ListarProjetos;