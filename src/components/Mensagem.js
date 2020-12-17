import BotaoVoltar from './BotaoVoltar';

const Mensagem = ({component: Component, ...rest}) => {
    const titulo = rest.titulo;
    const texto = rest.texto;
    return (
    <div className="mensagem">
        <h1>{titulo}</h1>
        <hr />
        <p>{texto}</p>
        { rest.botaoAcao ? 
            <button type="button" className="btn btn-primary btn-lg" onClick={ rest.botaoAcao.acao }>{ rest.botaoAcao.nome }</button>
         : '' }
        <BotaoVoltar inRow={false} />
    </div>
    )
};

export default Mensagem;