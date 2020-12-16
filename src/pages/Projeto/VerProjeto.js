import React from 'react';
import { useRouteMatch } from 'react-router-dom';

/*
 * Página
 */
const VerProjeto = () => {

    const { tipo, id } = useRouteMatch().params;

    return (
        <div className="ver-projeto">
            <h1>Ver projeto:</h1>
            <hr />
            <p>{tipo}</p>
            <p>{id}</p>
        </div>
    )
};

export default VerProjeto;