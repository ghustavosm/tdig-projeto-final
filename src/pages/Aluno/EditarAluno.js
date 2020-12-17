import React from 'react';
import CadastrarAluno from './CadastrarAluno';

/*
 * Página
 */
const EditarAluno = ({component: Component, ...rest}) => {
    return (
        <CadastrarAluno
            {...rest}
            render={props => {
                    return <Component {...props} />
                }
            }
        />
    );
};

export default EditarAluno;