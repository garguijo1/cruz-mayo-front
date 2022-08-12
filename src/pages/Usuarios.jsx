import React from "react";
import BarraRegistroFiltro  from "../components/BarraRegistroFiltro";import '../css/Usuarios.css';
import ContButtonsTab from "../components/ContButtonsTab";
import ButtonTab from "../components/ButtonTab";
import PopUpConfirmacion from "../components/PopUpConfirmacion";import Cookies from "universal-cookie";


const cookies = new Cookies();

class Usuario extends React.Component{

    click(){
        console.log('haz hecho click');
    }

    abrirModalNoEncontrado(e){
        e.preventDefault();
        document.getElementById('pop-no').showModal();
    }

    cerrarModalNoEncontrado(e){
        e.preventDefault();
        document.getElementById('pop-no').close();
    }

    abrirRegistroUsuario(e){
        e.preventDefault();
        console.log('vas a registrar un usuario');
    }
    componentDidMount(){
        if(!cookies.get('id')){
            window.location.href = '/';
        }
    }
    render(){
        return(
            <>
                <h1 className="tit_general">Usuarios</h1>
                <BarraRegistroFiltro 
                    registro={true}
                    txtRegistro='Registrar Usuario'
                    place='Nombre del Usuario'
                    buscar={this.abrirModalNoEncontrado}
                    registrar={this.abrirRegistroUsuario}
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
                                    <ContButtonsTab>
                                        <ButtonTab
                                            texto='Actualizar'
                                            back='#ffe6cc'
                                            border='#d79b00'
                                            click={this.click}
                                        />
                                        <ButtonTab
                                            texto='Eliminar'
                                            back='#f8cecc'
                                            border='#b85450'
                                            click={this.click}
                                        />
                                    </ContButtonsTab>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <PopUpConfirmacion
                    idd='pop-no'
                    titulo='Usuarios'
                    texto='Usuario buscado no encontrado'
                    button = 'Volver'
                    cerrar = {this.cerrarModalNoEncontrado}
                    color= 'var(--warning)'
                />
            </>
        );
    }

}


export default Usuario;