import React from "react";
import BarraRegistroFiltro  from "../components/BarraRegistroFiltro";import '../css/Usuarios.css';

class Usuario extends React.Component{

    render(){
        return(
            <>
                <h1 className="tit_general">Usuarios</h1>
                <BarraRegistroFiltro 
                    registro={true}
                    txtRegistro='Registrar Usuario'
                    place='Nombre del Usuario'
                />
                <div className="cont_table_user">
                    <table className="table_user">
                        <caption className="tit_table_user">
                            Lista de Usuarios
                        </caption>

                        <thead className="thead_user">
                            <tr>
                                <th>Nombre Completo</th>
                                <th>Usuario</th>
                                <th>Tipo</th>
                                <th>Sucursal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="tbody_user">
                            <tr>
                                <td>Erick Jhoel Agurto Briceño</td>
                                <td>eagurtobriceno</td>
                                <td>Encargado de botica</td>
                                <td>Miraflores</td>
                                <td>
                                    <div>
                                        <button>Actulizar</button>
                                        <button>
                                            Eliminar
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        );
    }

}


export default Usuario;