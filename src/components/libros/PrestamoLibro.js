import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import FichaSuscriptor from "../suscriptores/FichaSuscriptor";
import { buscarUsuario } from "../../actions/buscarUsuarioActions";

class PrestamoLibro extends Component {
  state = {
    busqueda: "",
    noResultados: false
  };

  buscarAlumno = e => {
    e.preventDefault();

    const { busqueda } = this.state;
    const { firestore, buscarUsuario } = this.props;

    const suscriptores = firestore.collection("suscriptores");
    const consulta = suscriptores.where("codigo", "==", busqueda).get();
    consulta.then(response => {
      if (response.empty) {
        buscarUsuario({});
        this.setState({
          noResultados: true
        });
      } else {
        const datos = response.docs[0];
        buscarUsuario(datos.data());
        this.setState({
          noResultados: false
        });
      }
    });
  };

  leerDato = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  solicitarPrestamo = () => {
    const { firestore, history, libro, usuario } = this.props;
    const usuarioActualizado = usuario;
    const libroActualizado = libro;

    usuarioActualizado.fecha_solicitud = new Date().toLocaleDateString();
    libroActualizado.prestados.push(usuarioActualizado);

    firestore
      .update(
        {
          collection: "libros",
          doc: libro.id
        },
        libroActualizado
      )
      .then(history.push("/"));
  };

  render() {
    const { libro, usuario } = this.props;

    if (!libro) return <Spinner />;

    let fichaAlumno, btnSolicitar;

    if (usuario.nombre) {
      fichaAlumno = <FichaSuscriptor suscriptor={usuario} />;
      btnSolicitar = (
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={this.solicitarPrestamo}
        >
          Solicitar Libro
        </button>
      );
    } else {
      fichaAlumno = null;
      btnSolicitar = null;
    }

    let mensajeResultado;
    if (this.state.noResultados) {
      mensajeResultado = (
        <div className="alert alert-danger text-center font-weight-bold">
          No hay resultados para este Código!
        </div>
      );
    } else {
      mensajeResultado = null;
    }

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={"/"} className="btn btn-info">
            <i className="fas fa-arrow-circle-left" /> Volver al Listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-book" /> Soliciar Prestamo: {libro.titulo}
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form className="mb-4" onSubmit={this.buscarAlumno}>
                <legend className="color-primary text-center">
                  Busca el Suscriptor por código
                </legend>
                <div className="form-group">
                  <input
                    type="text"
                    name="busqueda"
                    className="form-control"
                    onChange={this.leerDato}
                  />
                </div>
                <input type="submit" className="btn btn-success btn-block" value="Buscar" />
              </form>
              <hr />
              {mensajeResultado}
              {fichaAlumno}
              {btnSolicitar}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PrestamoLibro.propTypes = {
  firestore: PropTypes.object.isRequired,
  libro: PropTypes.object
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "libros",
      storeAs: "libro",
      doc: props.match.params.id
    }
  ]),
  connect(
    ({ firestore: { ordered }, usuario }, props) => ({
      libro: ordered.libro && ordered.libro[0],
      usuario: usuario
    }),
    { buscarUsuario }
  )
)(PrestamoLibro);
