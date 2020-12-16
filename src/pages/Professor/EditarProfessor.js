import React from 'react';
import { useRouteMatch } from 'react-router-dom';

/*
 * Página
 */
const EditarProfessor = () => {

    const { tipo, id } = useRouteMatch().params;

    return (
        <div className="editar-professor">
            <h1>Editar professor:</h1>
            <hr />
            <p>{tipo}</p>
            <p>{id}</p>
        </div>
    )
};

export default EditarProfessor;