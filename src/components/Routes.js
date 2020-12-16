import React from 'react';
import Navbar from './Navbar';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Home from '../pages/Home';
import Ver from '../pages/Ver';
import Listar from '../pages/Listar';
import Cadastrar from '../pages/Cadastrar';
import Editar from '../pages/Editar';
import Remover from '../pages/Remover';
import Sobre from '../pages/Sobre';
import NaoEncontrada from '../pages/NaoEncontrada';
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
            <Navbar />
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
        </Router>
    );
}

export default Routes;