import React from 'react';
import { useRouteMatch } from 'react-router-dom';

/*
 * Página
 */
const CadastrarProjeto = () => {

    const { tipo } = useRouteMatch().params;

    return (
        <div className="cadastrar-projeto">
            <h1>Cadastrar projeto:</h1>
            <hr />
            <p>{tipo}</p>
        </div>
    )
};

export default CadastrarProjeto;