import React from "react";
import BarraRegistroFiltro  from "../components/BarraRegistroFiltro";
import Cookies from "universal-cookie";


const cookies = new Cookies();

class Stock extends React.Component{
    componentDidMount(){
        if(!cookies.get('id')){
            window.location.href = '/';
        }
    }
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