import React from "react";
import CardUsuario from "../components/CardUsuario";

class Inicio extends React.Component{

    render(){
        return(
            <div className="cont_card">

                    <CardUsuario
                        cargo = 'Jefe Almacen'
                        nombre = 'Jhonas Reynoso Armas'
                        usuario = 'jreynso'
                        telefono = '926636364'
                        correo = 'jreynoso@gmail.com'
                        sucursal = 'miraflores'
                        foto = 'shawn.png'
                    />
                    <button className="btn_cerrar_sesion">
                        Cerrar Sesión
                    </button>

            </div>
        );
    }

}


export default Inicio;