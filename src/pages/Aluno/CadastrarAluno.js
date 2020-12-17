import React, { useState } from 'react';
import firebaseDB from '../../services/Firebase';
import Mensagem from '../../components/Mensagem';
import BotaoVoltar from '../../components/BotaoVoltar';
import FormularioAluno from '../../pages/Aluno/FormularioAluno';

/*
 * Página
 */
const Cadastrar = () => {

  const [sucesso, setSucesso] = useState(false);  
  const valoresIniciais = { usuario: '', senha: '', tipo: 'aluno', nome: '', idade: '', cpf: '', matricula: '', curso: '', endereco: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', cep: ''};
  
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
          usuariosTabela.where('cpf', '==', values.cpf).get().then((snapshot) => {
            if(snapshot.size >= 1) {
              throw new Error('Já existe um cadastro com esse CPF.');
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
            onSubmitError('cpf', error, actions);
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
          ? <Mensagem titulo="Cadastrado com sucesso!" texto="O aluno foi cadastrado com sucesso!" botaoAcao={{acao: () => { setSucesso(false) }, nome: "Cadastrar outro aluno"}} />
          : (
            <div className="row">
                <div className="centralizar col-8">
                    <FormularioAluno titulo="Cadastrar aluno" valoresIniciais={valoresIniciais} textoBotao="Cadastrar" onSubmit={onSubmit} />
                    <BotaoVoltar />
                </div>
            </div>
          )
      }
    </div>
  );
  
};

export default Cadastrar;