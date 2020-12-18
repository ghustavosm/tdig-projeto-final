import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import firebaseDB from '../../services/Firebase';
import Mensagem from '../../components/Mensagem';
import FormularioVincularMembro from '../../pages/Projeto/FormularioVincularMembro';

/*
 * Página
 */
const Vincular = () => {

    const [usuarios, setUsuarios] = useState([]);
    const { tipo, id } = useRouteMatch().params;
    const [sucesso, setSucesso] = useState(false);
    let valoresIniciais = {};
    if (tipo === 'membro') {
        valoresIniciais = { projeto: '', usuario: id, funcao: '' };
    } else if (tipo === 'projeto') {
        valoresIniciais = { projeto: id, usuario: '', funcao: '' };
    } else {
        valoresIniciais = { projeto: '', usuario: '', funcao: '' };
    }

    const onSubmitError = (field, error, actions) => {
        console.info(error);
        actions.setStatus({ success: false });
        actions.setSubmitting(false);
        actions.setErrors({ submit: 'Existem erros no formulário!', [field]: error.message });
    }

    /*
     * Submissão do formulário
     */
    const onSubmit = (values, actions) => {
        setTimeout(() => {
            let membrosTabela = firebaseDB.firestore().collection('membros');
            firebaseDB.firestore().collection('usuarios').get().then((snapshot) => {
                let usuarios = [];
                snapshot.forEach(function (doc) {
                    usuarios[doc.id] = doc.data();
                });
                setUsuarios(usuarios);
                membrosTabela.where('projeto', '==', values.projeto).where('usuario', '==', values.usuario).get().then((snapshot) => {
                    if (snapshot.size >= 1) {
                        throw new Error('Este usuário já está vinculado ao projeto.');
                    } else {
                        membrosTabela.where('projeto', '==', values.projeto).where('funcao', '==', 'Coordenador').get().then((snapshot) => {
                            if (snapshot.size >= 1 && values.funcao === 'Coordenador') {
                                throw new Error('Este projeto já possui um coordenador cadastrado.');
                            } else if(usuarios[values.usuario].tipo === 'aluno' && values.funcao === 'Coordenador') {
                                throw new Error('Um aluno não pode coordenar um projeto.');
                            } else if(usuarios[values.usuario].tipo === 'professor' && values.funcao !== 'Coordenador') {
                                throw new Error('Um professor não pode assumir esta função.');
                            } else {
                                membrosTabela.add(values).then(() => {
                                    actions.resetForm({});
                                    actions.setStatus({ success: true, isValidating: false });
                                    actions.setSubmitting(false);
                                    console.log('Membro vinculado com sucesso!');
                                    setSucesso(true);
                                }).catch(() => {
                                    setSucesso(false);
                                    onSubmitError('submit', "Erro ao registrar no banco de dados.", actions);
                                });
                            }
                        }).catch((error) => {
                            setSucesso(false);
                            onSubmitError('funcao', error, actions);
                        });
                    }
                }).catch((error) => {
                    setSucesso(false);
                    onSubmitError('usuario', error, actions);
                });
            }).catch(function (error) {
                setSucesso(false);
                console.error("Erro ao carregar usuários!", error);
            });
        }, 400);
    }

    return (
        <div>
            { sucesso
                ? <Mensagem titulo="Vinculado com sucesso!" texto="O membro foi vinculado com sucesso ao projeto!" botaoAcao={{ acao: () => { setSucesso(false) }, nome: "Vincular outro membro" }} />
                : (
                    <div className="row">
                        <div className="centralizar col-8">
                            <FormularioVincularMembro titulo="Vincular membro ao projeto" valoresIniciais={valoresIniciais} textoBotao="Vincular" onSubmit={onSubmit} />
                        </div>
                    </div>
                )
            }
        </div>
    );

};

export default Vincular;