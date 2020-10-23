import React, { Fragment } from "react";
import { Link } from 'react-router-dom'

const Turnos = (prop) => {
  if (prop.turnos.length === 0) return null;

  return (
    <Fragment>

      <h1 className="my-5">Administrador de Turnos</h1>

      <div className="containter mt-5 py-5">
        <div className="row">




          <div className="col-12 mb-5 d-flex justify-content-center">
            <Link
              to={'/Nuevo'}
              className="btn btn-success text-uppercase py-2 px-5 font-weight-bold"
            >
              Nuevo Turno
            </Link>
          </div>






          <div className="col-md-8 mx-auto">
            <div className="list-group">

              {prop.turnos.map((turno) => (
                <Link key={turno._id} to={`/Turno/${turno._id}`} className="p-5 list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between mb-4">
                        <h3 className="mb-3">{turno.paciente}</h3>
                        <small className="fecha-alta">
                            {turno.fecha} - {turno.hora}
                        </small>
                    </div>
                    <p className="mb-0">{turno.sintoma}</p>
                    <div className="contacto py-3">
                        <p> Dueño: {turno.propietario}</p>
                        <p> Telefono: {turno.telefono}</p>
                    </div>
                </Link>
              ))}
            </div>
          </div>




          
        </div>
      </div>
    </Fragment>
  );
};

export default Turnos;
