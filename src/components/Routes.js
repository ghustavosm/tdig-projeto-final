import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Login, Logout, Home, Ver, Listar, Cadastrar, Editar, Remover, Sobre, NaoEncontrada } from '../pages';
import { isAuthenticated } from './Auth';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => {

                let liberaCadastrar = false;
                const pathname = props.location.pathname;
                if(pathname === '/cadastrar/aluno' || pathname === '/cadastrar/professor') {
                    liberaCadastrar = true;
                }

                let redirecionaLogin = true;
                if(isAuthenticated() || (!isAuthenticated() && liberaCadastrar)) {
                    redirecionaLogin = false;
                }

                return (
                    redirecionaLogin ? (
                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    ) : (
                        <Component {...props} />
                    )
                )
            }
        }
    />
);

const Routes = () => {
    return (    
        <Router>
            <Header />
            <section className="section main">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Switch>
                                <PrivateRoute exact path="/" component={() => <Home />} />
                                <PrivateRoute path="/ver/:tipo/:id" component={() => <Ver />} />
                                <PrivateRoute path="/listar/:tipo" component={() => <Listar />} />
                                <PrivateRoute path="/editar/:tipo/:id" component={() => <Editar />} />
                                <PrivateRoute path="/remover/:tipo/:id" component={() => <Remover />} />                              
                                <PrivateRoute path="/cadastrar/:tipo" component={() => <Cadastrar />} />
                                <PrivateRoute path="/sobre" component={() => <Sobre />} />                                
                                <Route path="/login" component={() => <Login />} />
                                <Route path="/logout" component={() => <Logout />} />
                                <Route path="*" component={() => <NaoEncontrada />} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </Router>
    );
}

export default Routes;