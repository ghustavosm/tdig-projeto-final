import React, { useState, useEffect } from 'react';
import firebaseDB from '../firebase';

/*
 * Página
 */
const Home = () => {

  var [alunos, setAlunos] = useState({})

  useEffect(() => {
    firebaseDB.collection('alunos').get().then((snapshot) => {
      let alunos = {};
      snapshot.forEach(function(doc) {
        alunos[doc.id] = doc.data();
      });
      setAlunos(alunos);
    })
  }, []);

  return (
    <div className="Home">
        <h1>Home</h1>
        <hr />
        <p>This is our home.</p>
        <table className="table table-borderless table-stripped">
          <thead className="thead-light">
              <tr>
                  <th>Nome</th>
                  <th>Idade</th>
                  <th>CPF</th>
                  <th>Matricula</th>
                  <th>Endereço</th>
                  <th>Número</th>
                  <th>Complemento</th>
                  <th>Bairro</th>
                  <th>Cidade</th>
                  <th>Estado</th>
                  <th>CEP</th>
              </tr>
          </thead>
          <tbody>
              {
                  Object.keys(alunos).map((key) => (
                      <tr key={key}>
                          <td>{alunos[key].nome}</td>
                          <td>{alunos[key].idade}</td>
                          <td>{alunos[key].cpf}</td>
                          <td>{alunos[key].matricula}</td>
                          <td>{alunos[key].curso}</td>
                          <td>{alunos[key].endereco}</td>
                          <td>{alunos[key].numero}</td>
                          <td>{alunos[key].complemento}</td>
                          <td>{alunos[key].bairro}</td>
                          <td>{alunos[key].cidade}</td>
                          <td>{alunos[key].cep}</td>
                      </tr>
                  ))
              }
          </tbody>
      </table>
    </div>
  )
};

export default Home;