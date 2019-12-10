import React from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios'

import { parseJwt } from '../services/auth.js'
import logo from '../assets/Logos/vermelho.png';
import '../Lancamentos/lancamentos.css';

export default class Lancamentos extends React.Component {

    constructor() {
        super()
        this.state = {
            lista: [],
            emailUsuario: null
        }
    }

    componentDidMount() {
        this.listarLancamentos();
        this.setState({ emailUsuario: parseJwt().nomeUsuario })
    }

    listarLancamentos = () => {
        Axios.get('http://192.168.3.14:5000/api/lancamentos', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-opflix') }
        })
            .then(response => {
                this.setState({ lista: response.data })
                console.log({ lista: response.data })
            })
    }

    render() {
        return (
            <div className="Appl">
                <header className="container">
                    <img  id="logotipo" src={logo} />
                    {/* <nav className="barra_nav"> */}
                        <Link id="Link" to='/categorias'>Categorias</Link>
                        <Link id="Link" to='/lancamentos'>Lançamentos</Link>
                        <Link id="Link" to='/localizacoes'>Localização</Link>
                    {/* </nav> */}
                </header>
                <section className="conteudo">
                    <div id="ihhmiga">
                    <h1 id="oi">Olá, {this.state.emailUsuario}</h1>
                    </div>
                   

                    <h1>Tendências</h1>

                    <table className="table">
                        <thead className="tableh">
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Duração por minuto</th>
                                <th scope="col">Classificação</th>
                                <th scope="col">Data de Lançamentos</th>
                                <th scope="col">Sinopse</th>
                                <th scope="col">IdPlataforma</th>
                                <th scope="col">IdGenero</th>
                                <th scope="col">IdTipo</th>
                                <th scope="col">Imagem</th>
                            </tr>
                        </thead>

                        <tbody id="tabela-lancamentos-corpo">
                            {this.state.lista.map(element => {
                                return (
                                    <tr key={element.idLancamento}>
                                        <td>{element.nome}</td>
                                        <td>{element.duracaoMin}</td>
                                        <td>{element.classificacao}</td>
                                        <td>{element.dataLancamento}</td>
                                        <td>{element.sinopse}</td>
                                        <td>{element.idPlataforma}</td>
                                        <td>{element.idGenero}</td>
                                        <td>{element.idTipo}</td>
                                        <td><img src={element.imagem} /></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </section>
            </div>
        );

    }
}