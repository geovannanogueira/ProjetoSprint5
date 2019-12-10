import React from 'react';
import { Link } from 'react-router-dom'

import logo from '../assets/Logos/vermelho.png';
import Axios from 'axios';
import '../Categorias/categorias.css';

export default class Categorias extends React.Component {

    constructor() {
        super();
        this.state = {
            lista: [],
            nome: "",
            duracao: "",
            classificacao: "",
            dataLancamento: "",
            sinopse: "",
            plataforma: "",
            categoria: "",
            tipo: "",
            imagem: "",
            
        }
    }

    estadoNome = (event) => {
        this.setState({ nome: event.target.value })
        console.log(this.state.nome)
    }

    estadoDuracao = (event) => {
        this.setState({ duracao: event.target.value })
        console.log(this.state.duracao)

    }

    estadoClassificacao = (event) => {
        this.setState({ classificacao: event.target.value })
        console.log(this.state.classificacao)

    }

    estadoDataLancamento = (event) => {
        this.setState({ dataLancamento: event.target.value })
        console.log(this.state.dataLancamento)

    }

    estadoSinopse = (event) => {
        this.setState({ sinopse: event.target.value })
        console.log(this.state.sinopse)

    }

    estadoPlataforma = (event) => {
        this.setState({ plataforma: event.target.value })
        console.log(this.state.plataforma)
        
    }

    estadoCategoria = (event) => {
        this.setState({ categoria: event.target.value })
        console.log(this.state.categoria)

    }

    estadoTipo = (event) => {
        this.setState({ tipo: event.target.value })
        console.log(this.state.tipo)

    }

    estadoImagem = (event) => {
        this.setState({ imagem: event.target.value })
        console.log(this.state.imagem)

    }

    Cadastrar = (event) => {
        event.preventDefault();

        // Axios.post("http://localhost:5000/api/lancamentos",{
        //     headers: {
        //         authorization: "Bearer " + localStorage.getItem("usuario-opflix")
        //     },
        //     nome: this.state.nome,
        //     duracao: this.state.duracao,
        //     classificacao: this.state.classificacao,
        //     dataLancamento: this.state.dataLancamento,
        //     sinopse: this.state.sinopse,
        //     plataforma: this.state.plataforma,
        //     categoria: this.state.categoria,
        //     tipo: this.state.tipo
        // })

        fetch("http://localhost:5000/api/lancamentos", {
            method: "POST",
            body: JSON.stringify({
                nome: this.state.nome,
                duracaoMin:this.state.duracao,
                classificacao: this.state.classificacao,
                dataLancamento: this.state.dataLancamento,
                sinopse: this.state.sinopse,
                idPlataforma: this.state.plataforma,
                idGenero: this.state.categoria,
                idTipo: this.state.tipo,
                imagem: this.state.imagem
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("usuario-opflix")
            }
        })
        .then(console.log("deu certo!"))

            .catch(erro => {
                console.log(erro);
            })
    }


    componentDidMount(){
        this.ListarCategorias();
    }


    ListarCategorias = () =>{
        Axios.get('http://localhost:5000/api/generos')
        .then (response =>{
            this.setState({lista: response.data})
            console.log(response.data);

        })
        .catch(erro=> console.log(erro))
    }


    render() {
        return (
            <div className="Appc">
                <header className="container">
                    <img src={logo} />
                    {/* <nav className="barra_nav"> */}
                        <Link id="Link" to='/categorias'>Categorias</Link>
                        <Link id="Link" to='/lancamentos'>Lançamentos</Link>
                    {/* </nav> */}
                </header>
                <section className="conteudo">
                    {/* <h1>Categorias</h1> */}
                    {/* <h1 id="nome">Cadastro de Lançamentos</h1> */}
                    <div id="bbb">
                    <p id="nome">Cadastro de Lançamentos</p>
                    </div>
                    <div id="loirao">
                    <form onSubmit={this.Cadastrar}>
                        <div id="input1">
                            <input placeholder="Nome" type="text" name="username" onChange={this.estadoNome} />
                        </div>
                        <div id="input2">
                            <input  placeholder="Duracao" type="number" name="username" onChange={this.estadoDuracao} />
                        </div>
                        <div id="input3">
                            <input  placeholder="Classificacao" type="text" name="username"  onChange={this.estadoClassificacao} />
                        </div>
                        <div id="input4">
                            <input  placeholder="Data de Lancamento" type="date" name="date"  onChange={this.estadoDataLancamento} />
                        </div>
                        <div id="input5">
                            <input  placeholder="Sinopse" type="text" name="username"  onChange={this.estadoSinopse} />
                        </div>
                        <div id="input6"> 
                            <input  placeholder="Plataforma" type="number" name="username"  onChange={this.estadoPlataforma} />
                        </div>
                        <div id="input7">
                            <input  placeholder="Genero" type="number" name="username" onChange={this.estadoCategoria} />
                        </div>
                        <div id="input7">
                            <input  placeholder="Tipo" type="number" name="text" onChange={this.estadoTipo} />
                        </div>
                        <div id="input8">
                            <input placeholder="Imagem" type="" name="text" onChange={this.estadoImagem} />
                        </div>
                        <div className="botaoL">
                            <button className="btn_cadastroL" id="botao_cadastroL">Cadastrar Lançamento</button>
                        </div>
                    </form>
                    </div>
                </section>



                <section id="categorias">
                <table id="tabela-lista">
                    <thead>
                        <tr>
                           
                            <th id="sharp">#</th>
                            <th id="cat">Categorias</th>
                            
                        </tr>
                    </thead>

                    <tbody id="tabela-lista-corpo">
                        {this.state.lista.map(element => {   
                                return (
                                    <tr key={element.idGenero}>
                                        <td>{element.idGenero}</td>
                                        <td>{element.nome}</td>
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                </table>
                </section>
            </div>
        );
    }
}