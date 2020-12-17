/* eslint-disable no-useless-escape */
import { Formik, ErrorMessage, Field } from 'formik';
import Yup from "../../helpers/Yup";

const FormularioProfessor = ({component: Component, ...rest}) => {

    /*
     * Validação com Yup
     */  
    const schema = Yup.object().shape({
      usuario: Yup.string().required(),
      senha: Yup.string().required(),
      nome: Yup.string().required(),
      matricula: Yup.string().required().min(9),
      atuacao: Yup.string().required(),
      formacao: Yup.string().required(),
    });
  
    return (
        <div className="formulario">
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
                    <Field type="password" className={"form-control" + (touched.senha && errors.senha ? " field-error" : "")} id="senha" name="senha" placeholder="Senha" onBlur={handleBlur} onChange={handleChange} />
                    <ErrorMessage name="senha" className={"alert alert-warning" + (touched.senha && errors.senha ? " show" : " hide")} role="alert" component="div"/>
                  </div>
  
                  <div className="form-group">
                    <label htmlFor="nome">Nome completo*:</label>
                    <Field type="text" className={"form-control" + (touched.nome && errors.nome ? " field-error" : "")} id="nome" name="nome" placeholder="Nome completo" onBlur={handleBlur} onChange={handleChange} />
                    <ErrorMessage name="nome" className={"alert alert-warning" + (touched.nome && errors.nome ? " show" : " hide")} role="alert" component="div"/>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="matricula">Matrícula*:</label>
                    <Field type="text" className={"form-control" + (touched.matricula && errors.matricula ? " field-error" : "")} id="matricula" name="matricula" placeholder="Matrícula" onBlur={handleBlur} onChange={handleChange} />
                    <ErrorMessage name="matricula" className={"alert alert-warning" + (touched.matricula && errors.matricula ? " show" : " hide")} role="alert" component="div"/>
                  </div>
  
                  <div className="form-group">
                    <label htmlFor="atuacao">Área de atuação*:</label>
                    <Field type="text" className={"form-control" + (touched.atuacao && errors.atuacao ? " field-error" : "")} id="atuacao" name="atuacao" placeholder="Área de atuação" onBlur={handleBlur} onChange={handleChange} />
                    <ErrorMessage name="atuacao" className={"alert alert-warning" + (touched.atuacao && errors.atuacao ? " show" : " hide")} role="alert" component="div"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="formacao">Formação*:</label>
                    <Field type="text" className={"form-control" + (touched.formacao && errors.formacao ? " field-error" : "")} id="formacao" name="formacao" placeholder="Formação" onBlur={handleBlur} onChange={handleChange} />
                    <ErrorMessage name="formacao" className={"alert alert-warning" + (touched.formacao && errors.formacao ? " show" : " hide")} role="alert" component="div"/>
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
    );
  }

  export default FormularioProfessor;