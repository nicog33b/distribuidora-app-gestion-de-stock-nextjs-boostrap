import React, { useState } from 'react';

const AddTypeModal = ({ isOpen, closeModal }) => {
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleAddType = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/types', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tipo,
          description: descripcion,
        }),
      });

      if (response.ok) {

        closeModal();
        window.location.reload()
      } else {
        console.error('Error al agregar el tipo');
      }
    } catch (error) {
      console.error('Error al agregar el tipo:', error);
    }
  };

  return (
    <div className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
            
        

          <div className="mb-4">
            <label htmlFor="tipo" className="block text-gray-700 text-sm font-bold mb-2">Nombre del Tipo</label>
            <input
              type="text"
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full bg-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full bg-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex justify-center mt-4">
            <button onClick={handleAddType} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full mr-4">Crear Tipo</button>
            <button onClick={closeModal} className="bg-gray-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full ">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTypeModal;
