import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

const Suscriptores = ({ suscriptores, firestore }) => {
  if (!suscriptores) return <Spinner />;

  const eliminarSuscriptor = id => {
    firestore.delete({
      collection: "suscriptores",
      doc: id
    });
  };

  return (
    <div className="row">
      <div className="col-md-12 mb-4">
        <Link to={"/suscriptores/nuevo"} className="btn btn-success">
          <i className="fas fa-plus" /> Nuevo Suscriptor
        </Link>
      </div>
      <div className="col-md-8">
        <h2>
          <i className="fas fa-users" /> Suscriptores
        </h2>
      </div>
      <table className="table table-striped mt-4">
        <thead className="text-light bg-primary">
          <tr>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Codigo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {suscriptores.map(suscriptor => (
            <tr key={suscriptor.id}>
              <td>
                {suscriptor.nombre} {suscriptor.apellido}
              </td>
              <td>{suscriptor.carrera}</td>
              <td>{suscriptor.codigo}</td>
              <td>
                <Link
                  className="btn btn-sm btn-info btn-block"
                  to={`/suscriptores/${suscriptor.id}`}
                >
                  <i className="fas fa-eye" /> Ver
                </Link>
                <button
                  className="btn btn-sm btn-danger btn-block"
                  type="button"
                  onClick={() => eliminarSuscriptor(suscriptor.id)}
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

Suscriptores.propTypes = {
  firestore: PropTypes.object.isRequired,
  suscriptores: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "suscriptores" }]),
  connect((state, props) => ({
    suscriptores: state.firestore.ordered.suscriptores
  }))
)(Suscriptores);
