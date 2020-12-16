import React from 'react';
import { useRouteMatch } from 'react-router-dom';

/*
 * Página
 */
const EditarProjeto = () => {

    const { tipo, id } = useRouteMatch().params;

    return (
        <div className="editar-projeto">
            <h1>Editar projeto:</h1>
            <hr />
            <p>{tipo}</p>
            <p>{id}</p>
        </div>
    )
};

export default EditarProjeto;