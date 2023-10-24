import React, { useState } from 'react';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

const CrearVenta = () => {
  const [tipoTransaccion, setTipoTransaccion] = useState('venta');
  const [campoBusqueda, setCampoBusqueda] = useState('');
  const [tipoCampo, setTipoCampo] = useState('id');
  const [usarFechaActual, setUsarFechaActual] = useState(true);
  const [fechaEspecifica, setFechaEspecifica] = useState(new Date());

  const [productos, setProductos] = useState([]); // Para almacenar los productos encontrados
  const [busqueda, setBusqueda] = useState(''); // Para almacenar la entrada de búsqueda
  const [tipoBusqueda, setTipoBusqueda] = useState('nombre'); // Para seleccionar entre buscar por nombre o ID
  const [productosSeleccionados, setProductosSeleccionados] = useState([]); // Estado para almacenar los productos seleccionados
  const [productosEnTabla, setProductosEnTabla] = useState([]); // Estado para almacenar los productos en la tabla
 // Agregar estado para el lote seleccionado
 const [loteSeleccionado, setLoteSeleccionado] = useState(null);



 
 // Función para manejar la selección de un lote
 const handleLoteSeleccionado = (lote) => {
   setLoteSeleccionado(lote);
 };


  


  const limpiarResultados = () => {
    setProductos([]);
  };
  
  const agregarProductoATabla = (producto) => {
    const nuevoProducto = {
      id: productosEnTabla.length, // Utilizar un valor único temporal como el índice del array
      nombre: producto.nombre,
      cantidad: 1, // Puedes establecer una cantidad inicial
      precioUnitario: producto.precioVenta, // Puedes establecer el precio unitario aquí
    };
    
    setProductosEnTabla([...productosEnTabla, nuevoProducto]);
  };
  
  const actualizarCantidad = (productoId, nuevaCantidad) => {
    const productosActualizados = productosEnTabla.map((producto) => {
      if (producto.id === productoId) {
        return { ...producto, cantidad: nuevaCantidad };
      }
      return producto;
    });
    setProductosEnTabla(productosActualizados);
  };

  const actualizarPrecioUnitario = (productoId, nuevoPrecio) => {
    const productosActualizados = productosEnTabla.map((producto) => {
      if (producto.id === productoId) {
        return { ...producto, precioUnitario: nuevoPrecio };
      }
      return producto;
    });
    setProductosEnTabla(productosActualizados);
  };

  const eliminarProductoDeTabla = (productoId) => {
    const productosActualizados = productosEnTabla.filter((producto) => producto.id !== productoId);
    setProductosEnTabla(productosActualizados);
  };
  const buscarProductos = async () => {
    try {
      if (busqueda.length >= 1) {
        // Realiza una solicitud a tu API para buscar productos por nombre o ID
        const response = await fetch(`http://localhost:3000/api/productos?tipo=${tipoBusqueda}&busqueda=${busqueda}`);
        if (response.status === 200) {
          const productosEncontrados = await response.json();
          // Filtra los productos encontrados para mostrar solo los que coinciden (insensible a mayúsculas y minúsculas)
          const busquedaMinuscula = busqueda.toLowerCase(); // Convertir la búsqueda a minúsculas
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

      <div className="mt-8 flex space-x-4">
        <div className="w-1/4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="tipoCampo">
            Contacto
          </label>
          <select
            id="tipoCampo"
            name="tipoCampo"
            className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={tipoCampo}
            onChange={handleTipoCampoChange}
          >
            <option value="id">ID</option>
            <option value="nombre">Nombre</option>
          </select>
        </div>
        <div className="flex-grow">
          <label className="block text-sm font-medium text-gray-700" htmlFor="campoBusqueda">
            {`Ingrese ${marcadorDePosicionTexto}`}
          </label>
          <input
            type="text"
            id="campoBusqueda"
            name="campoBusqueda"
            className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={campoBusqueda}
            onChange={handleCampoBusquedaChange}
          />
        </div>
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
      onChange={(e) => setBusqueda(e.target.value)}
      placeholder={`Ingrese el ${tipoBusqueda === 'nombre' ? 'nombre' : 'ID'} del producto`}
    />
  </div>
  <button
    onClick={buscarProductos}
    className="p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700"
  >
    Buscar
  </button>
</div>




<div className="mt-4">
  <div className="flex justify-between mb-4">
    <h2 className="text-xl font-semibold text-gray-700"></h2>
    {productos.length > 0 && (
      <button
        onClick={limpiarResultados}
        className="text-indigo-500 hover:underline"
      >
        Limpiar resultados
      </button>
    )}
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productos.map((producto) => (
          <div
            key={producto._id}
            className="mt-4 p-4 border border-gray-300 rounded-md hover:border-green-200 cursor-pointer"
          >
            <p><strong>Nombre:</strong> {producto.nombre}</p>
            <p><strong>Stock Total:</strong> {producto.cantidadStock}</p>
            
            {producto.lotes && producto.lotes.length > 0 && (
              <div>
                <label htmlFor={`lote-select-${producto._id}`}>Seleccione un lote:</label>
                <select
                  id={`lote-select-${producto._id}`}
                  value={loteSeleccionado ? loteSeleccionado._id : ''}
                  onChange={(e) => {
                    const loteId = e.target.value;
                    const lote = producto.lotes.find((l) => l._id === loteId);
                    handleLoteSeleccionado(lote);
                  }}
                >
                  <option value="">Seleccione un lote</option>
                  {producto.lotes.map((lote) => (
                    <option key={lote._id} value={lote._id}>
                      {`Fecha Vencimiento: ${lote.fechaVencimiento}, Cantidad: ${lote.cantidad}`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={() => {
                if (loteSeleccionado) {
                  const productoConLote = { ...producto, lote: loteSeleccionado };
                  agregarProductoATabla(productoConLote);
                  setLoteSeleccionado(null); // Restablecer la selección de lote
                }
              }}
            >
              Agregar a la tabla
            </button>
          </div>
        ))}
      </div>
</div>



      {/* Tabla de productos seleccionados */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700">    </label>
        <table className="mt-2 w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Nombre</th>
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
                  <input
                    type="number"
                    value={!isNaN(producto.cantidad) ? producto.cantidad : ''}
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
                    value={!isNaN(producto.precioUnitario) ? producto.precioUnitario : ''}
                    onChange={(e) => {
                      const newPrecioUnitario = parseFloat(e.target.value);
                      if (!isNaN(newPrecioUnitario)) {
                        actualizarPrecioUnitario(producto.id, newPrecioUnitario);
                      }
                    }}
                  />
                </td>
                <td className="border p-2">{producto.cantidad * producto.precioUnitario}</td>
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
  );
};

export default CrearVenta;
