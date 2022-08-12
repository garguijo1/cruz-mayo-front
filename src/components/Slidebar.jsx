import React from "react";
import { NavLink, Link } from "react-router-dom";

const Slidebar = () =>{
    return(
        <nav className="navbar">
            <ul className="list_link_navbar">
                <li className="li_navbar">
                    <NavLink to='/con/inicio'>Inicio</NavLink>
                </li>
                <li className="li_navbar">
                    <NavLink to='/con/productos'>Productos</NavLink>
                </li>
                <li className="li_navbar">
                    <NavLink to='/con/proveedores'>Proveedores</NavLink>
                </li>
                <li className="li_navbar">
                    <NavLink to='/con/stock'>Stock</NavLink>
                </li>
                <li className="li_navbar">
                    <NavLink to='/con/orden_compra'>Ordenes de Compra</NavLink>
                </li>
                <li className="li_navbar">
                    <NavLink to='/con/guia_remision'>Guia de Remisión</NavLink>
                </li>
                <li className="li_navbar">
                    <NavLink to='/con/usuarios'>Usuarios</NavLink>
                </li>
                <li className="li_navbar">
                    <NavLink to='/con/orden_salida'>Ordenes de Salida</NavLink>
                </li>

            </ul>
        </nav>
    );
}

export default Slidebar;