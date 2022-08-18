

import React, { useState } from 'react'
import Tabla from '../components/Tabla'
import '../css/css-pages/Productos.css'
import PopupProducto from '../components/PopupProducto'
import PopUpSiNo from '../components/PopUpSiNo';

function Productos() {

  function registrarProducto(e) {
    e.preventDefault();
    document.getElementById('pop-registrar-producto').showModal();
  };

  function detallarProducto(e) {
    e.preventDefault();
    document.getElementById('pop-detallar-producto').showModal();
  }

  function actualizarProducto(e) {

    e.preventDefault();
    document.getElementById('pop-actualizar-producto').showModal();
  }

  function eliminarProducto(e) {
    e.preventDefault();

    document.getElementById('pop-reg-sino').showModal();
  }

  const capturarCambios = async (e) => {
    e.persist();
    console.log(e.target.name, e.target.value);

  }


  const cerrarRegistro = (e) => {
    e.preventDefault();
    this.limpiarProveedor();
    // document.getElementById('pop-registrar-user').close();
    //this.limpiarProveedor();
  }

  return (
    <div className="main-cont">

      <h1 className="title-products">PRODUCTOS</h1>
      <hr />
      <form className='form-products'>
        <button className='btn-form' onClick={registrarProducto}>
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
        registrar={registrarProducto}
        detallar={detallarProducto}
        eliminar={eliminarProducto}
        actualizar={actualizarProducto}

      />

      <PopupProducto
        idd='pop-registrar-producto' titulo='Registrar Producto'
      />

      <PopupProducto
        idd='pop-detallar-producto' titulo='Detallar Producto'
      />

      <PopupProducto
        idd='pop-actualizar-producto' titulo='Actualizar Producto'
      />

      <PopUpSiNo
        idd='pop-reg-sino'
        titulo='Eliminar Producto'
        texto={'¿Desea Eliminar el producto?'}
        si={{}}
        no={{}}
        color='var(--success)'
      />

    </div>
  )
}

export default Productos