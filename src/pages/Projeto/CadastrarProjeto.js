import React, { useState } from 'react';
import firebaseDB from '../../services/Firebase';
import Mensagem from '../../components/Mensagem';
import BotaoVoltar from '../../components/BotaoVoltar';
import FormularioProjeto from '../../pages/Projeto/FormularioProjeto';

/*
 * Página
 */
const Cadastrar = () => {

    const [sucesso, setSucesso] = useState(false);
    const valoresIniciais = { nome: '', descricao: '' };

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
        let projetosTabela = firebaseDB.firestore().collection('projetos');
        setTimeout(() => {
            projetosTabela.add(values).then(() => {
                actions.resetForm({});
                actions.setStatus({ success: true, isValidating: false });
                actions.setSubmitting(false);
                console.log('Projeto cadastrado com sucesso!');
                setSucesso(true);
            }).catch(() => {
                setSucesso(false);
                onSubmitError('submit', "Erro ao registrar no banco de dados.", actions);
            });
        }, 400);
    }

    return (
        <div>
            { sucesso
                ? <Mensagem titulo="Cadastrado com sucesso!" texto="O projeto foi cadastrado com sucesso!" botaoAcao={{ acao: () => { setSucesso(false) }, nome: "Cadastrar outro projeto" }} />
                : (
                    <div className="row">
                        <div className="centralizar col-8">
                            <FormularioProjeto titulo="Cadastrar projeto" valoresIniciais={valoresIniciais} textoBotao="Cadastrar" onSubmit={onSubmit} />
                            <BotaoVoltar setVoltarRoute="/listar/projetos" />
                        </div>
                    </div>
                )
            }
        </div>
    );

};

export default Cadastrar;