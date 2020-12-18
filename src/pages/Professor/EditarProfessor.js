import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import firebaseDB from '../../services/Firebase';
import Mensagem from '../../components/Mensagem';
import BotaoVoltar from '../../components/BotaoVoltar';
import FormularioProfessor from '../../pages/Professor/FormularioProfessor';
import Carregando from '../../components/Carregando';

/*
 * Página
 */
const Editar = () => {
  
  const [sucesso, setSucesso] = useState(false);
  const [carregado, setCarregado] = useState(false);  
  const [valoresIniciais, setValoresIniciais] = useState({ usuario: '', senha: '', tipo: 'professor', nome: '', matricula: '', atuacao: '', formacao: ''});
  const { id } = useRouteMatch().params;

  useEffect(() => {
    let snapshot;
    snapshot = firebaseDB.firestore().collection('usuarios').doc(id).onSnapshot((doc) => {
        let usuario = doc.data();
        usuario.id = doc.id;        
        setValoresIniciais({ usuario: usuario.usuario, senha: usuario.senha, tipo: usuario.tipo, nome: usuario.nome, matricula: usuario.matricula, atuacao: usuario.atuacao, formacao: usuario.formacao});
        setCarregado(true);
    });    
    return () => {
      snapshot && snapshot();
    }
  }, [id]);
  
  const onSubmitError = (field, error, actions) => {
    console.info(error);
    actions.setStatus({success: false});
    actions.setSubmitting(false);
    actions.setErrors({submit: 'Existem erros no formulário!', [field]: error.message});
  }
  
  const onSubmit = (values, actions) => {
    let usuariosTabela = firebaseDB.firestore().collection('usuarios');
      setTimeout(() => {
        usuariosTabela.where('usuario', '==', values.usuario).get().then((snapshot) => {
          let docId = '';
          snapshot.forEach(function(doc) {
            docId = doc.id;
          });
          if(snapshot.size >= 1 && id !== docId) {
            throw new Error('Já existe um cadastro com esse nome de usuario.');
          } else {
            usuariosTabela.where('matricula', '==', values.matricula).get().then((snapshot) => {
                let docId = '';
                snapshot.forEach(function(doc) {
                docId = doc.id;
                });
                if(snapshot.size >= 1 && id !== docId) {
                throw new Error('Já existe um cadastro com essa matrícula.');
                } else {
                usuariosTabela.doc(id).set(values).then(() => {  
                    actions.setStatus({success: true, isValidating: false});
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
          ? <Mensagem titulo="Atualizado com sucesso!" texto="O professor foi atualizado com sucesso!" botaoAcao={{acao: () => { setSucesso(false) }, nome: "Editar novamente"}} />
          : carregado
            ? (
                <div className="row">
                    <div className="centralizar col-8">
                        <FormularioProfessor titulo="Editar professor" valoresIniciais={valoresIniciais} textoBotao="Editar" onSubmit={onSubmit} />
                        <BotaoVoltar setVoltarRoute="/listar/professores" />
                    </div>
                </div>
            )
            : <Carregando />
      }
    </div>
  );
  
};

export default Editar;