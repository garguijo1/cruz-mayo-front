import React from "react";
import BarraRegistroFiltro  from "../components/BarraRegistroFiltro";
import '../css/Usuarios.css';
import ContButtonsTab from "../components/ContButtonsTab";
import ButtonTab from "../components/ButtonTab";
import Cookies from "universal-cookie";
import RegistrarOrdenCompra from "../components/RegistrarOrdenCompra";
import axios from "axios";
import PopUpSiNo from "../components/PopUpSiNo";

const cookies = new Cookies();

const config = {
    headers:{
        "Authorization": `Bearer ${cookies.get('token')}` 
    }
};

const infoUser = `?id_usuario=${parseInt(cookies.get("id"))}&tipo=${cookies.get("tipo")}`;

const Fila =(props)=>{
    return(
        <tr>
        <td>{props.idd}</td>
        <td>{props.fecha}</td>
        <td>{props.ruc}</td>
        <td>{props.costo}</td>
        <td>{props.estado}</td>
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

class OrdenCompra extends React.Component{

    constructor() {
        super();
    
        this.state = {
            ordenes : {
                data : []
            },
            busqueda : '',
            mensaje:{
                texto : 'Hola :)',
                color: 'var(--normal-dark)',
                titulo : 'Registrar Usuario'
            },
            boton:{
                texto:'Registrar',
                accion : this.registrarUsuario,
                pregunta: '¿Desea Registrar el Usuario?',
                titulo: 'Registrar Usuario'
            }
        };
    }

    traerOrdenes = async ()=>{
     
            
            await axios.get(`http://localhost:8000/api/ordenesCompra${infoUser}`, config)
            .then(res =>{
                // console.log(res.data);
                ordenes = res.data;
                this.setState({
                    ordenes:{
                        data: ordenes
                    }
                });
                console.log(ordenes);
            })
            .catch(err =>{
                console.log(err);
            })
        }


    componentDidMount(){
        if(!cookies.get('id')){
            window.location.href = '/';
        }
        this.traerOrdenes();
    }

    abrirRegistro = () =>{
        document.getElementById('pop-registrar-oc').showModal();
    }

    render(){
        return(
            <>
            <h1 className="tit_general">Orden de Compra</h1>
            <BarraRegistroFiltro 
                    registro={true}
                    txtRegistro='Registrar Orden'
                    place='Proveedor...'
                    registrar={this.abrirRegistro}
                    change = {this.capturarBusqueda}
                />
            <div className="cont_table_user">
                <table className="table_user">
                        <caption className="tit_table_user">
                            Lista de Usuarios
                        </caption>

                        <thead className="thead_user">
                            <tr>
                                <th>N°</th>
                                <th>Fecha de Compra</th>
                                <th>RUC Proveedor</th>
                                <th>Costo Total</th>
                                <th>Estado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="tbody_user">
                            {this.state.ordenes.data.map(u =>
                                <Fila 
                                    key={u.idOrden}
                                    idd={u.idOrden}
                                    fecha = {u.fechaCompra}
                                    ruc = {u.rucProveedor}
                                    costo = {`S/. ${u.costoTotal}`}
                                    estado = {u.estado}
                                    detallar = {this.traerOrdenes}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
                <RegistrarOrdenCompra
                    idd='pop-registrar-oc'
                />
            </>
        );
    }

}


export default OrdenCompra;