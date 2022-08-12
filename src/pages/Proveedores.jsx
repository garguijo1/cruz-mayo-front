import React from "react";
import BarraRegistroFiltro  from "../components/BarraRegistroFiltro";


class Proveedores extends React.Component{

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