import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import firebaseDB from '../../services/Firebase';
import Carregando from '../../components/Carregando';
import BotaoVoltar from '../../components/BotaoVoltar';

/*
 * Página
 */
const VerProfessor = () => {

    var [membros, setMembros] = useState([]);
    var [projetos, setProjetos] = useState([]);
    const [sucesso, setSucesso] = useState(false);
    const [valoresIniciais, setValoresIniciais] = useState({ email: '', tipo: 'professor', nome: '', matricula: '', atuacao: '', formacao: '' });
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
                    setValoresIniciais({ email: usuario.email, tipo: usuario.tipo, nome: usuario.nome, matricula: usuario.matricula, atuacao: usuario.atuacao, formacao: usuario.formacao });
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
            <div className="visualizar ver-professor">
                <h1>{valoresIniciais.nome}</h1>
                <hr />
                <table className="table">
                    <tbody>
                    <tr>
                        <th scope="row">Email</th>
                            <td>{valoresIniciais.email}</td>
                        </tr>
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
                        <tr>
                            <th scope="row">Coordenação de projetos</th>
                            <td>{
                                Object.keys(membros).map((key) => (
                                    <div key={key}>
                                        {projetos[membros[key].projeto].nome} ({membros[key].funcao})<br />
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

export default VerProfessor;