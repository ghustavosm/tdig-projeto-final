import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebaseDB from '../../services/Firebase';
import Carregando from '../../components/Carregando';
import Mensagem from '../../components/Mensagem';

/*
 * Página
 */
const ListarMembros = () => {

  var [membros, setMembros] = useState([]);
  var [projetos, setProjetos] = useState([]);
  var [usuarios, setUsuarios] = useState([]);
  const [sucesso, setSucesso] = useState(null);

  useEffect(() => {
    firebaseDB.firestore().collection('membros').get().then((snapshot) => {
      let membros = [];
      snapshot.forEach(function (doc) {
        membros[doc.id] = doc.data();
      });
      setMembros(membros);
      firebaseDB.firestore().collection('projetos').orderBy('nome').get().then((snapshot) => {
        let projetos = [];
        snapshot.forEach(function (doc) {
          projetos[doc.id] = doc.data();
        });
        setProjetos(projetos);
        firebaseDB.firestore().collection('usuarios').get().then((snapshot) => {
          let usuarios = [];
          snapshot.forEach(function(doc) {
            usuarios[doc.id] = doc.data();
          });
          setUsuarios(usuarios);
          setSucesso(true);
        }).catch(function(error) {
          setSucesso(false);
          console.error("Erro ao carregar usuarios!", error);
        });
      }).catch(function (error) {
        setSucesso(false);
        console.error("Erro ao carregar projetos!", error);
      });
    }).catch(function (error) {
      setSucesso(false);
      console.error("Erro ao carregar membros!", error);
    });
  }, []);

  if (sucesso === true) {
    return (
      <div className="listagem listar-membros">
        <h1>Listagem de membros dos projetos:</h1>
        <hr />
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Membro</th>
              <th scope="col">Projeto</th>
              <th scope="col">Função</th>
              <th className="acoes" scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(membros).map((key) => (
                <tr key={key}>
                  <td>{usuarios[membros[key].usuario].nome}</td>
                  <td>{projetos[membros[key].projeto].nome}</td>
                  <td>{membros[key].funcao}</td>
                  <td className="acoes nowrap">
                    <Link to={"/remover/membro/" + key} title="Remover"><i className="fa fa-trash"></i></Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  } else if (sucesso === false) {
    return <Mensagem titulo="Erro ao carregar membros!" texto="Houve um erro ao carregar os membros do banco de dados." />;
  } else {
    return <Carregando />;
  }
};

export default ListarMembros;