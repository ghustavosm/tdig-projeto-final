import { useHistory } from 'react-router-dom';

const BotaoVoltar = ({component: Component, ...rest}) => {
    const history = useHistory();
    rest.inRow = rest.inRow !== undefined ? rest.inRow : true;
    return (
        rest.inRow ? (
            <div className="botao-voltar row">
                <div className="col">
                    <button type="button" className="btn btn-secondary btn-lg" onClick={() => { history.goBack() }}>Retornar</button>
                </div>
            </div>
        ) : (
            <button type="button" className="btn btn-secondary btn-lg" onClick={() => { history.goBack() }}>Retornar</button>
        )
    )
};

export default BotaoVoltar;