import React from 'react';
import { Text } from 'react'
import { Link } from 'react-router-dom'
import '../Lancamentos/lancamentos.css';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import logo from '../assets/Logos/vermelho.png';

class Localizacao extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      localizacoes: []
    }
  }

  componentDidMount() {
    this.Mapa();
  }

  Mapa() {
    fetch("http://192.168.3.14:5000/api/localizacoes", {
      headers: { 'Authorization': "Bearer " + localStorage.getItem('usuario-opflix') },
      "Content-Type": "application/json",
      "Accept": "application/json"
    })
      .then(response => response.json())
      .then(data => this.setState({ localizacoes: data }))
      .catch(erro => console.log(erro));
  }

  displayMarkers = () => {
    return this.state.localizacoes.map((store, index) => {
      return <Marker key={index} id={index} position={{
        lat: store.latitude,
        lng: store.longitude
      }}
        onClick={() => console.log(store)} />
    })
  }

  render() {
    return (
      <div className="Appl height">
        <header className="container ">
          <img id="logotipo" src={logo} />
          {/* <nav className="barra_nav"> */}
          <Link id="Link" to='/categorias'>Categorias</Link>
          <Link id="Link" to='/lancamentos'>Lançamentos</Link>
          <Link id="Link" to='/localizacoes'>Localização</Link>
          {/* </nav> */}
        </header>
        <Map
          google={this.props.google}
          zoom={3}
          style={mapStyles}
          initialCenter={{ lat: -8.5464085, lng: -53.4404716 }}
        >
          {this.displayMarkers()}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({

})(Localizacao);

const mapStyles = {
  width: '90%',
  height: '80%',
  marginLeft:'5%',
  marginRight:'5%',
  borderRadius: "3%"
}

