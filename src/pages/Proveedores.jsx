import React from "react";
import BarraRegistroFiltro from "../components/BarraRegistroFiltro";
import ContButtonsTab from "../components/ContButtonsTab";
import '../css/Proveedores.css';
import ButtonTab from "../components/ButtonTab";
import Cookies from "universal-cookie";
import RegistrarProveedor from "../components/RegistrarProveedor";
import axios from "axios";


const cookies = new Cookies();

const config = {
    headers: {
        "Authorization": `Bearer ${cookies.get('token')}`
    }
};

const infoUser = `?id_usuario=${parseInt(cookies.get("id"))}&tipo=${cookies.get("tipo")}`;

const Fila = (props) => {
    return (
        <tr>
            <td>{props.ruc}</td>
            <td>{props.nombre}</td>
            <td>{props.telefono}</td>
            <td>{props.correo}</td>
            <td>{props.direccion}</td>
            <td>
                <ContButtonsTab>
                    <ButtonTab
                        texto='Detallar'
                        back='var(--normal)'
                        border='var(--normal-dark)'
                        click={props.detallar}
                    />
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

let proveedores = [];

class Proveedores extends React.Component {

    constructor() {
        super();

        this.state = {
            dialog: {
                titulo: 'login',
                texto: '!Bienvenido',
                button: 'Aceptar',
                cerrar: this.cerrarModal,
                color: 'var(--primary)'
            },
            suppliers: {
                data: []
            },
            busqueda: '',
            proveedorData: {
                id: '',
                nombre: '',
                ruc: '',
                telefono: '',
                direccion: '',
                correo: '',
                update: false
            },
            mensaje: {
                texto: 'Hola :)',
                color: 'var(--normal-dark)'
            },
            boton: {
                texto: 'Registrar',
                accion: this.registrarProveedor,
                pregunta: '¿Desea Registrar el proveedor?'
            }
        };

        this.actualizar = this.actualizar.bind(this);
        this.eliminar = this.eliminar.bind(this);
    }

    traerProveedores = async () => {
        await axios.get(`http://localhost:8000/api/proveedores${infoUser}`, config)
            .then(res => {
                proveedores = res.data;
                this.setState({
                    suppliers: {
                        data: proveedores
                    }
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    capturarBusqueda = async (e) => {
        e.persist();
        await this.setState({ busqueda: e.target.value });
        // console.log(this.state.busqueda);
        this.filtraBusqueda();
    }

    filtraBusqueda = () => {
        let search = proveedores.filter(i => {
            if (i.nombre.toLowerCase().includes(this.state.busqueda.toLowerCase()) ||
                i.ruc.toLowerCase().includes(this.state.busqueda.toLowerCase())) {
                return i;
            }
        });
        console.log(search);
        this.setState({ suppliers: { data: search } })
    }

    capturarCambios = async (e) => {
        e.persist();
        console.log(e.target.name, e.target.value);
        await this.setState({
            proveedorData: {
                ...this.state.proveedorData,
                [e.target.name]: e.target.value
            }
        });
    }


    registrarProveedor = (e) => {
        axios.post('http://localhost:8000/api/proveedores', {
            id_usuario: parseInt(cookies.get("id")),
            tipo: cookies.get("tipo"),
            nombre: this.state.proveedorData.nombre,
            ruc: this.state.proveedorData.ruc,
            telefono: this.state.proveedorData.telefono,
            direccion: this.state.proveedorData.direccion,
            correo: this.state.proveedorData.correo
        }, config)
            .then(res => {
                this.setState({
                    mensaje: {
                        texto: 'Proveedor registrado exitosamente',
                        color: 'var(--success)'
                    }
                })
                document.getElementById('pop-reg-conf').showModal();
                this.traerProveedores();
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    mensaje: {
                        texto: `Error al registrar proveedor: ${err.message}`,
                        color: 'var(--danger)'
                    }
                })
                document.getElementById('pop-reg-conf').showModal();
            })
        document.getElementById('pop-reg-sino').close();
    }

    detallar(id) {
        console.log('estas detallando el proveedor ' + id);
    }

    async actualizar(id) {
        console.log(id);
        await axios.get(`http://localhost:8000/api/proveedores/${id}/${infoUser}`, config)
            .then(res => {
                this.setState({
                    proveedorData: {
                        id: res.data.id,
                        nombre: res.data.nombre,
                        ruc: res.data.ruc,
                        telefono: res.data.telefono,
                        direccion: res.data.direccion,
                        correo: res.data.correo,
                        update: true
                    },
                    boton: {
                        texto: 'Actualizar',
                        accion: this.confirmarActualizacion,
                        pregunta: `Desea Actualizar el proveedor ${res.data.nombre}`
                    }
                })
                this.abrirRegistro();
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    mensaje: {
                        texto: `Error al traer al proveedor: ${err.message}`,
                        color: 'var(--danger)'
                    }
                })
                document.getElementById('pop-reg-conf').showModal();
            })
    }

    confirmarActualizacion = async () => {
        await axios.put(`http://localhost:8000/api/proveedores/${this.state.proveedorData.id}`, {
            id_usuario: parseInt(cookies.get("id")),
            tipo: cookies.get("tipo"),
            nombre: this.state.proveedorData.nombre,
            ruc: this.state.proveedorData.ruc,
            telefono: this.state.proveedorData.telefono,
            direccion: this.state.proveedorData.direccion,
            correo: this.state.proveedorData.correo
        }, config)
        .then(res => {
            this.setState({
                mensaje: {
                    texto: 'Proveedor actualizado exitosamente',
                    color: 'var(--success)'
                }
            })
            document.getElementById('pop-reg-conf').showModal();
            this.traerProveedores();
        })
        .catch(err => {
            console.log(err);
            this.setState({
                mensaje: {
                    texto: `Error al actualizar al proveedor: ${err.message}`,
                    color: 'var(--danger)'
                }
            })
            document.getElementById('pop-reg-conf').showModal();
        })
        document.getElementById('pop-reg-sino').close();
        document.getElementById('pop-registrar-user').close();
        this.limpiarProveedor();
    }

    eliminar(id) {
        console.log('estas eliminando el proveedor ' + id);
    }

    limpiarProveedor = () => {
        this.setState({
            proveedorData: {
                id: '',
                nombre: '',
                ruc: '',
                telefono: '',
                direccion: '',
                correo: '',
                update: false
            },
            boton: {
                texto: 'Registrar',
                accion: this.registrarProveedor,
                pregunta: '¿Desea Registrar el Proveedor?'
            }
        })
    }

    abrirRegistro(e) {
        // e.preventDefault();
        document.getElementById('pop-registrar-user').showModal();
    }

    cerrarRegistro = (e) => {
        e.preventDefault();        
        this.limpiarProveedor();
        document.getElementById('pop-registrar-user').close();
        //this.limpiarProveedor();
    }

    componentDidMount() {
        if (!cookies.get('id')) {
            window.location.href = '/';
        }

        this.traerProveedores();
    }
    render() {
        return (
            <>
                <h1 className="tit_general">Proveedores</h1>
                <BarraRegistroFiltro
                    registro={true}
                    txtRegistro='Registrar Proveedor'
                    place='Nombre del Proveedor'
                    buscar={this.abrirModalNoEncontrado}
                    registrar={this.abrirRegistro}
                    change={this.capturarBusqueda}
                />
                <div className="cont_table_suppliers">
                    <table className="table_suppliers">
                        <caption className="tit_table_suppliers">
                            Lista de Proveedores
                        </caption>
                        <thead className="thead_suppliers">
                            <tr>
                                <th>RUC</th>
                                <th>EMPRESA</th>
                                <th>TELEFONO</th>
                                <th>EMAIL</th>
                                <th>DIRECCION</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="tbody_suppliers">
                            {this.state.suppliers.data.map(u =>
                                <Fila
                                    key={u.id}
                                    ruc={u.ruc}
                                    nombre={u.nombre}
                                    telefono={u.telefono}
                                    correo={u.correo}
                                    direccion={u.direccion}
                                    detallar={() => this.detallar(u.id)}
                                    actualizar={() => this.actualizar(u.id)}
                                    eliminar={() => this.eliminar(u.id)}
                                />
                            )}
                        </tbody>
                    </table>
                </div>

                <RegistrarProveedor
                    idd='pop-registrar-user'
                    cerrar={this.cerrarRegistro}
                    update={this.state.proveedorData.update}
                    cambio={this.capturarCambios}
                    /*-------------------------------------------------- */
                    textBtn={this.state.boton.texto}
                    registrar={this.state.boton.accion}
                    /*----------------------------------------------- */
                    mensajeConf={this.state.mensaje.texto}
                    colorConf={this.state.mensaje.color}
                    pregunta={this.state.boton.pregunta}
                    /*--------------------------------------------- */
                    nombre={this.state.proveedorData.nombre}
                    ruc={this.state.proveedorData.ruc}
                    telefono={this.state.proveedorData.telefono}
                    direccion={this.state.proveedorData.direccion}
                    correo={this.state.proveedorData.correo}
                />

            </>
        );
    }

}


export default Proveedores;