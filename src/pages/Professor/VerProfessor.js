import React from 'react';
import { useRouteMatch } from 'react-router-dom';

/*
 * Página
 */
const VerProfessor = () => {

    const { tipo, id } = useRouteMatch().params;

    return (
        <div className="ver-projeto">
            <h1>Ver professor:</h1>
            <hr />
            <p>{tipo}</p>
            <p>{id}</p>
        </div>
    )
};

export default VerProfessor;