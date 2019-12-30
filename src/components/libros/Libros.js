import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

const Libros = ({ libros, firestore }) => {
  if (!libros) return <Spinner />;

  const eliminarLibro = id => {
    firestore.delete({
      collection: "libros",
      doc: id
    });
  };

  return (
    <div className="row">
      <div className="col-md-12 mb-4">
        <Link to={"/libros/nuevo"} className="btn btn-success">
          <i className="fas fa-plus" /> Nuevo Libro
        </Link>
      </div>
      <div className="col-md-8">
        <h2>
          <i className="fas fa-book" /> Libros
        </h2>
      </div>
      <table className="table table-striped mt-4">
        <thead className="text-light bg-primary">
          <tr>
            <th>Título</th>
            <th className="text-center">ISBN</th>
            <th className="text-center">Editorial</th>
            <th className="text-center">Existencias</th>
            <th className="text-center">Disponibles</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map(libro => (
            <tr key={libro.id}>
              <td>{libro.titulo}</td>
              <td className="text-center">{libro.ISBN}</td>
              <td className="text-center">{libro.editorial}</td>
              <td className="text-center">{libro.existencias}</td>
              <td className="text-center">{libro.existencias - libro.prestados.length}</td>
              <td>
                <Link className="btn btn-sm btn-info btn-block" to={`/libros/${libro.id}`}>
                  <i className="fas fa-eye" /> Más Información
                </Link>

                <button
                  className="btn btn-sm btn-danger btn-block"
                  type="button"
                  onClick={() => eliminarLibro(libro.id)}
                >
                  <i className="fas fa-trash" /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Libros.propTypes = {
  firestore: PropTypes.object.isRequired,
  libros: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "libros" }]),
  connect((state, props) => ({
    libros: state.firestore.ordered.libros
  }))
)(Libros);
