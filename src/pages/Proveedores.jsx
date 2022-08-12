import React from "react";
import BarraRegistroFiltro  from "../components/BarraRegistroFiltro";
import Cookies from "universal-cookie";


const cookies = new Cookies();

class Proveedores extends React.Component{
    componentDidMount(){
        if(!cookies.get('id')){
            window.location.href = '/';
        }
    }
    render(){
        return(
            <>
            <h1 className="tit_general">Proveedores</h1>
            <BarraRegistroFiltro 
                    registro={true}
                    txtRegistro='Registrar Proveedor'
                    place='Nombre del Proveedor'
                />
            </>
        );
    }

}


export default Proveedores;