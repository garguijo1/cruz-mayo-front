import React from "react";
import Cookies from "universal-cookie";
import CardUsuario from "../components/CardUsuario";
import PopUpConfirmacion from "../components/PopUpConfirmacion";
import PopUpSiNo from "../components/PopUpSiNo";

const cookies = new Cookies();

class Inicio extends React.Component{

    cerrarSesion(e){
        e.preventDefault();
        cookies.remove('id',{path:'/'});
        cookies.remove('nombre',{path:'/'});
        cookies.remove('apellidoPaterno',{path:'/'});
        cookies.remove('apellidoMaterno',{path:'/'});
        cookies.remove('tipo',{path:'/'});
        cookies.remove('sucursal',{path:'/'});
        cookies.remove('usuario',{path:'/'});
        cookies.remove('token',{path:'/'});
        window.location.href='/';
    }

    componentDidMount(){
        if(!cookies.get('id')){
            window.location.href = '/';
        }
    }

    abrirModal(e){
        e.preventDefault();
        document.getElementById('dia-sino').showModal();
    }

    cerrarModal(e){
        e.preventDefault();
        document.getElementById('dia-sino').close();
    }

    abrirModalFinal(e){
        e.preventDefault();
        document.getElementById('dia-sino').close();
        document.getElementById('dia-conf').showModal();
    }

    

    render(){
        return(
            <>
            <div className="cont_card">

                    <CardUsuario
                        cargo = {cookies.get('tipo')}
                        nombre = {`${cookies.get('nombre')} ${cookies.get('apellidoPaterno')} ${cookies.get('apellidoMaterno')}`}
                        usuario = {cookies.get('usuario')}
                        telefono = '926636364'
                        correo = 'jreynoso@gmail.com'
                        sucursal = {cookies.get('sucursal')}
                        foto = 'shawn.png'
                    />
                    <button 
                        className="btn_cerrar_sesion"
                        onClick={this.abrirModal}    
                    >
                        Cerrar Sesión
                    </button>

            </div>
            <PopUpSiNo
                idd='dia-sino'
                titulo='cerrar sesion'
                texto='¿Desea cerrar sesion?'
                si={this.abrirModalFinal}
                no={this.cerrarModal}
                color= 'var(--primary)'
            />
            <PopUpConfirmacion
                idd='dia-conf'
                titulo='cerrar sesion'
                texto='Adios'
                button = 'Aceptar'
                cerrar = {this.cerrarSesion}
                color= 'var(--primary)'
            />
            </>
        );
    }

}


export default Inicio;