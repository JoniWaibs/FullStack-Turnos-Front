import React , { Fragment } from 'react'
import { Link , withRouter } from "react-router-dom"
//importar axios para poder enviar una peticion delete
import clienteAxios from "../Settings/axios";
//swal
import Swal from 'sweetalert2';

const Turno = (props) =>{


    //Si no llega ningun turno como prop
    //Esto pasa cuando estamos dentro de la ruta del turno y recargamos la pagina 
    //como no esta llegando el prop al componente muestra error
    //entonces comprobamos
    if(!props.turno){
        //Redirecciona a la ruta principal
        props.history.push('/')     
        return null  
    }


    //borrar turno de la ddbb mediante axios
    const borrar = () =>{

        Swal
        .fire({
            title: 'Estas seguro de eliminar este turno?',
            text: "No podras volver a recuperarlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!',
            cancelButtonText:'Cancelar'
          })
          .then((result) => {
            if (result.isConfirmed) {

                try{
                    clienteAxios
                    .delete(`/turnos/${props.turno._id}`)
                    .then(res =>{
                        Swal.fire(
                            'Eliminado!',
                            'El turno ha sido borrado!',
                            'success'
                        )
                        console.log(res , 'turno eliminado')
                        //Redirecciona a la ruta principal
                        props.history.push('/')
                        //modificar el state consultar
                        props.guardarConsulta(true)
                    })


                }catch(err){
                    console.log(err)
                }  


            
            }
          })


  

    }

    return (
        <Fragment>
            <h1 className="my-5">turno para: {props.turno.paciente}</h1>
    
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
        
                    <div className="col-md-8 mx-auto p-5">

                        <div className="list-group">

                            <div className="p-5 list-group-item list-group-item-action flex-column align-items-start p-5">
                                <div className="d-flex w-100 justify-content-between mb-4">
                                    <h3 className="mb-3">{props.turno.paciente}</h3>
                                    <small className="fecha-alta">
                                        {props.turno.fecha} - {props.turno.hora}
                                    </small>
                                </div>
                                <p className="mb-0">{props.turno.sintoma}</p>
                                <div className="contacto py-3">
                                    <p> Dueño: {props.turno.propietario}</p>
                                    <p> Telefono: {props.turno.telefono}</p>
                                </div>
                                <div>
                                      <button type="button" className="btn btn-danger text-uppercase" onClick={borrar}>Eliminar &times;</button>  
                                </div>
                            </div>
                
                        </div>
                        
                    </div>
                </div>
            </div>
      </Fragment>     


    )
}
export default  withRouter( Turno );