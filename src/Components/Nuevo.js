import React, { Fragment, useState } from "react";
import { Link , withRouter } from "react-router-dom";//widthrouter para redireccionar
//importar cliente axios para enviar la info del formulario por post a la api
import clienteAxios from "../Settings/axios";

const Nuevo = (props) => {
  //Generar el state inicial como objeto vacio
  const [turno, nuevoTurno] = useState({
    paciente: "",
    propietario: "",
    fecha: "",
    hora: "",
    telefono: "",
    sintoma: "",
  });

  //ejecutar una funcion en cada campo que actualiza el state
  const updateState = (e) => {
    //Actualizar el state
    nuevoTurno({
      ...turno,
      [e.target.name]: e.target.value,
      //e.target.name = nombre del campo en el que se escribe
      //e.target.value = el valor escrito
    });
    //ejecutar la funcion updateState en cada campo del formulario
    //EL nombre del campo debe coincidir con su key correspondiente en el objeto del state
    //Este a su vez debe coincidir con el schema del modelo de la API
  };


  //Enviar la peticion del nuevo turno la api
  const levantarNuevoTurno = (e) => {
    e.preventDefault();

    try {
      //Por medio de nuestro cliente de axios ( lo que envio es el estate )
      clienteAxios
      .post("/turnos", turno)
      .then((res) => { 
        console.log('Turno cargado exitosamente', res);

        //Redirecciona a la ruta principal
        props.history.push('/')
        //modificar el state consultar
        props.guardarConsulta(true)
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <h1 className="my-5">Nuevo turno</h1>

      <div className="containter mt-5 py-5">
        <div className="row">
          <div className="col-12 mb-5 d-flex justify-content-center">
            <Link
              to={"/"}
              className="btn btn-success text-uppercase py-2 px-5 font-weight-bold"
            >
              Volver
            </Link>
          </div>

          <div className="col-md-8 mx-auto">
            <form
              className="bg-white p-5 bordered"
              onSubmit={levantarNuevoTurno}
            >
              <div className="form-group">
                <label htmlFor="nombre">Nombre Mascota</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="paciente"
                  name="paciente"
                  placeholder="Nombre Mascota"
                  onChange={updateState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="propietario">Nombre Propietario</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="propietario"
                  name="propietario"
                  placeholder="Nombre Propietario"
                  onChange={updateState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  className="form-control form-control-lg"
                  id="telefono"
                  name="telefono"
                  placeholder="Teléfono"
                  onChange={updateState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="fecha">Fecha Alta</label>
                <input
                  type="date"
                  className="form-control form-control-lg"
                  id="fecha"
                  name="fecha"
                  onChange={updateState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="hora">Hora Alta</label>
                <input
                  type="time"
                  className="form-control form-control-lg"
                  id="hora"
                  name="hora"
                  onChange={updateState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="sintomas">Síntomas</label>
                <textarea
                  className="form-control"
                  name="sintoma"
                  rows="6"
                  onChange={updateState}
                ></textarea>
              </div>

              <input
                type="submit"
                className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold"
                value="Pedir turno"
              />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
//widthrouter para redireccionar
export default withRouter( Nuevo );
