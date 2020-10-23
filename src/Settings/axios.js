import axios from 'axios'

//crear un cliente de axios para reutilizar en diferentes compoentents
const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});


export default clienteAxios;