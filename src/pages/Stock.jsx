import React from "react";
import BarraRegistroFiltro  from "../components/BarraRegistroFiltro";


class Stock extends React.Component{

    render(){
        return(
            <>
            <h1 className="tit_general">Stock</h1>
            <BarraRegistroFiltro 
                    registro={false}
                    txtRegistro=''
                    place='Nombre del Usuario'
                />
            </>
        );
    }

}


export default Stock;