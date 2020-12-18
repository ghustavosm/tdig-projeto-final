import React, { useState } from 'react';
import firebaseDB from '../../services/Firebase';
import Mensagem from '../../components/Mensagem';
import BotaoVoltar from '../../components/BotaoVoltar';
import FormularioProfessor from '../../pages/Professor/FormularioProfessor';

/*
 * Página
 */
const Cadastrar = () => {

  const [sucesso, setSucesso] = useState(false);  
  const valoresIniciais = { usuario: '', senha: '', tipo: 'professor', nome: '', matricula: '', atuacao: '', formacao: ''};
  
  const onSubmitError = (field, error, actions) => {
    console.info(error);
    actions.setStatus({success: false});
    actions.setSubmitting(false);
    actions.setErrors({submit: 'Existem erros no formulário!', [field]: error.message});
  }
  
  /*
   * Submissão do formulário
   */
  const onSubmit = (values, actions) => {
    let usuariosTabela = firebaseDB.firestore().collection('usuarios');
    setTimeout(() => {
      usuariosTabela.where('usuario', '==', values.usuario).get().then((snapshot) => {
        if(snapshot.size >= 1) {
          throw new Error('Já existe um cadastro com esse nome de usuario.');
        } else {
            usuariosTabela.where('matricula', '==', values.matricula).get().then((snapshot) => {
            if(snapshot.size >= 1) {
                throw new Error('Já existe um cadastro com essa matrícula.');
            } else {
                usuariosTabela.add(values).then(() => {
                actions.resetForm({});
                actions.setStatus({success: true, isValidating: false});
                actions.setSubmitting(false);
                console.log('Usuário cadastrado com sucesso!');
                setSucesso(true);
                }).catch(() => {
                setSucesso(false);
                onSubmitError('submit', "Erro ao registrar no banco de dados.", actions);
                });
            }
            }).catch((error) => {
                setSucesso(false);
                onSubmitError('matricula', error, actions);
            });
        }
      }).catch((error) => {
        setSucesso(false);
        onSubmitError('usuario', error, actions);
      });
    }, 400);
  }

  return (
    <div>
      { sucesso
          ? <Mensagem titulo="Cadastrado com sucesso!" texto="O professor foi cadastrado com sucesso!" botaoAcao={{acao: () => { setSucesso(false) }, nome: "Cadastrar outro professor"}} />
          : (
            <div className="row">
                <div className="centralizar col-8">
                    <FormularioProfessor titulo="Cadastrar professor" valoresIniciais={valoresIniciais} textoBotao="Cadastrar" onSubmit={onSubmit} />
                    <BotaoVoltar setVoltarRoute="/listar/professores" />
                </div>
            </div>
          )
      }
    </div>
  );
  
};

export default Cadastrar;