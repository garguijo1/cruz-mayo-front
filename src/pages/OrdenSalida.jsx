import React from "react";
import BarraRegistroFiltro from "../components/BarraRegistroFiltro";
import ContButtonsTab from "../components/ContButtonsTab";
import '../css/Proveedores.css';
import ButtonTab from "../components/ButtonTab";
import Cookies from "universal-cookie";
import axios from "axios";
import RegistrarOrdenSalida from "../components/RegistrarOrdenSalida";


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
            <td>{props.id}</td>
            <td>{props.ejecutor}</td>
            <td>{props.fecha}</td>
            <td>
                <ContButtonsTab>
                    <ButtonTab
                        texto='Detallar'
                        back='var(--normal)'
                        border='var(--normal-dark)'
                        click={props.detallar}
                    />
                </ContButtonsTab>
            </td>

        </tr>
    );
}

let ordenes = [];


class OrdenSalida extends React.Component {

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
            orders: {
                data: []
            },
            busqueda: '',
            ordenData: {
                id: '',
                ejecutor: '',
                fecha: '',
                editable: true
            },
            mensaje: {
                texto: 'Hola :)',
                color: 'var(--normal-dark)',
                titulo: 'Registrar Proveedor'
            },
            boton: {
                texto: 'Registrar',
                accion: this.registrarOrden,
                pregunta: '¿Desea Registrar la orden?',
                titulo: 'Registrar Orden Salida'
            }
        };
    }

    traerOrdenes = async () => {
        await axios.get(`http://localhost:8000/api/ordenesSalida${infoUser}`, config)
            .then(res => {
                ordenes = res.data;
                this.setState({
                    orders: {
                        data: ordenes
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
        let search = ordenes.filter(i => {
            if (i.ejecutor.toLowerCase().includes(this.state.busqueda.toLowerCase())) {
                return i;
            }
        });
        console.log(search);
        this.setState({ orders: { data: search } })
    }



    async detallar(id) {
        console.log("Detalle orden de salida " + id);
    }

    limpiarOrden = () => {
        this.setState({
            ordenData: {
                id: '',
                ejecutor: '',
                fecha: '',
                editable: true
            },
            boton: {
                texto: 'Registrar',
                accion: this.RegistrarOrdenSalida,
                pregunta: '¿Desea Registrar la Orden de Salida?',
                titulo: 'Registrar Orden Salida'
            }
        })
    }

    abrirRegistro(e) {
        // e.preventDefault();
        document.getElementById('pop-registrar-user').showModal();
    }

    cerrarRegistro = (e) => {
        e.preventDefault();
        this.limpiarOrden();
        document.getElementById('pop-registrar-user').close();
        //this.limpiarProveedor();
    }

    componentDidMount() {
        if (!cookies.get('id')) {
            window.location.href = '/';
        }

        this.traerOrdenes();
    }

    render() {
        return (
            <>
                <h1 className="tit_general">Orden de Salida</h1>
                <BarraRegistroFiltro
                    registro={true}
                    txtRegistro='Registrar Orden Salida'
                    place='Nombre del Ejecutor'
                    buscar={this.abrirModalNoEncontrado}
                    registrar={this.abrirRegistro}
                    change={this.capturarBusqueda}
                />
                <div className="cont_table_suppliers">
                    <table className="table_suppliers">
                        <caption className="tit_table_suppliers">
                            Ordenes de Salida
                        </caption>
                        <thead className="thead_suppliers">
                            <tr>
                                <th>ID</th>
                                <th>EJECUTOR</th>
                                <th>FECHA</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="tbody_suppliers">
                            {this.state.orders.data.map(u =>
                                <Fila
                                    key={u.idOrden}
                                    id={u.idOrden}
                                    ejecutor={u.ejecutor}
                                    fecha={u.fecha}
                                    detallar={() => this.detallar(u.id)}
                                />
                            )}
                        </tbody>
                    </table>
                </div>

                <RegistrarOrdenSalida
                    idd='pop-registrar-user'
                    cerrar={this.cerrarRegistro}
                    cambio={this.capturarCambios}
                    /*-------------------------------------------------- */
                    textBtn={this.state.boton.texto}
                    registrar={this.state.boton.accion}
                    /*----------------------------------------------- */
                    mensajeConf={this.state.mensaje.texto}
                    colorConf={this.state.mensaje.color}
                    pregunta={this.state.boton.pregunta}
                    /*--------------------------------------------- */
                    id={this.state.ordenData.id}
                    ejecutor={this.state.ordenData.ejecutor}
                    fecha={this.state.ordenData.fecha}
                    tituloPri={this.state.boton.titulo}
                />
            </>
        );
    }

}


export default OrdenSalida;