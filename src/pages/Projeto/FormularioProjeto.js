/* eslint-disable no-useless-escape */
import { Formik, ErrorMessage, Field } from 'formik';
import Yup from "../../helpers/Yup";

const FormularioAluno = ({component: Component, ...rest}) => {

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
  
    return (
      <div className="row">
        <div className="cadastrar-aluno col-8">
          <h1>{rest.titulo}</h1>
          <div className="form-container">
            <Formik
              enableReinitialize
              validationSchema={schema}
              initialStatus={{isValidating: false}}
              initialValues={rest.valoresIniciais}
              onSubmit={rest.onSubmit}
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

                  <div className="form-group">
                    <input type="submit" className="btn btn-primary" value={rest.textoBotao} disabled={isSubmitting} />
                    { errors.submit ? (<div className="alert alert-warning show" role="alert">{errors.submit}</div>) : ('') }
                  </div>
                  
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }

  export default FormularioAluno;