import React from "react";
import PopUpConfirmacion from "./PopUpConfirmacion";
import PopUpSiNo from "./PopUpSiNo";
import '../css/RegistrarUsuario.css';

const RegistrarUsuario = (props)=>{
    
    // const abrirModal = (e)=>{
    // e.preventDefault();
    //   document.getElementById('pop-reg-conf').showModal();
    // }

    const abrirModalSino = (e)=>{
      e.preventDefault();
      document.getElementById('pop-reg-sino').showModal();
      document.getElementById('pop-reg-conf').showModal();
    }

    const cerrarModal = (e)=>{
      e.preventDefault();
      document.getElementById('pop-reg-conf').close();
    }

    const cerrarModalSino = (e)=>{
      e.preventDefault();
      document.getElementById('pop-reg-sino').close();
    }
    
    return(
      <>
          <dialog className="dia-reg-user" id={props.idd}>
            <div  className="cont-reg-user">
              <div className="cont-tit-reg-user">
                <h1>Registrar Usuario</h1>
              </div>
              <div className="cont-form-reg-user">
                <div className="cont_form_reg">
                  <label htmlFor="">
                    <div>Nombre(s)</div>
                    <input 
                      type="text" 
                      className="input_reg"
                      value={props.nombre}/>
                  </label>
                  <label htmlFor="">
                    <div>Apellido Paterno</div>
                    <input 
                      type="text" 
                      className="input_reg"
                      value={props.apellidoPaterno}/>
                  </label>
                  <label htmlFor="">
                    <div>Apellido Materno</div>
                    <input 
                      type="text" 
                      className="input_reg"
                      value={props.apellidoMaterno}/>
                  </label>
                </div>
                <div className="cont_form_reg">
                  <label htmlFor="">
                    <div>Nombre de usuario</div> 
                    <input 
                      type="text" 
                      className="input_reg"
                      value={props.usuario}/>
                  </label>
                  <label htmlFor="">
                    <div>Tipo</div> 
                    <select className="input_reg">
                      <option value="1">Uno</option>
                      <option value="2">Dos</option>
                      <option value="3">Tres</option>
                      <option value="4">Cuatro</option>
                    </select>
                  </label>
                </div>
                <div className="cont_form_reg">
                  <label htmlFor="">
                    <div>Nombre de usuario</div> 
                    <input type="password" name="" id="" value={props.password}  className="input_reg" />
                            
                  </label>
                  <label htmlFor="">
                    <div>Sucursal</div>
                    <select className="input_reg">
                      <option value="1">Uno</option>
                      <option value="2">Dos</option>
                      <option value="3">Tres</option>
                      <option value="4">Cuatro</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="cont_button_reg">
                <button 
                  className="btn_cancelar_user"
                  onClick={props.cerrar}>
                  Cancaelar
                </button>
                <button 
                   className="btn_registrar_user"
                  onClick={abrirModalSino}>
                  Registrar
                </button>
               </div>
            
          </div>
        </dialog>
        <PopUpConfirmacion
          idd='pop-reg-conf'
          titulo='Registrar Usuario'
          texto='Usuario registrado exitosamente'
          button = 'Aceptar'
          cerrar = {cerrarModal}
          color= 'var(--success)'
        />
        <PopUpSiNo
          idd='pop-reg-sino'
          titulo='Registrar Usuario'
          texto='¿Desea registrar este usuario?'
          si={cerrarModalSino}
          no={cerrarModalSino}
          color= 'var(--success)'
        />
      </>
    );
}

export default RegistrarUsuario;