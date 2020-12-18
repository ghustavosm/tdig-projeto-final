import { useHistory } from 'react-router-dom';

const BotaoVoltar = ({component: Component, ...rest}) => {
    const history = useHistory();
    rest.inRow = rest.inRow !== undefined ? rest.inRow : true;
    
    let voltarRoute = () => {
        rest.setVoltarRoute ? history.push(rest.setVoltarRoute) : history.goBack()
    };

    return (
        rest.inRow ? (
            <div className="botao-voltar row">
                <div className="col">
                    <button type="button" className="btn btn-secondary btn-lg" onClick={() => { voltarRoute() }}>Retornar</button>
                </div>
            </div>
        ) : (
            <button type="button" className="btn btn-secondary btn-lg" onClick={() => { voltarRoute() }}>Retornar</button>
        )
    )
};

export default BotaoVoltar;