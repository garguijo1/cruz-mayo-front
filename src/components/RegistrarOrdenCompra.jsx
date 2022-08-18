import React from "react";
import PopUpConfirmacion from "./PopUpConfirmacion";
import PopUpSiNo from "./PopUpSiNo";
import '../css/RegistrarUsuario.css';
import '../css/RegistrarOrdenCompra.css'
import Cookies from "universal-cookie";
import ContButtonsTab from "./ContButtonsTab";
import ButtonTab from "./ButtonTab";
import axios from "axios";


const cookies = new Cookies();

const config = {
    headers:{
        "Authorization": `Bearer ${cookies.get('token')}` 
    }
};

const infoUser = `?id_usuario=${parseInt(cookies.get("id"))}&tipo=${cookies.get("tipo")}`;

let provedoresData = [];
let productosData = [];
let detalleData = [];

const Fila = (prop)=>{
    return(
        <tr>
            <td>{prop.idd}</td>
            <td>{prop.producto}</td>
            <td>{prop.cantidad}</td>
            <td>{prop.precio}</td>
            <td>{prop.subtotal}</td>
            <td>
                <ContButtonsTab>
                    <ButtonTab
                        texto='Eliminar'
                        back='var(--danger)'
                        border='var(--danger-dark)'
                        click={prop.eliminar}
                    />
                </ContButtonsTab>
            </td>
        </tr>
    );
}

class RegistrarOrdenCompra extends React.Component{
    
    constructor() {
      super();

      this.state={
        filaDetalle:{
            id: '' ,
            nombre:'',
            cantidad: '',
            precio: '',
            subtotal: ''
        },
        productos: [],
        provedores: [],
        detalles: []
      }

    }

    abrirModalSino = (e)=>{
      e.preventDefault();
      document.getElementById('pop-reg-sino').showModal();
      document.getElementById('pop-reg-conf').close();
    }

    cerrarModal = (e)=>{
      e.preventDefault();
      document.getElementById('pop-reg-conf').close();
    }

    cerrarModalSino = (e)=>{
      e.preventDefault();
      document.getElementById('pop-reg-sino').close();
    }

    traerProveedores = async ()=>{
      await axios.get(`http://localhost:8000/api/proveedores${infoUser}`, config)
      .then(res =>{
        provedoresData = res.data;
        this.setState({
            provedores : provedoresData
        });
          
      })
      .catch(err =>{
          console.log(err);
      })
    }

    traerProductos = async ()=>{
        await axios.get(`http://localhost:8000/api/productos${infoUser}`, config)
        .then(res =>{
            productosData = res.data;
          this.setState({
              productos : productosData
          });
            
        })
        .catch(err =>{
            console.log(err);
        })
      }

    // capturarCambios = async ()=>{
    //     await this.setState({
    //         filaDetalle:{
    //             ...this.state.filaDetalle,
    //             [e.target.name] : e.target.value
    //         }
    //     });
    //     console.log(this.state.usuarioData);
    // }

      agregarDetalle = () => {
            this.setState({
                detalles : [...this.state.detalles, this.state.filaDetalle]
            });
      }

    componentDidMount(){
        this.traerProveedores();
        this.traerProductos();
    }
    
    render(){
      return(
        <>
            <dialog className="dia-reg-user dia-reg-oc" id={this.props.idd}>
              <div  className="cont-reg-user">
                <div className="cont-tit-reg-user">
                  <h1>Registrar orden de compra</h1>
                </div>
                <div className="cont-form-reg-user">
                  <div className="cont_form_reg">
                    <label htmlFor="">
                      <div>Proveedor</div>
                      <select className="input_reg" onChange={this.props.cambio} name="proveedor" id="orden_c_prov">
                        <option value="-1">Seleccione un proveedor</option>
                        {this.state.provedores.map(s=><option key={s.id} value={s.id} data-nombre={s.nombre}>{s.nombre}</option>)}
                      </select>
                    </label>
                    <label htmlFor="">
                      <div>Productos</div>
                      <select className="input_reg" onChange={this.props.cambio} name="producto" id="orden_c_prod">
                        <option value="-1">Seleccione un producto</option>
                        {this.state.productos.map(s=><option key={s.id} value={s.id} data-nombre={s.nombre}>{s.nombre}</option>)}
                      </select>
                    </label>
                  </div>
                  <div className="cont_form_reg">
                    <label htmlFor="">
                      <div>Costo Unitario</div> 
                      <input 
                        type="text" 
                        name="costoUnitario"
                        className="input_reg"
                        id="orden_c_costo"
                        onChange={this.props.cambio}/>
                    </label>
                    <label htmlFor="">
                      <div>Cantidad</div> 
                      <input 
                        type="number" 
                        name="cantidad"
                        className="input_reg"
                        id="orden_c_cant"
                        onChange={this.props.cambio}/>
                    </label>
                  </div>
                </div>
                <div className="cont_button_reg">
                  <button 
                    className="btn_cancelar_user"
                    onClick={this.agregarDetalle}>
                    Agregar
                  </button>
                 </div>
                <div className="cont_table_orden">
                <table className="table_oc">
                        <caption className="tit_table_oc">
                            Lista de compra de productos
                        </caption>

                        <thead className="thead_oc">
                            <tr>
                                <th>codigo</th>
                                <th>producto</th>
                                <th>cantidad</th>
                                <th>costo unitario</th>
                                <th>subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="tbody_oc">
                            {this.state.detalles.map(d =>
                                <Fila 
                                    key={d.id}
                                    idd={d.id}
                                    producto = {d.producto}
                                    cantidad = {parseInt(d.cantidad)}
                                    precio = {parseFloat(d.precio)}
                                    sucursal = {parseInt(d.cantidad) * parseFloat(d.precio)}
                                    eliminar = {this.eliminar} 
                                />
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="cont_total_oc">
                    <div>
                        <div className="oc_total">Total</div>
                        <div className="oc_precio">S/. 100.00</div>
                    </div>
                </div>
                <div className="cont_button_reg">
                  <button 
                    className="btn_cancelar_user"
                    onClick={this.props.cerrar}>
                    Cancelar
                  </button>
                  <button 
                    className="btn_registrar_user"
                    onClick={this.props.cerrar}>
                    Registrar
                  </button>
                 </div>
            </div>
          </dialog>
          <PopUpConfirmacion
            // idd='pop-reg-conf'
            // titulo={this.props.tituloPop}
            // texto={this.props.mensajeConf}
            // button = 'Aceptar'
            // cerrar = {this.cerrarModal}
            // color= {this.props.colorConf}
          />
          <PopUpSiNo
            // idd='pop-reg-sino'
            // titulo={this.props.tituloPop}
            // texto={this.props.pregunta}
            // si={this.props.registrar}
            // no={this.cerrarModalSino}
            // color= 'var(--success)'
          />
        </>
      );
    }
  
}

export default RegistrarOrdenCompra;