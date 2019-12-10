import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

import logo from '../assets/Logos/vermelho.png';


export default class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      email: "",
      senha: "",
      erro: ""
    }
  }

  mudarEmail = (event) =>{
    this.setState({email: event.target.value})
  }

  mudarSenha = (event) =>{
    this.setState({senha: event.target.value})
  }

  efetuarLogin = (event) =>{
    event.preventDefault();

    Axios.post("http://192.168.3.14:5000/api/login",{
      email: this.state.email,
      senha: this.state.senha
    })
      .then(data =>{
        if(data.status === 200){
          localStorage.setItem("usuario-opflix", data.data.token);
          this.props.history.push('/lancamentos');
        }else{
          console.log("Não foi dessa vez!")
        }
      })
      .catch(erro => {
        this.setState({erro: <div className='erro'>Usuário ou senha inválido</div> });
        console.log(erro);
      })
  }

  render(){
    return (
    <div className="App">
      <header id="corpo-login">
        <div className="container" href="">
          <img src={logo} />
        </div>
      </header>
      <section className="Login-parte2">
        <h1>Login</h1>
        <form onSubmit={this.efetuarLogin}>
          <div className="item">
            <input className="input_login" placeholder="Email" type="email" name="username" id="login_email" onChange={this.mudarEmail} value={this.state.email}/>
          </div>
          <div className="item">
            <input className="input_login" placeholder="Senha" type="password" name="password" id="login_senha" onChange={this.mudarSenha} value={this.state.senha}/>
          </div>
          {/* <h1>Login</h1>
          <p>Email</p>
          <p>Senha</p>
          <p>Efetuar Login</p> */}
        <div className="item"> 
          <button className="btn_login" id="botao_login">Efetuar Login</button>
        </div>
        {this.state.erro}
        </form>
      </section>
    </div>
    );
  }
}