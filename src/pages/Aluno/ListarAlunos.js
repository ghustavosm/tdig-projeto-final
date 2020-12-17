import React, { useState, useEffect } from 'react';
import firebaseDB from '../../services/Firebase';
import { Link } from 'react-router-dom';
import Carregando from '../../components/Carregando';
import Mensagem from '../../components/Mensagem';

/*
 * Página
 */
const ListarAlunos = () => {

  var [alunos, setAlunos] = useState([]);
  const [sucesso, setSucesso] = useState(null);

  useEffect(() => {
    firebaseDB.firestore().collection('usuarios').where('tipo', '==', 'aluno').get().then((snapshot) => { //.orderBy('nome')
      let alunos = [];
      snapshot.forEach(function(doc) {
        alunos[doc.id] = doc.data();
      });
      setSucesso(true);
      setAlunos(alunos);
    }).catch(function(error) {
      setSucesso(false);
      console.error("Erro ao carregar alunos!", error);
    });
  }, []);

  if(sucesso === true) {
    return (
      <div className="listagem listar-alunos">
          <h1>Listagem de alunos cadastrados:</h1>
          <hr />
          <table className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Idade</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Matricula</th>
                    <th scope="col">Curso</th>
                    <th scope="col">Endereço</th>
                    <th scope="col">Nº</th>
                    <th scope="col">Comp.</th>
                    <th scope="col">Bairro</th>
                    <th scope="col">Cidade</th>
                    <th scope="col">UF</th>
                    <th scope="col">CEP</th>
                    <th className="acoes" scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(alunos).map((key) => (
                        <tr key={key}>
                            <td>{alunos[key].nome}</td>
                            <td>{alunos[key].idade}</td>
                            <td className="nowrap">{alunos[key].cpf}</td>
                            <td>{alunos[key].matricula}</td>
                            <td>{alunos[key].curso}</td>
                            <td>{alunos[key].endereco}</td>
                            <td>{alunos[key].numero}</td>
                            <td>{alunos[key].complemento}</td>
                            <td>{alunos[key].bairro}</td>
                            <td>{alunos[key].cidade}</td>
                            <td>{alunos[key].estado}</td>
                            <td className="nowrap">{alunos[key].cep}</td>
                            <td className="acoes nowrap">
                              <Link to={"/ver/aluno/" + key} title="Ver"><i className="fa fa-eye"></i></Link>
                              <Link to={"/editar/aluno/" + key} title="Editar"><i className="fa fa-pencil"></i></Link>
                              <Link to={"/remover/aluno/" + key} title="Remover"><i className="fa fa-trash"></i></Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
      </div>
    )
  } else if (sucesso === false) {
    return <Mensagem titulo="Erro ao carregar alunos!" texto="Houve um erro ao carregar os alunos do banco de dados." />;
  } else {
    return <Carregando />;
  }
};

export default ListarAlunos;