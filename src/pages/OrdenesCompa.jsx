import React from "react";
import BarraRegistroFiltro  from "../components/BarraRegistroFiltro";

class OrdenCompra extends React.Component{

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