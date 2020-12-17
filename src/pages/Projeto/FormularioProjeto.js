/* eslint-disable no-useless-escape */
import { Formik, ErrorMessage, Field } from 'formik';
import Yup from "../../helpers/Yup";

const FormularioProjeto = ({component: Component, ...rest}) => {

    /*
     * Validação com Yup
     */  
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      descricao: Yup.string().required(),
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
                    <label htmlFor="nome">Nome do projeto*:</label>
                    <Field type="text" className={"form-control" + (touched.nome && errors.nome ? " field-error" : "")} id="nome" name="nome" placeholder="Nome do projeto" onBlur={handleBlur} onChange={handleChange} />
                    <ErrorMessage name="nome" className={"alert alert-warning" + (touched.nome && errors.nome ? " show" : " hide")} role="alert" component="div"/>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="descricao">Descrição*:</label>
                    <Field type="text" className={"form-control" + (touched.descricao && errors.descricao ? " field-error" : "")} id="descricao" name="descricao" placeholder="Descrição" onBlur={handleBlur} onChange={handleChange} />
                    <ErrorMessage name="descricao" className={"alert alert-warning" + (touched.descricao && errors.descricao ? " show" : " hide")} role="alert" component="div"/>
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

  export default FormularioProjeto;