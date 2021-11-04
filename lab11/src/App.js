import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      series: [],
      pos: null,
      titulo: 'Nuevo',
      id: 0,
      nombre: '',
      fecha: '',
      rating: '0',
      categoria: ''
    })
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioFecha = this.cambioFecha.bind(this);
    this.cambioRating = this.cambioRating.bind(this);
    this.cambioCategoria = this.cambioCategoria.bind(this);
    this.mostrar = this.mostrar.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.guardar = this.guardar.bind(this);
  }

  componentDidMount() {
    axios.get('https://nikollseries.herokuapp.com/series/')
      .then(res => {
        this.setState({ series: res.data })
      })
  }

  cambioNombre(e) {
    this.setState({
      nombre: e.target.value
    })
  }

  cambioFecha(e) {
    this.setState({
      fecha: e.target.value
    })
  }

  cambioCategoria(e) {
    this.setState({
      categoria: e.target.value
    })
  }

  cambioRating(e) {
    this.setState({
      rating: e.target.value
    })
  }

  mostrar(cod, index) {
    axios.get('https://nikollseries.herokuapp.com/series/' + cod)
      .then(res => {
        this.setState({
          pos: index,
          titulo: 'Editar',
          id: res.data.id,
          nombre: res.data.name,
          fecha: res.data.release_date,
          rating: res.data.rating,
          categoria: res.data.category
        })
      })
  }

  guardar(e) {
    e.preventDefault();
    let cod = this.state.id;
    const datos = {
      name: this.state.nombre,
      release_date: this.state.fecha,
      rating: this.state.rating,
      category: this.state.categoria
    }
    if (cod > 0) {
      //edición de un registro
      axios.put('https://nikollseries.herokuapp.com/series/' + cod, datos)
        .then(res => {
          let indx = this.state.pos;
          this.state.series[indx] = res.data;
          var temp = this.state.series;
          this.setState({
            pos: null,
            titulo: 'Nuevo',
            id: 0,
            nombre: '',
            fecha: '',
            rating: 0,
            categoria: '',
            series: temp
          });
        }).catch((error) => {
          console.log(error.toString());
        });
    } else {
      //nuevo registro
      axios.post('https://nikollseries.herokuapp.com/series/', datos)
        .then(res => {
          this.state.series.push(res.data);
          var temp = this.state.series;
          this.setState({
            id: 0,
            nombre: '',
            fecha: '',
            rating: 0,
            categoria: '',
            series: temp
          });
        }).catch((error) => {
          console.log(error.toString());
        });
    }
  }

  eliminar(cod) {
    let rpta = window.confirm("Desea Eliminar?");
    if (rpta) {
      axios.delete('https://nikollseries.herokuapp.com/series/' + cod)
        .then(res => {
          var temp = this.state.series.filter((serie) => serie.id !== cod);
          this.setState({
            series: temp
          })
        })
    }
  }


  render() {
    return (
      <div>
        
        <Container>
          <hr />
          <Row>
            <Col md={{ span: 6}}>
              <center><h1>Lista de series</h1></center>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Fecha</th>
                    <th>Rating</th>
                    <th>Categoria</th>
                    <center><th>Acciones</th></center>
                  </tr>
                </thead>
                <tbody>
                  {this.state.series.map((serie, index) => {
                    return (
                      <tr key={serie.id}>
                        <td>{serie.name}</td>
                        <td>{serie.release_date}</td>
                        <td>{serie.rating}</td>
                        <td>{serie.category}</td>
                        <td>
                        <center><ButtonGroup>
                            <Button variant="success" onClick={() => this.mostrar(serie.id, index)}>Editar</Button>
                            <Button variant="danger" onClick={() => this.eliminar(serie.id, index)}>Eliminar</Button>
                          </ButtonGroup></center>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Col>
            <Col md={{ span: 4, offset: 1 }}>
              <Card>
                <Card.Header as="h3">{this.state.titulo}</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <Form onSubmit={this.guardar}>
                      <input type="hidden" value={this.state.id} />
                      <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" value={this.state.nombre} onChange={this.cambioNombre} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="text" value={this.state.rating} onChange={this.cambioRating} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control type="text" value={this.state.categoria} onChange={this.cambioCategoria} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control type="date" value={this.state.fecha} onChange={this.cambioFecha} />
                      </Form.Group>
                    </Form>
                  </Card.Text>
                  <Button variant="primary" type="submit">
                    Guardar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <hr />

        </Container>
      </div>)
  }
}
export default App;
