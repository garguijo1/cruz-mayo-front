import React from "react";
import BarraRegistroFiltro  from "../components/BarraRegistroFiltro";

class Productos extends React.Component{

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