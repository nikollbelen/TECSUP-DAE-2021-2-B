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
      prestamos: [],
      pos: null,
      titulo: 'Nuevo',
      id: 0,
      code: '',
      book: '',
      user: '',
      datePrestamo: '',
      dateDevolucion: ''
    })
    this.cambioCode = this.cambioCode.bind(this);
    this.cambioBook = this.cambioBook.bind(this);
    this.cambioUser = this.cambioUser.bind(this);
    this.cambioDatePrestamo = this.cambioDatePrestamo.bind(this);
    this.cambioDateDevolucion = this.cambioDateDevolucion.bind(this);
    this.mostrar = this.mostrar.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.guardar = this.guardar.bind(this);
  }

  componentDidMount() {
    axios.get('https://practicacalificada.herokuapp.com/prestamos/')
      .then(res => {
        this.setState({ prestamos: res.data })
      })
  }

  cambioCode(e) {
    this.setState({
      code: e.target.value
    })
  }

  cambioBook(e) {
    this.setState({
      book: e.target.value
    })
  }

  cambioUser(e) {
    this.setState({
      user: e.target.value
    })
  }

  cambioDatePrestamo(e) {
    this.setState({
      datePrestamo: e.target.value
    })
  }

  cambioDateDevolucion(e) {
    this.setState({
      dateDevolucion: e.target.value
    })
  }

  mostrar(cod, index) {
    axios.get('https://practicacalificada.herokuapp.com/prestamos/' + cod)
      .then(res => {
        this.setState({
          pos: index,
          titulo: 'Editar',
          id: res.data.id,
          code: res.data.codigo,
          book: res.data.libro,
          user: res.data.usuario,
          datePrestamo: res.data.fecPrestamo,
          dateDevolucion: res.data.fecDevolucion
        })
      })
  }

  guardar(e) {
    e.preventDefault();
    let cod = this.state.id;
    const datos = {
      codigo: this.state.code,
      libro: this.state.book,
      usuario: this.state.user,
      fecPrestamo: this.state.datePrestamo,
      fecDevolucion: this.state.dateDevolucion
    }
    if (cod > 0) {
      //edición de un registro
      axios.put('https://practicacalificada.herokuapp.com/prestamos/' + cod, datos)
        .then(res => {
          let indx = this.state.pos;
          this.state.prestamos[indx] = res.data;
          var temp = this.state.prestamos;
          this.setState({
            pos: null,
            titulo: 'Nuevo',
            id: 0,
            code: '',
            book: '',
            user: '',
            datePrestamo: '',
            dateDevolucion: '',
            prestamos: temp
          });
        }).catch((error) => {
          console.log(error.toString());
        });
    } else {
      //nuevo registro
      axios.post('https://practicacalificada.herokuapp.com/prestamos/', datos)
        .then(res => {
          this.state.prestamos.push(res.data);
          var temp = this.state.prestamos;
          this.setState({
            id: 0,
            code: '',
            book: '',
            user: '',
            datePrestamo: '',
            dateDevolucion: '',
            prestamos: temp
          });
        }).catch((error) => {
          console.log(error.toString());
        });
    }
  }

  eliminar(cod) {
    let rpta = window.confirm("Desea Eliminar?");
    if (rpta) {
      axios.delete('https://practicacalificada.herokuapp.com/prestamos/' + cod)
        .then(res => {
          var temp = this.state.prestamos.filter((prestamo) => prestamo.id !== cod);
          this.setState({
            prestamos: temp
          })
        })
    }
  }



  render() {
    return (
      <div style={{
        backgroundColor: '#6f859b',
        color: 'white',
        height: '100vh'
      }}>
        <Container>
          <hr />
          <hr />
          <Row>
            <Col xs={12} md={8}>
              <center><h1>Prestamos</h1></center>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Libro</th>
                    <th>Usuario</th>
                    <th>Fecha de Prestamo</th>
                    <th>Fecha de Devolucion</th>
                    <center><th>Acciones</th></center>
                  </tr>
                </thead>
                <tbody>
                  {this.state.prestamos.map((prestamo, index) => {
                    return (
                      <tr key={prestamo.id}>
                        <td>{prestamo.codigo}</td>
                        <td>{prestamo.libro}</td>
                        <td>{prestamo.usuario}</td>
                        <td>{prestamo.fecPrestamo}</td>
                        <td>{prestamo.fecDevolucion}</td>
                        <td>
                          <Button variant="success" onClick={() => this.mostrar(prestamo.id, index)}>Editar</Button>
                          <Button variant="danger" onClick={() => this.eliminar(prestamo.id, index)}>Eliminar</Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Col>
            <Col xs={6} md={4}>
              <Card bg="dark" style={{ width: '28rem' }}>
                <Card.Header as="h3">{this.state.titulo}</Card.Header>
                <Card.Body border="dark">
                  <Card.Text>
                    <Form onSubmit={this.guardar}>
                      <input type="hidden" value={this.state.id} />
                      <Form.Group className="mb-3">
                        <Form.Label>Codigo</Form.Label>
                        <Form.Control type="text" value={this.state.code} onChange={this.cambioCode} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Libro</Form.Label>
                        <Form.Control type="text" value={this.state.book} onChange={this.cambioBook} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control type="text" value={this.state.user} onChange={this.cambioUser} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Fecha de Prestamo</Form.Label>
                        <Form.Control type="date" value={this.state.datePrestamo} onChange={this.cambioDatePrestamo} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Fecha de Devolucion</Form.Label>
                        <Form.Control type="date" value={this.state.dateDevolucion} onChange={this.cambioDateDevolucion} />
                      </Form.Group>
                  <Button variant="primary" type="submit">
                    Guardar
                  </Button>
                  </Form>
                  </Card.Text>
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