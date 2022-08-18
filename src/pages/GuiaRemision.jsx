import React from "react";
import Cookies from "universal-cookie";
import '../css/css-pages/GuiaRemision.css'


const cookies = new Cookies();

class GuiaRemision extends React.Component {

    componentDidMount() {
        if(!cookies.get('id')){
            window.location.href = '/';
        }
    }


    render(){
    return (
        <>
            <h1 className="tit_general">Guía de Remisión</h1>
            <div className="cabecera-cont">
                <div className="input-group">
                    <input className="input-numero" type="text" placeholder="Número de ornden de compra" />
                    <div>
                        <button className="a-container">Buscar</button>
                    </div>
                </div>

                <div className="cont-main">
                    <div className="cont-datos-proveedor">
                        <span>
                            <label>Nombre de Proveedor</label>
                            <input type="text" disabled />
                        </span>
                        <span>
                            <label>Direccion de Proveedor</label>
                            <input type="text" disabled/>
                        </span>
                    </div>
                    <hr />
                    <div className="cont-second">
                        <div className="cont-datos-guia">
                            <div>
                                <label>N° de Guía de Remisión</label>
                                <input className="input-num" type="text" />
                            </div>
                            <div>
                                <label>Motivo de traslado</label>
                                <textarea className="txt-motivo"></textarea>
                            </div>
                        </div>

                        <div className="cont-adjunto">
                            
                            <img  className="img_guia" src={ require('../img/sin_img.jpg')}></img>
                            <input type="file" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    }

}

export default GuiaRemision;