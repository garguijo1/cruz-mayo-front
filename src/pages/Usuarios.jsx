import React from "react";
import BarraRegistroFiltro  from "../components/BarraRegistroFiltro";import '../css/Usuarios.css';
import ContButtonsTab from "../components/ContButtonsTab";
import ButtonTab from "../components/ButtonTab";
import PopUpConfirmacion from "../components/PopUpConfirmacion";import Cookies from "universal-cookie";
import RegistrarUsuario from "../components/RegistrarUsuario";
import axios from "axios";

// import MaterialTable from "material-table";

const cookies = new Cookies();

const Fila =(props)=>{
    return(
        <tr>
        <td>{props.idd}</td>
        <td>{props.nombre}</td>
        <td>{props.usuario}</td>
        <td>{props.tipo}</td>
        <td>{props.sucursal}</td>
        <td>
            <ContButtonsTab>
                <ButtonTab
                    texto='Actualizar'
                    back='var(--warning)'
                    border='var(--warning-dark)'
                    click={props.actualizar}
                />
                <ButtonTab
                    texto='Eliminar'
                    back='var(--danger)'
                    border='var(--danger-dark)'
                    click={props.eliminar}
                />
            </ContButtonsTab>
        </td>

        </tr>
    );
}

class Usuario extends React.Component{

    constructor() {
        super();
    
        this.state = {
            dialog:{
                titulo: 'login',
                texto :'!Bienvenido',
                button : 'Aceptar',
                cerrar : this.cerrarModal,
                color : 'var(--primary)'
            },
            users : {
                data : []
            }
           
        };

        this.actualizar = this.actualizar.bind(this);
        this.eliminar = this.eliminar.bind(this);
    }

    traerUsuarios = async ()=>{
       console.log('trayendo usuarios ....');
        const config = {
            headers:{
                "Authorization": `Bearer ${cookies.get('token')}` 
            }
          };
          
        await axios.get(`http://localhost:8000/api/usuarios?id_usuario=${parseInt(cookies.get('id'))}&tipo=${cookies.get('tipo')}`, config)
        .then(res =>{
            console.log(res.data);
            this.setState({
                users:{
                    data: res.data
                }
            });
        })
        .catch(err =>{
            console.log(err);
        })
    }

    click(){
        this.traerUsuarios();
    }

    actualizar(id){
        console.log('estas actualizando el usuario '+id);
    }

    eliminar(id){
        console.log('estas eliminando el usuario '+id);
    }

    abrirModalNoEncontrado(e){
        e.preventDefault();
        document.getElementById('pop-no').showModal();
    }

    cerrarModalNoEncontrado(e){
        e.preventDefault();
        document.getElementById('pop-no').close();
    }

    abrirRegistro(e){
        e.preventDefault();
        document.getElementById('pop-registrar-user').showModal();  
    }

    cerrarRegistro(e){
        e.preventDefault();
        document.getElementById('pop-registrar-user').close();  
    }

    componentDidMount(){
        if(!cookies.get('id')){
            window.location.href = '/';
        }
     
        this.traerUsuarios();
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
                    registrar={this.traerUsuarios}
                />
                <div className="cont_table_user">
                <table className="table_user">
                        <caption className="tit_table_user">
                            Lista de Usuarios
                        </caption>

                        <thead className="thead_user">
                            <tr>
                                <th>ID</th>
                                <th>Nombre Completo</th>
                                <th>Usuario</th>
                                <th>Tipo</th>
                                <th>Sucursal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="tbody_user">
                            {this.state.users.data.map(u =>
                                <Fila 
                                    key={u.id}
                                    idd={u.id}
                                    nombre = {u.nombre}
                                    usuario = {u.usuario}
                                    tipo = {u.tipo}
                                    sucursal = {u.sucursal}
                                    actualizar = {()=>this.actualizar(u.id)}
                                    eliminar = {()=>this.eliminar(u.id)} 
                                />
                            )}
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
                <RegistrarUsuario
                    idd='pop-registrar-user'
                    cerrar={this.cerrarRegistro}
                    // usuario={this.state.user}
                />
            </>
        );
    }

}


export default Usuario;