import React from "react";
import BarraRegistroFiltro  from "../components/BarraRegistroFiltro";
import Cookies from "universal-cookie";


const cookies = new Cookies();
class OrdenCompra extends React.Component{
    componentDidMount(){
        if(!cookies.get('id')){
            window.location.href = '/';
        }
    }
    render(){
        return(
            <>
            <h1 className="tit_general">Orden de Compra</h1>
            <BarraRegistroFiltro 
                    registro={true}
                    txtRegistro='Registrar Orden de Compra'
                    place='Nombre del proveedor'
            />
            </>
        );
    }

}


export default OrdenCompra;