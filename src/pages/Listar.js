import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import ListarAlunos from './Aluno/ListarAlunos';
import ListarProfessores from './Professor/ListarProfessores';
import ListarProjetos from './Projeto/ListarProjetos';
import ListarMembros from './Projeto/ListarMembros';
import NaoEncontrada from './NaoEncontrada';

/*
 * Página
 */
const Listar = () => {
    const { tipo } = useRouteMatch().params;
    if(tipo === 'alunos') {
        return <ListarAlunos />
    } else if(tipo === 'professores') {
        return <ListarProfessores />
    } else if(tipo === 'projetos') {
        return <ListarProjetos />
    } else if(tipo === 'membros') {
        return <ListarMembros />
    } else {
        return <NaoEncontrada />
    }
};

export default Listar;