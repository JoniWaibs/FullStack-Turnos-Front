import React , {useEffect , useState} from 'react';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom'
//Importar cliente axios
import clienteAxios from './Settings/axios'

//Componentes
import Turnos from './Components/Turnos'
import Turno from './Components/Turno'
import Nuevo from './Components/Nuevo'






function App() {

  //Estado inicial de la app arranca como un array vacio que se ira llenando de info
  const [turnos, guardarTurnos] = useState([])
  //Otro state para consultar la base de datos que inicia en true
  const [consultar , guardarConsulta ] = useState(true)

  //consultar a la API
  useEffect(() => {
    //Si el staste consultar arranca como true se hace la consulta a la ddbb por medio de axios
    if(consultar){
      const consultarAPI = () =>{
        clienteAxios.get('/turnos')
          .then(res => {
            //guardar el resultado en el state
            guardarTurnos(res.data.Turnos)
            //cambiamos el segundo state a false
            guardarConsulta(false)
          })
          .catch(err =>{
            console.log(err)
          })
      }
      consultarAPI();
    }
    //atento a los cambios de consultar para ejecutarse este usseEfect
  }, [consultar])

  //Voy a pasar la funcion que modifica consultar (guardarconsulta) hacia el componente turnos
  //para que se ponga en true cada vez que se redirecciona desde alla para aca

  return (
    <Router>
      <Switch>
        <Route 
          exact path ="/"
          component={() => <Turnos turnos={turnos}/> }
        />
         <Route 
          exact path ="/Nuevo"
          component={()=> <Nuevo guardarConsulta={guardarConsulta} />}
        />
         <Route 
          exact path ="/Turno/:id"
          render={(props) => {
            //en props.match.params.id Bajo el id de la url
            //lo cruzo con el state inicial que contiene todos los turnos de la ddbb
            //y lo guardo en una variable
            const turno = turnos.filter( turno => turno._id === props.match.params.id  )
          
            //Esa variable la envio como prop al componente del turno
            return (
              <Turno 
                turno={turno[0]}
                guardarConsulta={guardarConsulta}
              />
            )
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
