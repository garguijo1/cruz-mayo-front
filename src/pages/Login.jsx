import React from "react";
import '../css/Login.css'
import logo from '../img/logo_cruz.png';
import PopUpConfirmacion  from '../components/PopUpConfirmacion.jsx';
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Login extends React.Component{

    constructor() {
        super();
    
        this.state = {
            form:{
                usuario:'',
                password:''
            }
        };
    
        this.capturarCambios = this.capturarCambios.bind(this);
    }


    iniciarSesion = async (e)=>{
        e.preventDefault();
        await axios.post('http://localhost:8000/api/login',{
            usuario : this.state.form.usuario,
            password: this.state.form.password
        })
        .then(res =>{
           console.log(res.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }

    capturarCambios(e){
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    abrirModal(e){
        e.preventDefault();
        document.getElementById('dia-log').showModal();
    }

    cerrarModal(e){
        e.preventDefault();
        document.getElementById('dia-log').close();
    }

    render(){
        return(
            <>
            <div className="cont_login">
                <div className="login">
                    <div className="titulo_login">
                        <img src={logo} alt="" />
                        <h1>Farmacia <span>Cruz de Mayo</span></h1>
                    </div>
                    <div className="form_login">
                        <form action="">
                            <label htmlFor="lg_user">Nombre de Usuario</label>
                            <input type="text" placeholder="Usuario" id="lg_user" name="usuario" onChange={this.capturarCambios}/>
                            <label htmlFor="lg_pass">Contraseña</label>
                            <input type="password" id="lg_pass" placeholder="Contraseña" name="password" onChange={this.capturarCambios}/>
                            <button
                                onClick={this.iniciarSesion}
                            >
                                Ingresar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <PopUpConfirmacion
                idd='dia-log'
                titulo='login'
                texto='Bienvenido al sistema de administracion de la farmacia cruz de mayo'
                button = 'Aceptar'
                cerrar = {this.cerrarModal}
                color= 'var(--primary)'
            />
            </>
        );
    }

}


export default Login;