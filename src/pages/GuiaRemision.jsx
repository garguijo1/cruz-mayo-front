import React from "react";
import Cookies from "universal-cookie";
import '../css/css-pages/GuiaRemision.css'

const cookies = new Cookies();

function GuiaRemision() {

    function componentDidMount() {
        // if(!cookies.get('id')){
        //     window.location.href = '/';
        // }
    }



    return (
        <>
            <h1 className="tit_general">Guía de Remisión</h1>


            <div className="cabecera-cont">
                <div className="input-group">
                    <input className="input-numero" type="text" placeholder="Número de ornden de compra" />
                    <div>
                        <button className="btn-buscar">Buscar</button>
                    </div>
                </div>

                <div className="cont-main">
                    <div className="cont-datos-proveedor">
                        <span className="campo">
                            <label>Nombre de Proveedor</label>
                            <input type="text" className="input" />
                        </span>
                        <span className="campo">
                            <label>Direccion de Proveedor</label>
                            <input type="text" className="input" />
                        </span>
                    </div>
                    <hr />
                    <div className="cont-second">
                        <div className="cont-datos-guia">
                            <div>
                                <label>N° de Guía de Remisión</label>
                                <input type="text" className="input" />
                            </div>
                            <div>
                                <label >
                                    Fecha de translado
                                </label>
                            </div>
                            <div className="cont-inputs">
                                <input type="text" className="input" />
                                <input type="text" className="input" />
                                <input type="text" className="input" />
                            </div>
                            <div>
                                <label>Motivo de traslado</label>
                                <textarea></textarea>
                            </div>
                        </div>

                        <div className="cont-adjunto">
                            <button>Adjuntar Guía de Remision</button>
                            <img alt='Imagen guia de remision'></img>
                            <input type="file" />
                        </div>
                    </div>

                    <div className="cont-btn">
                        <buttom>Registrar</buttom>
                    </div>
                </div>
            </div>
        </>
    );


}

export default GuiaRemision;