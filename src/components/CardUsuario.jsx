
import React from "react";
import '../css/CardUsuario.css';

const CardUsuario = (props)=>{
    return(
        <div className="card_usuario">
            <div className="card_cont_user">
                <img src={ require(`/src/img/users/${props.foto}`)} alt="" />
            </div>
            <div className="card_cont_info">
                <h1>Usuario: <span>{props.cargo}</span></h1>
                <ul>
                    <li>
                        <span class="info_key">Nombre Completo: </span>
                        <span class="info_desc">{props.nombre}</span>
                    </li>
                    <li>
                        <span class="info_key">Nombre de Usuario: </span>
                        <span class="info_desc">{props.usuario}</span>
                    </li>
                    <li>
                        <span class="info_key">Télefono: </span>
                        <span class="info_desc">{props.telefono}</span>
                    </li>
                    <li>
                        <span class="info_key">Correo Electrónico: </span>
                        <span class="info_desc">{props.correo}</span>
                    </li>
                    <li>
                        <span class="info_key">Sucursal: </span>
                        <span class="info_desc">{props.sucursal}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default CardUsuario;