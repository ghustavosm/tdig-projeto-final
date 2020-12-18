import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import firebaseDB from '../../services/Firebase';
import Carregando from '../../components/Carregando';
import BotaoVoltar from '../../components/BotaoVoltar';

/*
 * Página
 */
const VerAluno = () => {

    var [membros, setMembros] = useState([]);
    var [projetos, setProjetos] = useState([]);
    const [sucesso, setSucesso] = useState(false);
    const [valoresIniciais, setValoresIniciais] = useState({ email: '', tipo: 'aluno', nome: '', idade: '', cpf: '', matricula: '', curso: '', endereco: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', cep: '' });
    const { id } = useRouteMatch().params;

    useEffect(() => {
        let snapshot;
        firebaseDB.firestore().collection('membros').where('usuario', '==', id).get().then((snapshot) => {
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
                snapshot = firebaseDB.firestore().collection('usuarios').doc(id).onSnapshot((doc) => {
                    let usuario = doc.data();
                    usuario.id = doc.id;
                    setValoresIniciais({ email: usuario.email, tipo: usuario.tipo, nome: usuario.nome, idade: usuario.idade, cpf: usuario.cpf, matricula: usuario.matricula, curso: usuario.curso, endereco: usuario.endereco, numero: usuario.numero, complemento: usuario.complemento, bairro: usuario.bairro, cidade: usuario.cidade, estado: usuario.estado, cep: usuario.cep });
                    setSucesso(true);
                });
            }).catch(function (error) {
                setSucesso(false);
                console.error("Erro ao carregar projetos!", error);
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
            <div className="visualizar ver-aluno">
                <h1>{valoresIniciais.nome}</h1>
                <hr />
                <table className="table">
                    <tbody>
                        <tr>
                            <th scope="row">Email</th>
                            <td>{valoresIniciais.email}</td>
                        </tr>
                        <tr>
                            <th scope="row">Idade</th>
                            <td>{valoresIniciais.idade}</td>
                        </tr>
                        <tr>
                            <th scope="row">CPF</th>
                            <td>{valoresIniciais.cpf}</td>
                        </tr>
                        <tr>
                            <th scope="row">Matrícula</th>
                            <td>{valoresIniciais.matricula}</td>
                        </tr>
                        <tr>
                            <th scope="row">Curso</th>
                            <td>{valoresIniciais.curso}</td>
                        </tr>
                        <tr>
                            <th scope="row">Endereço</th>
                            <td>{valoresIniciais.endereco}</td>
                        </tr>
                        <tr>
                            <th scope="row">Número</th>
                            <td>{valoresIniciais.numero}</td>
                        </tr>
                        <tr>
                            <th scope="row">Complemento</th>
                            <td>{valoresIniciais.complemento}</td>
                        </tr>
                        <tr>
                            <th scope="row">Bairro</th>
                            <td>{valoresIniciais.bairro}</td>
                        </tr>
                        <tr>
                            <th scope="row">Cidade</th>
                            <td>{valoresIniciais.cidade}</td>
                        </tr>
                        <tr>
                            <th scope="row">Estado</th>
                            <td>{valoresIniciais.estado}</td>
                        </tr>
                        <tr>
                            <th scope="row">CEP</th>
                            <td>{valoresIniciais.cep}</td>
                        </tr>
                        <tr>
                            <th scope="row">Participação em projetos</th>
                            <td>{
                                Object.keys(membros).map((key) => (
                                    <div key={key}>
                                        {projetos[membros[key].projeto].nome} ({membros[key].funcao})<br/>
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

export default VerAluno;