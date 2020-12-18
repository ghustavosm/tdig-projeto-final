/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from 'react';
import firebaseDB from '../../services/Firebase';
import { Formik, ErrorMessage, Field } from 'formik';
import Yup from "../../helpers/Yup";
import Carregando from '../../components/Carregando';
import BotaoVoltar from '../../components/BotaoVoltar';
import { useRouteMatch } from 'react-router-dom';

const FormularioVincularMembro = ({ component: Component, ...rest }) => {

    const { tipo } = useRouteMatch().params;
    const [carregado, setCarregado] = useState(null);
    const [projetos, setProjetos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const funcoes = ['Estágio', 'Júnior', 'Pleno', 'Sênior', 'Master', 'Coordenador'];

    useEffect(() => {
        firebaseDB.firestore().collection('usuarios').orderBy('nome').get().then((snapshot) => {
            let usuarios = [];
            snapshot.forEach(function (doc) {
                usuarios[doc.id] = doc.data();
            });
            setUsuarios(usuarios);
            firebaseDB.firestore().collection('projetos').orderBy('nome').get().then((snapshot) => {
                let projetos = [];
                snapshot.forEach(function (doc) {
                    projetos[doc.id] = doc.data();
                });
                setProjetos(projetos);
                setCarregado(true);
            }).catch(function (error) {
                setCarregado(false);
                console.error("Erro ao carregar projetos!", error);
            });
        }).catch(function (error) {
            setCarregado(false);
            console.error("Erro ao carregar usuarios!", error);
        });
    }, []);

    /*
     * Validação com Yup
     */
    const schema = Yup.object().shape({
        projeto: Yup.string().required(),
        usuario: Yup.string().required(),
        funcao: Yup.string().required()
    });

    return (
        <div>
            { carregado
                ? (<div className="formulario">
                    <h1>{rest.titulo}</h1>
                    <div className="form-container">
                        <Formik
                            enableReinitialize
                            validationSchema={schema}
                            initialStatus={{ isValidating: false }}
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
                                        <label htmlFor="projeto">Projeto*</label>
                                        <Field as="select" className={"form-control" + (touched.projeto && errors.projeto ? " field-error" : "")} id="projeto" name="projeto" disabled={tipo === 'projeto'} onBlur={handleBlur} onChange={handleChange}>
                                            <option value="">Selecione</option>
                                            {Object.keys(projetos).map((key) => (
                                                <option value={key}>{projetos[key].nome}</option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="projeto" className={"alert alert-warning" + (touched.projeto && errors.projeto ? " show" : " hide")} role="alert" component="div" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="usuario">Usuário*</label>
                                        <Field as="select" className={"form-control" + (touched.usuario && errors.usuario ? " field-error" : "")} id="usuario" name="usuario" disabled={tipo === 'membro'} onBlur={handleBlur} onChange={handleChange}>
                                            <option value="">Selecione</option>
                                            {Object.keys(usuarios).map((key) => (
                                                <option value={key}>{usuarios[key].nome}</option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="usuario" className={"alert alert-warning" + (touched.usuario && errors.usuario ? " show" : " hide")} role="alert" component="div" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="funcao">Função*</label>
                                        <Field as="select" className={"form-control" + (touched.funcao && errors.funcao ? " field-error" : "")} id="funcao" name="funcao" onBlur={handleBlur} onChange={handleChange}>
                                            <option value="">Selecione</option>
                                            {Object.keys(funcoes).map((index) => (
                                                <option value={funcoes[index]}>{funcoes[index]}</option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="funcao" className={"alert alert-warning" + (touched.funcao && errors.funcao ? " show" : " hide")} role="alert" component="div" />
                                    </div>

                                    <div className="form-group">
                                        <input type="submit" className="btn btn-primary" value={rest.textoBotao} disabled={isSubmitting} />
                                        {errors.submit ? (<div className="alert alert-warning show" role="alert">{errors.submit}</div>) : ('')}
                                    </div>

                                </form>
                            )}
                        </Formik>
                    </div>
                    <BotaoVoltar setVoltarRoute="/listar/projetos" />
                </div>)
                : <Carregando />
            }
        </div>
    );
}

export default FormularioVincularMembro;