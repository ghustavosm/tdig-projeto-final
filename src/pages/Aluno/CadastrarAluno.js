/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import firebaseDB from '../../services/Firebase';
import { Formik, ErrorMessage, Field } from 'formik';
import Yup from "../../helpers/Yup";

/* Bloquear para apenas editar o próprio cadastro */

/*
 * Página
 */
const Cadastrar = () => {
  
  let [valoresIniciais, setValoresIniciais] = useState({ usuario: '', senha: '', nome: '', idade: '', cpf: '', matricula: '', curso: '', endereco: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', cep: ''});
  let { id } = useRouteMatch().params;
  let acao = (id === undefined ? 'Cadastrar' : 'Editar');

  useEffect(() => {
    let snapshot;
    if(acao === 'Editar') {
      snapshot = firebaseDB.firestore().collection('usuarios').doc(id).onSnapshot((doc) => {
        let usuario = doc.data();
        usuario.id = doc.id;
        setValoresIniciais({ usuario: usuario.usuario, senha: usuario.senha, nome: usuario.nome, idade: usuario.idade, cpf: usuario.cpf, matricula: usuario.matricula, curso: usuario.curso, endereco: usuario.endereco, numero: usuario.numero, complemento: usuario.complemento, bairro: usuario.bairro, cidade: usuario.cidade, estado: usuario.estado, cep: usuario.cep});
      });
    }
    return () => {
      snapshot && snapshot();
    }
  }, [id, acao]);

  /*
   * Validação com Yup
   */  
  const schema = Yup.object().shape({
    usuario: Yup.string().required(),
    senha: Yup.string().required(),
    nome: Yup.string().required(),
    idade: Yup.number().transform(value => isNaN(value) ? 0 : value).required().integer().min(17, 'Você deve ter mais que 16 anos'),
    cpf: Yup.string().required().matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'O CPF deve estar no formato 000.000.000-00'),
    matricula: Yup.string().required().min(9),
    curso: Yup.string().required(),
    endereco: Yup.string().required(),
    bairro: Yup.string().required(),
    cidade: Yup.string().required(),
    estado: Yup.string().required(),
    cep: Yup.string().required().matches(/^\d{5}\-\d{3}$/, 'O CEP deve estar no formato 00000-000')
  });
  
  const onSubmitError = (error, setSubmitting, setErrors, setStatus) => {
    alert(error.message);
    console.info(error);
    setStatus({success: false});
    setSubmitting(false);
    setErrors({submit: error.message});
  }
  
  /*
   * Submissão do formulário
   */
  const onSubmit = (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
    let usuariosTabela = firebaseDB.firestore().collection('usuarios');
    if(acao === 'Cadastrar') {
      setTimeout(() => {
        usuariosTabela.where('usuario', '==', values.usuario).get().then((snapshot) => {
          if(snapshot.size >= 1) {
            throw new Error('Erro ao cadastrar! Já existe um usuário cadastrado com esse nome de usuario.');
          } else {
            usuariosTabela.where('cpf', '==', values.cpf).get().then((snapshot) => {
              if(snapshot.size >= 1) {
                throw new Error('Erro ao cadastrar! Já existe um usuário cadastrado com esse CPF.');
              } else {
                usuariosTabela.where('matricula', '==', values.matricula).get().then((snapshot) => {
                  if(snapshot.size >= 1) {
                    throw new Error('Erro ao cadastrar! Já existe um usuário cadastrado com essa matrícula.');
                  } else {
                    usuariosTabela.add(values).then(() => {
                      resetForm({});
                      setStatus({success: true, isValidating: false});
                      setSubmitting(false);
                      alert('Usuário cadastrado com sucesso!');
                    }).catch((error) => {
                      onSubmitError(error, setSubmitting, setErrors, setStatus);
                    });
                  }
                }).catch((error) => {
                  onSubmitError(error, setSubmitting, setErrors, setStatus);
                });
              }
            }).catch((error) => {
              onSubmitError(error, setSubmitting, setErrors, setStatus);
            });
          }
        }).catch((error) => {
          onSubmitError(error, setSubmitting, setErrors, setStatus);
        });
      }, 400);
    } else {
      setTimeout(() => {
        usuariosTabela.where('usuario', '==', values.usuario).get().then((snapshot) => {
          let docId = '';
          snapshot.forEach(function(doc) {
            docId = doc.id;
          });
          if(snapshot.size >= 1 && id !== docId) {
            throw new Error('Erro ao cadastrar! Já existe um usuário cadastrado com esse nome de usuario.');
          } else {
            usuariosTabela.where('cpf', '==', values.cpf).get().then((snapshot) => {
              let docId = '';
              snapshot.forEach(function(doc) {
                docId = doc.id;
              });
              if(snapshot.size >= 1 && id !== docId) {
                throw new Error('Erro ao cadastrar! Já existe um usuário cadastrado com esse CPF.');
              } else {
                usuariosTabela.where('matricula', '==', values.matricula).get().then((snapshot) => {
                  let docId = '';
                  snapshot.forEach(function(doc) {
                    docId = doc.id;
                  });
                  if(snapshot.size >= 1 && id !== docId) {
                    throw new Error('Erro ao cadastrar! Já existe um usuário cadastrado com essa matrícula.');
                  } else {
                    usuariosTabela.doc(id).set(values).then(() => {  
                      setStatus({success: true, isValidating: false});
                      setSubmitting(false);
                      alert('Cadastro atualizado com sucesso!');                      
                    }).catch((error) => {
                      onSubmitError(error, setSubmitting, setErrors, setStatus);
                    });
                  }
                }).catch((error) => {
                  onSubmitError(error, setSubmitting, setErrors, setStatus);
                });
              }
            }).catch((error) => {
              onSubmitError(error, setSubmitting, setErrors, setStatus);
            });
          }
        }).catch((error) => {
          onSubmitError(error, setSubmitting, setErrors, setStatus);
        });
      }, 400);      
    }
  }

  return (
    <div className="row">
      <div className="cadastrar-aluno col-8">
        <h1>{acao} aluno</h1>
        <div className="form-container">
          <Formik
            enableReinitialize
            validationSchema={schema}
            initialStatus={{isValidating: false}}
            initialValues={valoresIniciais}
            onSubmit={onSubmit}
          >
            {({ 
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
              <form onSubmit={handleSubmit}>

                <div className="form-group">
                  <label htmlFor="usuario">Nome de usuario*:</label>
                  <Field type="text" className={"form-control" + (touched.usuario && errors.usuario ? " field-error" : "")} id="usuario" name="usuario" placeholder="Nome de usuário" onBlur={handleBlur} onChange={handleChange} />
                  <ErrorMessage name="usuario" className={"alert alert-warning" + (touched.usuario && errors.usuario ? " show" : " hide")} role="alert" component="div"/>
                </div>

                <div className="form-group">
                  <label htmlFor="senha">Senha*:</label>
                  <Field type="text" className={"form-control" + (touched.senha && errors.senha ? " field-error" : "")} id="senha" name="senha" placeholder="Senha" onBlur={handleBlur} onChange={handleChange} />
                  <ErrorMessage name="senha" className={"alert alert-warning" + (touched.senha && errors.senha ? " show" : " hide")} role="alert" component="div"/>
                </div>

                <div className="form-group">
                  <label htmlFor="nome">Nome completo*:</label>
                  <Field type="text" className={"form-control" + (touched.nome && errors.nome ? " field-error" : "")} id="nome" name="nome" placeholder="Nome completo" onBlur={handleBlur} onChange={handleChange} />
                  <ErrorMessage name="nome" className={"alert alert-warning" + (touched.nome && errors.nome ? " show" : " hide")} role="alert" component="div"/>
                </div>

                <div className="form-group">
                  <label htmlFor="idade">Idade*:</label>
                  <Field type="text" className={"form-control" + (touched.idade && errors.idade ? " field-error" : "")} id="idade" name="idade" placeholder="Idade" onBlur={handleBlur} onChange={handleChange} />
                  <ErrorMessage name="idade" className={"alert alert-warning" + (touched.idade && errors.idade ? " show" : " hide")} role="alert" component="div"/>
                </div>

                <div className="form-group">
                  <label htmlFor="cpf">CPF*:</label>
                  <Field type="text" className={"form-control" + (touched.cpf && errors.cpf ? " field-error" : "")} id="cpf" name="cpf" placeholder="CPF" onBlur={handleBlur} onChange={handleChange} />
                  <ErrorMessage name="cpf" className={"alert alert-warning" + (touched.cpf && errors.cpf ? " show" : " hide")} role="alert" component="div"/>
                </div>
                
                <div className="form-group">
                  <label htmlFor="matricula">Matrícula*:</label>
                  <Field type="text" className={"form-control" + (touched.matricula && errors.matricula ? " field-error" : "")} id="matricula" name="matricula" placeholder="Matrícula" onBlur={handleBlur} onChange={handleChange} />
                  <ErrorMessage name="matricula" className={"alert alert-warning" + (touched.matricula && errors.matricula ? " show" : " hide")} role="alert" component="div"/>
                </div>

                <div className="form-group">
                  <label htmlFor="curso">Curso*:</label>
                  <Field type="text" className={"form-control" + (touched.curso && errors.curso ? " field-error" : "")} id="curso" name="curso" placeholder="Curso" onBlur={handleBlur} onChange={handleChange} />
                  <ErrorMessage name="curso" className={"alert alert-warning" + (touched.curso && errors.curso ? " show" : " hide")} role="alert" component="div"/>
                </div>

                <div className="form-group">
                  <label htmlFor="endereco">Endereço*:</label>
                  <Field type="text" className={"form-control" + (touched.endereco && errors.endereco ? " field-error" : "")} id="endereco" name="endereco" placeholder="Endereço" onBlur={handleBlur} onChange={handleChange} />
                  <ErrorMessage name="endereco" className={"alert alert-warning" + (touched.endereco && errors.endereco ? " show" : " hide")} role="alert" component="div"/>
                </div>

                <div className="form-group">
                  <label htmlFor="numero">Número:</label>
                  <Field type="text" className={"form-control" + (touched.numero && errors.numero ? " field-error" : "")} id="numero" name="numero" placeholder="Número" onBlur={handleBlur} onChange={handleChange} />
                  <ErrorMessage name="numero" className={"alert alert-warning" + (touched.numero && errors.numero ? " show" : " hide")} role="alert" component="div"/>
                </div>

                <div className="form-group">
                  <label htmlFor="complemento">Complemento:</label>
                  <Field type="text" className={"form-control" + (touched.complemento && errors.complemento ? " field-error" : "")} id="complemento" name="complemento" placeholder="Complemento" onBlur={handleBlur} onChange={handleChange} />
                  <ErrorMessage name="complemento" className={"alert alert-warning" + (touched.complemento && errors.complemento ? " show" : " hide")} role="alert" component="div"/>
                </div>

                <div className="form-group">
                  <label htmlFor="bairro">Bairro*:</label>
                  <Field type="text" className={"form-control" + (touched.bairro && errors.bairro ? " field-error" : "")} id="bairro" name="bairro" placeholder="Bairro" onBlur={handleBlur} onChange={handleChange} />
                  <ErrorMessage name="bairro" className={"alert alert-warning" + (touched.bairro && errors.bairro ? " show" : " hide")} role="alert" component="div"/>
                </div>

                <div className="form-group">
                  <label htmlFor="cidade">Cidade*:</label>
                  <Field type="text" className={"form-control" + (touched.cidade && errors.cidade ? " field-error" : "")} id="cidade" name="cidade" placeholder="Cidade" onBlur={handleBlur} onChange={handleChange} />
                  <ErrorMessage name="cidade" className={"alert alert-warning" + (touched.cidade && errors.cidade ? " show" : " hide")} role="alert" component="div"/>
                </div>

                <div className="form-group">
                  <label htmlFor="estado">Estado*</label>
                  <Field as="select" className={"form-control" + (touched.estado && errors.estado ? " field-error" : "")} id="estado" name="estado"  onBlur={handleBlur} onChange={handleChange}>
                    <option value="">Selecione</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </Field>
                  <ErrorMessage name="estado" className={"alert alert-warning" + (touched.estado && errors.estado ? " show" : " hide")} role="alert" component="div"/>
                </div>

                <div className="form-group">
                  <label htmlFor="cep">CEP*:</label>
                  <Field type="text" className={"form-control" + (touched.cep && errors.cep ? " field-error" : "")} id="cep" name="cep" placeholder="CEP" onBlur={handleBlur} onChange={handleChange} />
                  <ErrorMessage name="cep" className={"alert alert-warning" + (touched.cep && errors.cep ? " show" : " hide")} role="alert" component="div"/>
                </div>

                <input type="submit" className="btn btn-primary" value={acao} disabled={isSubmitting} />
                
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
};

export default Cadastrar;