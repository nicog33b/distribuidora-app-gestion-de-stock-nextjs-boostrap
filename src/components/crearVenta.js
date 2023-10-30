import React, { useState, useEffect } from 'react';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

const CrearVenta = () => {
  const [tipoTransaccion, setTipoTransaccion] = useState('venta');
  const [campoBusqueda, setCampoBusqueda] = useState('');
  const [tipoCampo, setTipoCampo] = useState('id');
  const [usarFechaActual, setUsarFechaActual] = useState(true);
  const [fechaEspecifica, setFechaEspecifica] = useState(new Date());
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [tipoBusqueda, setTipoBusqueda] = useState('nombre');
  const [productosEnTabla, setProductosEnTabla] = useState([]);
  const [personasEncontradas, setPersonasEncontradas] = useState([]);
  const [personaSeleccionada, setPersonaSeleccionada] = useState(null);
  const [personasEnTabla, setPersonasEnTabla] = useState([]);
  
  const buscarPersonas = async (valorBusqueda) => {
    try {
      if (valorBusqueda.length >= 1) {
        const response = await fetch(`http://localhost:3000/api/personas?tipo=${tipoCampo}&busqueda=${valorBusqueda}`);
        if (response.status === 200) {
          const personas = await response.json();
          
          // Filtrar los usuarios según el nombre
          const busquedaMinuscula = valorBusqueda.toLowerCase();
          const personasFiltradas = personas.filter(persona => persona.nombre.toLowerCase().includes(busquedaMinuscula));
          
          setPersonasEncontradas(personasFiltradas);
        } else {
          setPersonasEncontradas([]);
        }
      } else {
        setPersonasEncontradas([]);
      }
    } catch (error) {
      console.error('Error al buscar personas', error);
    }
  };
  
  const handleBusquedaChange = (e) => {
    const valorBusqueda = e.target.value;
    setBusqueda(valorBusqueda);
  
    if (valorBusqueda === '') {
      setPersonasEncontradas([]); // Establecer como array vacío si el campo de búsqueda está vacío
    } else {
      buscarPersonas(valorBusqueda);
    }
  };

  
  const handlePersonaSeleccionada = (persona) => {
    setPersonaSeleccionada(persona);
  };
  
  const agregarPersonaATabla = (persona) => {
    setPersonasEnTabla([...personasEnTabla, persona]);
  };
  
  useEffect(() => {
    buscarPersonas(campoBusqueda);
  }, [campoBusqueda, tipoCampo]);

 

  const buscarProductos = async () => {
    try {
      if (busqueda.length >= 1) {
        const response = await fetch(`http://localhost:3000/api/productos?tipo=${tipoBusqueda}&busqueda=${busqueda}`);
        if (response.status === 200) {
          const productosEncontrados = await response.json();
          const busquedaMinuscula = busqueda.toLowerCase();
          const productosFiltrados = productosEncontrados.filter(producto => producto.nombre.toLowerCase().includes(busquedaMinuscula));
          setProductos(productosFiltrados);
        } else {
          setProductos([]);
        }
      } else {
        setProductos([]);
      }
    } catch (error) {
      console.error('Error al buscar productos', error);
    }
  };

  useEffect(() => {
    const delayDeBusqueda = setTimeout(() => {
      buscarProductos();
    }, 500);

    return () => clearTimeout(delayDeBusqueda);
  }, [busqueda]);

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


  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <div className="flex items-center mt-4">
        <button className="flex items-center rounded border border-black p-2">
          <ArrowUturnLeftIcon className="w-3 h-3 mr-1" />
          <span>Transacciones</span>
        </button>
      </div>
  
      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700" htmlFor="tipoTransaccion">
          Tipo de Transacción
        </label>
        <select
          id="tipoTransaccion"
          name="tipoTransaccion"
          className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={tipoTransaccion}
          onChange={handleTipoTransaccionChange}
        >
          <option value="venta">Venta</option>
          <option value="compra">Compra</option>
        </select>
      </div>
  
      <div className="mt-8">
  <div className="flex space-x-4">
  
    <div className="flex-grow">
      <label className="block text-sm font-medium text-gray-700" htmlFor="campoBusquedaPersona">
        {`Ingrese personas asociadas`}
      </label>
      <input
        type="text"
        id="campoBusquedaPersona"
        name="campoBusquedaPersona"
        className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={campoBusqueda}
        onChange={handleCampoBusquedaChange}
      />
    </div>
  </div>

  <div className="mt-4">
    <table className="w-full">
      <thead>
        <tr>
          <th className="p-2"></th>
          <th className="p-2"></th>
        </tr>
      </thead>
      <tbody>
        {personasEncontradas.map((persona) => (
          <tr key={persona._id} className="cursor-pointer hover:bg-gray-100" onClick={() => agregarPersonaATabla(persona)}>
            <td className="p-2">{persona.nombre}</td>
            <td className="p-2">{persona.tipo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Mini tarjeta de personas seleccionadas */}
  {personasEnTabla.length > 0 && (
    <div className="mt-8">
      <h2 className="text-lg font-semibold">Personas Seleccionadas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {personasEnTabla.map((persona) => (
          <div key={persona._id} className="p-4 border border-gray-300 rounded-md">
            <p><strong>Nombre:</strong> {persona.nombre}</p>
            <p><strong>Tipo:</strong> {persona.tipo}</p>
            <button
              onClick={() => eliminarPersonaDeTabla(persona._id)}
              className="p-1 text-red-500 mt-2"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
  
      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700" htmlFor="usarFechaActual">
          Fecha de Transacción
        </label>
        <div className="mt-2 flex items-center space-x-2">
          <input
            type="checkbox"
            id="usarFechaActual"
            name="usarFechaActual"
            className="rounded border border-gray-300"
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
            className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={fechaEspecifica}
            onChange={handleFechaEspecificaChange}
            min={fechaMinima}
            max={fechaMaxima}
          />
        )}
      </div>
  
      <div className="mt-8 flex space-x-4">
        <div className="flex mt-2">
          <label htmlFor="tipoBusqueda" className="block text-sm font-medium text-gray-700">
            Producto
          </label>
        </div>
        <div className="flex-grow mt-2">
           <input
            type="text"
            id="busqueda"
            name="busqueda"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={busqueda}
            onChange={handleBusquedaChange}
            placeholder={`Ingrese el ${tipoBusqueda === 'nombre' ? 'nombre' : 'ID'} del producto`}
          />

        </div>
       
      </div>
  
      <div className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="mt-4 p-4 border border-gray-300 rounded-md hover:border-green-200 cursor-pointer"
              onClick={() => agregarProductoATabla(producto)}
            >
              <p><strong>Nombre:</strong> {producto.nombre}</p>
              <p><strong>Stock Total:</strong> {producto.cantidadStock}</p>
            </div>
          ))}
        </div>
      </div>
  
      {/* Tabla de productos seleccionados */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700"></label>
        <table className="mt-2 w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Lote</th>
              <th className="border p-2">Cantidad</th>
              <th className="border p-2">Precio Unitario</th>
              <th className="border p-2">Total</th>
              <th className="border p-2"></th>
            </tr>
          </thead>
          <tbody>
            {productosEnTabla.map((producto) => (
              <tr key={producto.id}>
                <td className="border p-2">{producto.nombre}</td>
                <td className="border p-2">
                  <select
                    value={producto.lote}
                    onChange={(e) => {
                      const newLote = e.target.value;
                      const productosActualizados = productosEnTabla.map((item) => {
                        if (item.id === producto.id) {
                          const nuevoProducto = { ...item, lote: newLote, cantidad: 1 };
                          nuevoProducto.total = nuevoProducto.precioUnitario;
                          return nuevoProducto;
                        }
                        return item;
                      });
                      setProductosEnTabla(productosActualizados);
                    }}
                  >
                    {producto.lotesDisponibles && producto.lotesDisponibles.map((lote) => (
                      <option key={lote.nombre} value={lote.nombre}>
                        {lote.nombre}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={producto.cantidad}
                    onChange={(e) => {
                      const newCantidad = parseInt(e.target.value);
                      if (!isNaN(newCantidad)) {
                        actualizarCantidad(producto.id, newCantidad);
                      }
                    }}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={producto.precioUnitario}
                    onChange={(e) => {
                      const newPrecioUnitario = parseFloat(e.target.value);
                      if (!isNaN(newPrecioUnitario)) {
                        actualizarPrecioUnitario(producto.id, newPrecioUnitario);
                      }
                    }}
                  />
                </td>
                <td className="border p-2">{producto.total}</td>
                <td className="border p-2">
                  <button
                    onClick={() => eliminarProductoDeTabla(producto.id)}
                    className="p-1 text-red-500"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      <div className="flex justify-center mt-4">
        <button
          className="bg-indigo-500 text-white rounded-md p-2 hover:bg-indigo-700"
          onClick={() => console.log(productosEnTabla)}
        >
          Finalizar
        </button>
      </div>
    </div>
  )};

export default CrearVenta;
