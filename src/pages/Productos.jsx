import React from "react";
import BarraRegistroFiltro  from "../components/BarraRegistroFiltro";
import Cookies from "universal-cookie";


const cookies = new Cookies();
class Productos extends React.Component{
    componentDidMount(){
        if(!cookies.get('id')){
            window.location.href = '/';
        }
    }
    render(){
        return(
            <>
            <h1 className="tit_general">Productos</h1>
            <BarraRegistroFiltro 
                    registro={true}
                    txtRegistro='Registrar Producto'
                    place='Nombre del Producto'
                />
            </>
        );
    }

}


export default Productos;