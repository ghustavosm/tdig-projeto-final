import React from 'react';
import { useRouteMatch } from 'react-router-dom';

/*
 * Página
 */
const CadastrarProfessor = () => {

    const { tipo } = useRouteMatch().params;

    return (
        <div className="cadastrar-professor">
            <h1>Cadastrar professor:</h1>
            <hr />
            <p>{tipo}</p>
        </div>
    )
};

export default CadastrarProfessor;