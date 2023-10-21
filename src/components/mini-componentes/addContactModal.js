import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '300px',
  },
};

const AddContactModal = ({ isOpen, closeModal }) => {
  const [contactName, setContactName] = useState('');
  const [contactType, setContactType] = useState('Cliente'); // Inicializa con el tipo "Cliente"
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const handleAddContact = () => {
    // Implementa la lógica para agregar el contacto a tu lista
    // Puedes acceder a los valores de contactName, contactType, contactEmail y contactPhone
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Agregar Contacto"
      className="fixed inset-0 flex items-center justify-center outline-none"
    >
      <div className="bg-white p-4 rounded-lg shadow-lg w-64">
        <h2 className="text-xl font-semibold mb-4">Agregar Contacto</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="contactName" className="block text-sm font-medium text-gray-600">
              Nombre del Contacto
            </label>
            <input
              type="text"
              id="contactName"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contactType" className="block text-sm font-medium text-gray-600">
              Tipo de Contacto
            </label>
            <select
              id="contactType"
              value={contactType}
              onChange={(e) => setContactType(e.target.value)}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value="Cliente">Cliente</option>
              <option value="Proveedor">Proveedor</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-600">
              Email del Contacto
            </label>
            <input
              type="text"
              id="contactEmail"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-600">
              Teléfono del Contacto
            </label>
            <input
              type="text"
              id="contactPhone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleAddContact}
          >
            Agregar Contacto
          </button>
        </form>
        <button
          className="mt-2 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
          onClick={closeModal}
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default AddContactModal;
