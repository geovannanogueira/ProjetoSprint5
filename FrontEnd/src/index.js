import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import App from './Login/App';
import categorias from './Categorias/App'
import lancamentos from './Lancamentos/App'

import { Route, Link, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";

import * as serviceWorker from './serviceWorker';
import { parseJwt } from './services/auth';
import Localizacao from './Mapa/Localizacao';

const RotaPrivada = ({component: Component}) => (
    <Route
        render ={ props =>
            localStorage.getItem("usuario-opflix") !== null && parseJwt().laranja === "Administrador" ?
            (
                <Component {...props}/>

            ) : (
                <Redirect
                    to={{pathname: "/", state: {from: props.location}}}
                />
            )
        }
    />
)

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={App}/>
                <RotaPrivada path='/categorias' component={categorias}/>
                <Route path='/lancamentos' component={lancamentos}/>
                <Route path='/localizacoes' component={Localizacao}/>

            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();