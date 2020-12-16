import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import VerAluno from './Aluno/VerAluno';
import VerProfessor from './Professor/VerProfessor';
import VerProjeto from './Projeto/VerProjeto';
import NotFound from './NaoEncontrada';

/*
 * Página
 */
const Ver = () => {
    const { tipo } = useRouteMatch().params;
    if(tipo === 'aluno') {
        return <VerAluno />
    } else if(tipo === 'professor') {
        return <VerProfessor />
    }  else if(tipo === 'projeto') {
        return <VerProjeto />
    } else {
        return <NotFound />
    }
};

export default Ver;