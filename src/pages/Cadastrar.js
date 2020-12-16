import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import CadastrarAluno from './Aluno/CadastrarAluno';
import CadastrarProfessor from './Professor/CadastrarProfessor';
import CadastrarProjeto from './Projeto/CadastrarProjeto';
import NaoEncontrada from './NaoEncontrada';

/*
 * Página
 */
const Cadastrar = () => {
    const { tipo } = useRouteMatch().params;
    if(tipo === 'aluno') {
        return <CadastrarAluno />
    } else if(tipo === 'professor') {
        return <CadastrarProfessor />
    }  else if(tipo === 'projeto') {
        return <CadastrarProjeto />
    } else {
        return <NaoEncontrada />
    }
};

export default Cadastrar;