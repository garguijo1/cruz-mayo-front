// import React from "react";
// import BarraRegistroFiltro from "../../components/BarraRegistroFiltro";
// import Cookies from "universal-cookie";


// const cookies = new Cookies();
// class Productos extends React.Component {
//     componentDidMount() {
//         if (!cookies.get('id')) {
//             window.location.href = '/';
//         }
//     }
//     render() {
//         return (
//             <>
//                 <h1 className="tit_general">Productos</h1>
//                 <BarraRegistroFiltro
//                     registro={true}
//                     txtRegistro='Registrar Producto'
//                     place='Nombre del Producto'
//                 />
//             </>
//         );
//     }

// }


// export default Productos;

import React from 'react'
import Tabla from '../components/Tabla'
import '../css/css-pages/Productos.css'

function Productos() {
  return (
    <div className="main-cont">

      <h1 className="title-products">PRODUCTOS</h1>
      <hr />
      <form className='form-products'>
        <button className='btn-form'>
          Registrar Producto
        </button>
        <span className='inpt-cont'>
          <input className='inpt-form' type="text" placeholder='Nombre de producto' />
          <button className='btn1 btn' >Buscar</button>
          <button className='btn2 btn' >Refrescar</button></span>
      </form >
      <hr />
      <Tabla
        headers={['N° SERIE', ' PRODUCTO', 'LABORATORIO']}
        title='LISTA PRODUCTOS'
      />
    </div>
  )
}

export default Productos