import React from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import Yup from "../helpers/Yup";

/*
 * Página
 */
const Login = () => {

  let valoresIniciais = { usuario: '', senha: ''};

  /*
    * Validação com Yup
    */
  const schema = Yup.object().shape({
    usuario: Yup.string().required(),
    senha: Yup.string().required(),
  });

  const onSubmitError = (field, error, actions) => {
    console.info(error);
    actions.setStatus({ success: false });
    actions.setSubmitting(false);
    actions.setErrors({ submit: 'Existem erros no formulário!', [field]: error.message });
  }

  const onSubmit = (values, actions) => {
    setTimeout(() => {

    }, 400);
  }

  return (
    <div className="login row">
      <div className="formulario centralizar col-5">
        <h1>Login</h1>
        <div className="form-container">
          <Formik
            enableReinitialize
            validationSchema={schema}
            initialStatus={{ isValidating: false }}
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
                  <label htmlFor="usuario">Usuario*:</label>
                  <Field type="text" className={"form-control" + (touched.usuario && errors.usuario ? " field-error" : "")} id="usuario" name="usuario" placeholder="Usuário" onBlur={handleBlur} onChange={handleChange} />
                  <ErrorMessage name="usuario" className={"alert alert-warning" + (touched.usuario && errors.usuario ? " show" : " hide")} role="alert" component="div" />
                </div>

                <div className="form-group">
                  <label htmlFor="senha">Senha*:</label>
                  <Field type="password" className={"form-control" + (touched.senha && errors.senha ? " field-error" : "")} id="senha" name="senha" placeholder="Senha" onBlur={handleBlur} onChange={handleChange} />
                  <ErrorMessage name="senha" className={"alert alert-warning" + (touched.senha && errors.senha ? " show" : " hide")} role="alert" component="div" />
                </div>

                <div className="form-group">
                  <input type="submit" className="btn btn-primary" value="Logar" disabled={isSubmitting} />
                  {errors.submit ? (<div className="alert alert-warning show" role="alert">{errors.submit}</div>) : ('')}
                </div>

              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
};

export default Login;