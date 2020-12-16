import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import EditarAluno from './Aluno/EditarAluno';
import EditarProfessor from './Professor/EditarProfessor';
import EditarProjeto from './Projeto/EditarProjeto';
import NaoEncontrada from './NaoEncontrada';

/*
 * Página
 */
const Editar = () => {
    const { tipo } = useRouteMatch().params;
    if(tipo === 'aluno') {
        return <EditarAluno />
    } else if(tipo === 'professor') {
        return <EditarProfessor />
    }  else if(tipo === 'projeto') {
        return <EditarProjeto />
    } else {
        return <NaoEncontrada />
    }
};

export default Editar;