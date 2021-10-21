import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div class="container position-absolute top-50 start-50 translate-middle">
        <div class="row justify-content-center">
        <div class="col-lg-6 col-md-6">
            <table class="table table-dark">
            <thead><tr><th>Código</th><th>Descripción</th><th>Precio</th><th>Borrar</th></tr></thead>
            <tbody>
            {this.state.articulos.map(elemento => {
              return (
                <tr key={elemento.codigo}>
                  <td>
                    {elemento.codigo}  
                  </td>
                  <td>
                    {elemento.descripcion}
                  </td>
                  <td>
                    {elemento.precio}
                  </td>              
                  <td>
                    <button type="button" class="btn btn-outline-danger" onClick={()=>this.borrar(elemento.codigo)}>Borrar</button>
                  </td>
                </tr>
              )
            })}    
            </tbody>    
            </table>
            </div>
          </div>
        </div>
    );
  }
  borrar(cod) {
    var temp = this.state.articulos.filter((el)=>el.codigo !== cod);
    this.setState({
      articulos: temp
    })
  } 
  constructor(props) {
    super(props)
    this.state = {
      articulos: [{
                      codigo: 1, 
                      descripcion: 'coca-cola',
                      precio: 2.50
                 },{
                      codigo: 2, 
                      descripcion: 'inka-cola',
                      precio: 2.20
                 },{
                      codigo: 3, 
                      descripcion: 'fanta',
                      precio: 1.70
                 }]
    }
    this.borrar = this.borrar.bind(this);
  }

}
export default App;
