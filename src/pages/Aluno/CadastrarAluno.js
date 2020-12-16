/* eslint-disable no-useless-escape */
import React from 'react';
import firebaseDB from '../../services/Firebase';
import { Formik, ErrorMessage, Field } from 'formik';
import Yup from "../../helpers/Yup";
import { useRouteMatch } from 'react-router-dom'

/*
 * Página
 */
const Cadastrar = () => {

  const { tipo } = useRouteMatch().params;

  console.log(tipo);

  let alunos = firebaseDB.firestore().collection('alunos');

  /*
   * Validação com Yup
   */  
  const schema = Yup.object().shape({
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
    setTimeout(() => {
      alunos.where('cpf', '==', values.cpf).get().then((snapshot) => {
        if(snapshot.size >= 1) {
          throw new Error('Erro ao cadastrar! Já existe um aluno cadastrado com esse CPF.');
        } else {
          alunos.add(values).then(() => {
            alert('Aluno cadastrado com sucesso!');
            resetForm({})
            setStatus({success: true})
          }).catch((error) => {
            onSubmitError(error, setSubmitting, setErrors, setStatus);
          });
        }
      }).catch((error) => {
        onSubmitError(error, setSubmitting, setErrors, setStatus);
      });
    }, 400);
  }

  return (
    <Formik
      validationSchema={schema}
      initialStatus={{isValidating: false}}
      initialValues={{ nome: '', idade: '', cpf: '', matricula: '', curso: '', endereco: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', cep: ''}}
      onSubmit={onSubmit}
    >
      {({
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
        <form onSubmit={handleSubmit}>
          <legend>Cadastro de Aluno</legend>
          <label>
            Nome completo*:
            <Field type="text" name="nome"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </label>
          <ErrorMessage name="nome" className="error" component="span"/>
          <label>
            Idade*:
            <Field type="text" name="idade"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </label>
          <ErrorMessage name="idade" className="error" component="span"/>
          <label>
            CPF*:
            <Field type="text" name="cpf"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </label>
          <ErrorMessage name="cpf" className="error" component="span" />
          <label>
            Matrícula*:
            <Field type="text" name="matricula"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </label>
          <ErrorMessage name="matricula" className="error" component="span" />
          <label>
            Curso*:
            <Field type="text" name="curso"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </label>
          <ErrorMessage name="curso" className="error" component="span" />
          <label>
            Endereço*:
            <Field type="text" name="endereco"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </label>
          <ErrorMessage name="endereco" className="error" component="span" />
          <label>
            Número:
            <Field type="text" name="numero"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </label>
          <ErrorMessage name="numero" className="error" component="span" />
          <label>
            Complemento:
            <Field type="text" name="complemento"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </label>
          <ErrorMessage name="complemento" className="error" component="span" />
          <label>
            Bairro*:
            <Field type="text" name="bairro"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </label>
          <ErrorMessage name="bairro" className="error" component="span" />
          <label>
            Cidade*:
            <Field type="text" name="cidade"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </label>
          <ErrorMessage name="cidade" className="error" component="span" />
          <label>
            Estado*:
            <Field as="select" name="estado"
                   onBlur={handleBlur}
                   onChange={handleChange}>
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
          </label>
          <ErrorMessage name="estado" className="error" component="span" />
          <label>
            CEP*:
            <Field type="text" name="cep"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </label>
          <ErrorMessage name="cep" className="error" component="span" />
          <input type="submit" value="Cadastrar" disabled={isSubmitting}/>
        </form>
      )}
    </Formik>
  )
};

export default Cadastrar;