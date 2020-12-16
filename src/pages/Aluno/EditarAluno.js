import React from 'react';
import { useRouteMatch } from 'react-router-dom';

/*
 * Página
 */
const EditarAluno = () => {

    const { tipo, id } = useRouteMatch().params;

    return (
        <div className="editar-aluno">
            <h1>Editar aluno:</h1>
            <hr />
            <p>{tipo}</p>
            <p>{id}</p>
        </div>
    )
};

export default EditarAluno;