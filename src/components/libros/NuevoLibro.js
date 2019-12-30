import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class NuevoLibro extends Component {
  state = {
    titulo: "",
    ISBN: "",
    editorial: "",
    existencias: "",
    prestados: []
  };

  leerDato = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  agregarLibro = e => {
    e.preventDefault();
    const nuevoLibro = this.state;
    const { firestore, history } = this.props;
    firestore
      .add(
        {
          collection: "libros"
        },
        nuevoLibro
      )
      .then(() => {
        history.push("/");
      });
  };

  render() {
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={"/"} className="btn btn-info">
            <i className="fas fa-arrow-circle-left" /> Volver al Listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-book" /> Nuevo Libro
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.agregarLibro}>
                <div className="form-group">
                  <label>Nombre: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    placeholder="Título del Libro"
                    required
                    onChange={this.leerDato}
                    value={this.state.titulo}
                  />
                </div>
                <div className="form-group">
                  <label>Editorial: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="editorial"
                    placeholder="Editorial del Libro"
                    required
                    onChange={this.leerDato}
                    value={this.state.editorial}
                  />
                </div>
                <div className="form-group">
                  <label>ISBN: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="ISBN"
                    placeholder="ISBN del Libro"
                    required
                    onChange={this.leerDato}
                    value={this.state.ISBN}
                  />
                </div>
                <div className="form-group">
                  <label>Existencias: </label>
                  <input
                    type="number"
                    min={0}
                    className="form-control"
                    name="existencias"
                    placeholder="Existencias"
                    required
                    onChange={this.leerDato}
                    value={this.state.existencias}
                  />
                </div>
                <input type="submit" className="btn btn-success btn-block" value="Agregar Libro" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NuevoLibro.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(NuevoLibro);
