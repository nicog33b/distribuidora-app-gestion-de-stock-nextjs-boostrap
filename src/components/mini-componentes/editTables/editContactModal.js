import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

const customStyles = {
  // Estilos personalizados
};

const EditContactModal = ({ isOpen, closeModal, contact, onEditContact }) => {
  const [contactName, setContactName] = useState('');
  const [contactType, setContactType] = useState('cliente');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmpresa, setContactEmpresa] = useState('')
  const [contactEmail, setContactEmail] = useState('');


  useEffect(() => {
    if (contact) {
      // Utiliza los setters para establecer los estados iniciales
      setContactEmpresa(contact.empresa)
      setContactName(contact.nombre);
      setContactType(contact.tipo);
      setContactPhone(contact.telefono);
      setContactEmail(contact.email); 
    }
  }, [contact]);
  const handleEditContact = (event) => {
    event.preventDefault();

    const editedContact = {
      ...contact,
      empresa: contactEmpresa,
      nombre: contactName,
      tipo: contactType,
      telefono: contactPhone,
      email: contactEmail, 
    };

    // Mostrar los datos antes de enviar la solicitud
    console.log('Datos a enviar:', editedContact);

    // Realiza una solicitud PUT para actualizar el contacto
    fetch(`http://vps-3732767-x.dattaweb.com:82/api/personas/${contact._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedContact),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Contacto actualizado exitosamente.');
          closeModal();

          // Muestra una SweetAlert de éxito
          Swal.fire({
            title: 'Éxito',
            text: 'Contacto actualizado exitosamente',
            icon: 'success',
          });

          // Llama a la función de actualización de la tabla
          onEditContact(editedContact);
        } else {
          // Muestra una SweetAlert de error
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al actualizar el contacto',
            icon: 'error',
          });
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud PUT:', error);

        // Muestra una SweetAlert de error en caso de fallo de solicitud
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al actualizar el contacto',
          icon: 'error',
        });
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Editar Contacto"
      className="fixed inset-0 flex items-center justify-center outline-none"
    >
      <div className="bg-white p-4 rounded-lg shadow-lg w-64">
        <h2 className="text-xl font-semibold mb-4">Editar Contacto</h2>
        <form>
        <div className="mb-4">
  <label htmlFor="contactEmpresa" className="block text-sm font-medium text-gray-600">
    Empresa del Contacto
  </label>
  <input
    type="text"
    id="contactEmpresa"
    value={contactEmpresa}
    onChange={(e) => setContactEmpresa(e.target.value)}
    className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
  />
</div>
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
  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-600">
    Correo Electrónico del Contacto
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
            <label htmlFor="contactType" className="block text-sm font-medium text-gray-600">
              Tipo de Contacto
            </label>
            <select
              id="contactType"
              value={contactType}
              onChange={(e) => setContactType(e.target.value)}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value="cliente">Cliente</option>
              <option value="proveedor">Proveedor</option>
            </select>
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
            className="bg-blue-500 text-white py-2 px-4 rounded hover-bg-blue-600"
            onClick={handleEditContact}
          >
            Guardar Cambios
          </button>
        </form>
        <button
          className="mt-2 bg-gray-300 text-gray-700 py-2 px-4 rounded hover-bg-gray-400"
          onClick={closeModal}
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default EditContactModal;
