import React from "react";
import PopUpConfirmacion from "./PopUpConfirmacion";
import PopUpSiNo from "./PopUpSiNo";

import '../css/PopupProducto.css'

function PopupProducto({ idd, titulo }) {

    function getBotones() {
        if (idd === 'pop-detallar-producto') {
            return <butto className='cont_button_reg'>Volver</butto>
        } else if (idd === 'pop-registrar-producto') {
            return <div className="cont_button_reg">
                <button
                    className="btn_cancelar_user"
                // onClick={this.props.cerrar}
                >
                    Cancelar
                </button>
                <button
                    className="btn_registrar_user"
                // onClick={this.abrirModalSino}
                >
                    Registrar
                </button>
            </div>
        } else if (idd === 'pop-actualizar-producto') {
            return <div className="cont_button_reg">
                <button
                    className="btn_cancelar_user"
                // onClick={this.props.cerrar}
                >
                    Cancelar
                </button>
                <button
                    className="btn_registrar_user"
                // onClick={this.abrirModalSino}
                >
                    Actualizar
                </button>
            </div>
        }
    }

    return (
        <>
            <dialog className="dia-reg-user" id={idd}>
                <div className="cont-reg-user">
                    <div className="cont-tit-reg-user">
                        <h1>{titulo}</h1>
                    </div>
                    <div className="cont-form-reg-user">
                        <div className="cont_form_reg">
                            <label htmlFor="">
                                <div>Número de Serie</div>
                                <input
                                    type="text"
                                    name="nombre"
                                    className="input_reg"
                                // value={this.props.nombre}
                                // onChange={this.props.cambio} 
                                />
                            </label>
                            <label htmlFor="">
                                <div>Nombre del producto</div>
                                <input
                                    type="text"
                                    name="apellidoPaterno"
                                    className="input_reg"
                                // value={this.props.apellidoPaterno}
                                // onChange={this.props.cambio} 
                                />
                            </label>
                            <label htmlFor="">
                                <div>Nombre de laboratorio</div>
                                <input type="text" />
                            </label>
                        </div>
                        <div className="cont_form_reg">
                            <label htmlFor="">
                                <div>Unidad</div>

                                <select className="selector-reg">
                                    <option value=" 1"> 1</option>
                                    <option value=" 2"> 2</option>
                                    <option value="3 "> 3</option>
                                </select>
                            </label>
                            <label htmlFor="">
                                <div>Descripcion</div>
                                <textarea className="input-descripcion"></textarea>

                            </label>
                        </div>

                    </div>

                    {
                        getBotones(idd)
                    }



                </div>
            </dialog>
            {/* <PopUpConfirmacion
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
                /> */}
        </>
    );


}

export default PopupProducto;

