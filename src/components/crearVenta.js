import React, { useState } from 'react';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

const CrearVenta = () => {
  const [tipoTransaccion, setTipoTransaccion] = useState('venta');
  const [campoBusqueda, setCampoBusqueda] = useState('');
  const [tipoCampo, setTipoCampo] = useState('id');
  const [usarFechaActual, setUsarFechaActual] = useState(true);
  const [fechaEspecifica, setFechaEspecifica] = useState(new Date());

  const [productos, setProductos] = useState([]); // Para almacenar los productos seleccionados
const [busqueda, setBusqueda] = useState(''); // Para almacenar la entrada de búsqueda
const [tipoBusqueda, setTipoBusqueda] = useState('nombre'); // Para seleccionar entre buscar por nombre o ID


const buscarProductos = async () => {
    try {
      // Realiza una solicitud a tu API para buscar productos por nombre o ID
      const response = await fetch(`http://localhost:3000/api/productos?tipo=${tipoBusqueda}&busqueda=${busqueda}`);
      if (response.status === 200) {
        const productosEncontrados = await response.json();
        setProductos(productosEncontrados);
      } else {
        setProductos([]);
      }
    } catch (error) {
      console.error('Error al buscar productos', error);
    }
  };

  
  const handleTipoTransaccionChange = (e) => {
    setTipoTransaccion(e.target.value);
  };

  const handleCampoBusquedaChange = (e) => {
    setCampoBusqueda(e.target.value);
  };

  const handleTipoCampoChange = (e) => {
    setTipoCampo(e.target.value);
  };

  const handleUsarFechaActualChange = (e) => {
    setUsarFechaActual(e.target.checked);
  };

  const handleFechaEspecificaChange = (e) => {
    const dateValue = e.target.value;
    setFechaEspecifica(new Date(dateValue));
  };

  

  const marcadorDePosicionTexto = tipoTransaccion === 'venta' ? 'Cliente' : 'Proveedor';

  const fechaMinima = '2023-01-01';
const fechaMaxima = new Date().toISOString().split('T')[0];
  return (
    <div>
      <div className="flex items-center mt-4 ml-4">
        <button className='flex items-center rounded border border-black p-2'>
          <ArrowUturnLeftIcon className='w-3 h-3 mr-1'></ArrowUturnLeftIcon>
          <span>Ventas</span>
        </button>
      </div>

      <div className="mt-8 ml-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="tipoTransaccion">
          Tipo de Transacción
        </label>
        <select
          id="tipoTransaccion"
          name="tipoTransaccion"
          className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={tipoTransaccion}
          onChange={handleTipoTransaccionChange}
        >
          <option value="venta">Venta</option>
          <option value="compra">Compra</option>
        </select>
      </div>

      <div className="mt-8 ml-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="tipoCampo">
          Contacto 
        </label>
        <select
          id="tipoCampo"
          name="tipoCampo"
          className="mt-2 w-8/12 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={tipoCampo}
          onChange={handleTipoCampoChange}
        >
          <option value="id">ID</option>
          <option value="nombre">Nombre</option>
        </select>
        <input
          type="text"
          id="campoBusqueda"
          name="campoBusqueda"
          className="mt-2 ml-2 flex-grow border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={campoBusqueda}
          onChange={handleCampoBusquedaChange}
          placeholder={`Ingrese ${marcadorDePosicionTexto}`}
        />
      </div>

      <div className="mt-8 ml-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="usarFechaActual">
          Fecha de Transacción
        </label>
        <div className="mt-2 flex items-center space-x-2">
          <input
            type="checkbox"
            id="usarFechaActual"
            name="usarFechaActual"
            className="rounded border-gray-300"
            checked={usarFechaActual}
            onChange={handleUsarFechaActualChange}
          />
          <label className="text-sm text-gray-700" htmlFor="usarFechaActual">
            Usar Fecha Actual
          </label>
        </div>
  {!usarFechaActual && (
  <input
    type="date"
    id="fechaEspecifica"
    name="fechaEspecifica"
    className="mt-2 block w-4/12 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    value={fechaEspecifica}
    onChange={handleFechaEspecificaChange}
    min={fechaMinima}
    max={fechaMaxima}
  />

  
)}
      </div>

      <div className="mt-8 ml-4">
  <label className="block text-sm font-medium text-gray-700" htmlFor="tipoCampo">
    Producto
  </label>
  <div className="mt-2 flex items-center space-x-2">
    <select
      id="tipoBusqueda"
      name="tipoBusqueda"
      className="rounded border-gray-300"
      value={tipoBusqueda}
      onChange={(e) => setTipoBusqueda(e.target.value)}
    >
      <option value="nombre">Nombre</option>
      <option value="id">ID</option>
    </select>
    <input
      type="text"
      id="busqueda"
      name="busqueda"
      className="flex-grow border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
      placeholder={`Ingrese el ${tipoBusqueda === 'nombre' ? 'nombre' : 'ID'} del producto`}
    />
    <button onClick={buscarProductos} className="px-3 py-2 bg-indigo-500 text-white rounded-md">Buscar</button>
  </div>
</div>


<div className="mt-8 ml-4">
  <label className="block text-sm font-medium text-gray-700" htmlFor="productosEncontrados">
    Productos Encontrados
  </label>
  <ul className="mt-2">
    {productos.map((producto) => (
      <li key={producto.id}>
        {producto.nombre} (ID: {producto.id})
        <button onClick={() => agregarProducto(producto)}>Agregar</button>
      </li>
    ))}
  </ul>
</div>


    </div>
  );
};

export default CrearVenta;
