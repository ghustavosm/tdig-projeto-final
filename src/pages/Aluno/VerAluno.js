import React from 'react';
import { useRouteMatch } from 'react-router-dom';

/*
 * Página
 */
const VerAluno = () => {

    const { tipo, id } = useRouteMatch().params;

    return (
        <div className="ver-aluno">
            <h1>Ver aluno:</h1>
            <hr />
            <p>{tipo}</p>
            <p>{id}</p>
        </div>
    )
};

export default VerAluno;