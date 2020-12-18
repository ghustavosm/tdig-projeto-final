import React, { useState, useEffect } from 'react';
import firebaseDB from '../../services/Firebase';
import { Link } from 'react-router-dom';
import Carregando from '../../components/Carregando';
import Mensagem from '../../components/Mensagem';

/*
 * Página
 */
const ListarProfessores = () => {

  var [professores, setProfessores] = useState([]);
  const [sucesso, setSucesso] = useState(null);

  useEffect(() => {
    firebaseDB.firestore().collection('usuarios').where('tipo', '==', 'professor').get().then((snapshot) => {
      let professores = [];
      snapshot.forEach(function (doc) {
        professores[doc.id] = doc.data();
      });
      setSucesso(true);
      setProfessores(professores);
    }).catch(function (error) {
      setSucesso(false);
      console.error("Erro ao carregar professores!", error);
    });
  }, []);

  if (sucesso === true) {
    return (
      <div className="listagem listar-professores">
        <h1>Listagem de professores cadastrados:</h1>
        <hr />
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Matricula</th>
              <th scope="col">Área de Atuação</th>
              <th scope="col">Formação</th>
              <th className="acoes" scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(professores).map((key) => (
                <tr key={key}>
                  <td>{professores[key].nome}</td>
                  <td>{professores[key].matricula}</td>
                  <td>{professores[key].atuacao}</td>
                  <td>{professores[key].formacao}</td>
                  <td className="acoes nowrap">
                    <Link to={"/ver/professor/" + key} title="Ver"><i className="fa fa-eye"></i></Link>
                    <Link to={"/editar/professor/" + key} title="Editar"><i className="fa fa-pencil"></i></Link>
                    <Link to={"/vincular/membro/" + key} title="Vincular membro"><i className="fa fa-link"></i></Link>
                    <Link to={"/remover/professor/" + key} title="Remover"><i className="fa fa-trash"></i></Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  } else if (sucesso === false) {
    return <Mensagem titulo="Erro ao carregar professores!" texto="Houve um erro ao carregar os professores do banco de dados." />;
  } else {
    return <Carregando />;
  }
};

export default ListarProfessores;