import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

class EditarLibro extends Component {
  tituloInput = React.createRef();
  isbnInput = React.createRef();
  editorialInput = React.createRef();
  existenciasInput = React.createRef();

  editarLibro = e => {
    e.preventDefault();

    const libroActualizado = {
      titulo: this.tituloInput.current.value,
      editorial: this.editorialInput.current.value,
      ISBN: this.isbnInput.current.value,
      existencias: this.existenciasInput.current.value
    };

    const { firestore, history, libro } = this.props;

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
    const { libro } = this.props;

    if (!libro) return <Spinner />;

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={"/"} className="btn btn-info">
            <i className="fas fa-arrow-circle-left" /> Volver al Listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-book" /> Editar Libro
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.editarLibro}>
                <div className="form-group">
                  <label>Títutlo: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    placeholder="Título del Libro"
                    required
                    ref={this.tituloInput}
                    defaultValue={libro.titulo}
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
                    ref={this.editorialInput}
                    defaultValue={libro.editorial}
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
                    ref={this.isbnInput}
                    defaultValue={libro.ISBN}
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
                    ref={this.existenciasInput}
                    defaultValue={libro.existencias}
                  />
                </div>
                <input type="submit" className="btn btn-success btn-block" value="Editar Libro" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditarLibro.propTypes = {
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
  connect(({ firestore: { ordered } }, props) => ({
    libro: ordered.libro && ordered.libro[0]
  }))
)(EditarLibro);
