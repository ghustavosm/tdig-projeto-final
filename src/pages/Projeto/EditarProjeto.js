import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import firebaseDB from '../../services/Firebase';
import Mensagem from '../../components/Mensagem';
import BotaoVoltar from '../../components/BotaoVoltar';
import FormularioProjeto from '../../pages/Projeto/FormularioProjeto';
import Carregando from '../../components/Carregando';

/*
 * Página
 */
const Editar = () => {

    const [sucesso, setSucesso] = useState(false);
    const [carregado, setCarregado] = useState(false);
    const [valoresIniciais, setValoresIniciais] = useState({ nome: '', descricao: '' });
    const { id } = useRouteMatch().params;

    useEffect(() => {
        let snapshot;
        snapshot = firebaseDB.firestore().collection('projetos').doc(id).onSnapshot((doc) => {
            let projeto = doc.data();
            projeto.id = doc.id;
            setValoresIniciais({ nome: projeto.nome, descricao: projeto.descricao });
            setCarregado(true);
        });
        return () => {
            snapshot && snapshot();
        }
    }, [id]);

    const onSubmitError = (field, error, actions) => {
        console.info(error);
        actions.setStatus({ success: false });
        actions.setSubmitting(false);
        actions.setErrors({ submit: 'Existem erros no formulário!', [field]: error.message });
    }

    const onSubmit = (values, actions) => {
        let projetosTabela = firebaseDB.firestore().collection('projetos');
        setTimeout(() => {
            projetosTabela.where('nome', '==', values.nome).get().then((snapshot) => {
                let docId = '';
                snapshot.forEach(function (doc) {
                    docId = doc.id;
                });
                if (snapshot.size >= 1 && id !== docId) {
                    throw new Error('Já existe um cadastro com esse nome.');
                } else {
                    projetosTabela.doc(id).set(values).then(() => {
                        actions.setStatus({ success: true, isValidating: false });
                        actions.setSubmitting(false);
                        console.log('Cadastro atualizado com sucesso!');
                        setSucesso(true);
                    }).catch(() => {
                        setSucesso(false);
                        onSubmitError('submit', "Erro ao registrar no banco de dados.", actions);
                    });
                }
            }).catch((error) => {
                setSucesso(false);
                onSubmitError('nome', error, actions);
            });
        }, 400);
    }

    return (
        <div>
            { sucesso
                ? <Mensagem titulo="Atualizado com sucesso!" texto="O projeto foi atualizado com sucesso!" botaoAcao={{ acao: () => { setSucesso(false) }, nome: "Editar novamente" }} />
                : carregado
                    ? (
                        <div className="row">
                            <div className="centralizar col-8">
                                <FormularioProjeto titulo="Editar projeto" valoresIniciais={valoresIniciais} textoBotao="Editar" onSubmit={onSubmit} />
                                <BotaoVoltar />
                            </div>
                        </div>
                    )
                    : <Carregando />
            }
        </div>
    );

};

export default Editar;