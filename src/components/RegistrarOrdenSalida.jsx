import React from "react";
import PopUpConfirmacion from "./PopUpConfirmacion";
import PopUpSiNo from "./PopUpSiNo";
import '../css/RegistrarProveedor.css';
import Cookies from "universal-cookie";
import axios from "axios";
import { render } from "@testing-library/react";

const cookies = new Cookies();

const config = {
    headers: {
        "Authorization": `Bearer ${cookies.get('token')}`
    }
};

const infoUser = `?id_usuario=${parseInt(cookies.get("id"))}&tipo=${cookies.get("tipo")}`;

class RegistrarOrdenSalida extends React.Component {

    constructor() {
        super();

        this.state = {
            productos: []
        }
    }

    abrirModalSino = (e) => {
        e.preventDefault();
        document.getElementById('pop-reg-sino').showModal();
        document.getElementById('pop-reg-conf').close();
    }

    cerrarModal = (e) => {
        e.preventDefault();
        document.getElementById('pop-reg-conf').close();
    }

    cerrarModalSino = (e) => {
        e.preventDefault();
        document.getElementById('pop-reg-sino').close();
    }

    traerProductos = async () => {
        await axios.get(`http://localhost:8000/api/productos${infoUser}`, config)
            .then(res => {
                this.setState({
                    productos: res.data
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.traerProductos();
    }

    render() {
        return (
            <>
                <dialog className="dia-reg-user" id={this.props.idd}>
                    <div className="cont-reg-user">
                        <div className="cont-tit-reg-user">
                            <h1>{this.props.tituloPri}</h1>
                        </div>
                        <div className="cont-form-reg-user">
                            <div className="cont_form_reg">
                                <label htmlFor="">
                                    <div>Producto</div>
                                    <select className="input_reg" onChange={this.props.cambio} name="producto" id="sucursal_user" >
                                        <option value="-1">Seleccione el Producto</option>
                                        {this.state.productos.map(s => <option key={s.id} value={s.nombre}>{s.nombre}</option>)}
                                    </select>
                                </label>
                                <label htmlFor="">
                                    <div>Cantidad</div>
                                    <input
                                        type="number"
                                        name="cantidad"
                                        className="input_reg"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="cont_button_reg">
                            <button
                                className="btn_cancelar_user"
                                onClick={this.props.cerrar}>
                                Agregar-
                            </button>
                        </div>
                        <div className="cont_button_reg">
                            <button
                                className="btn_registrar_user"
                                onClick={this.abrirModalSino}>
                                {this.props.textBtn}
                            </button>
                        </div>
                    </div>
                </dialog>
                <PopUpConfirmacion
                    idd='pop-reg-conf'
                    titulo={this.props.tituloPop}
                    texto={this.props.mensajeConf}
                    button='Aceptar'
                    cerrar={this.cerrarModal}
                    color={this.props.colorConf}
                />
                <PopUpSiNo
                    idd='pop-reg-sino'
                    titulo={this.props.tituloPop}
                    texto={this.props.pregunta}
                    si={this.props.registrar}
                    no={this.cerrarModalSino}
                    color='var(--success)'
                />
            </>
        );
    }
}

export default RegistrarOrdenSalida;