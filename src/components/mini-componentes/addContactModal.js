import { emit } from 'process';
import React, { useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

const customStyles = {
  // Estilos personalizados
};

const AddContactModal = ({ isOpen, closeModal }) => {
  const [empresaName, setEmpresaName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactType, setContactType] = useState('cliente');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const handleAddContact = () => {
    event.preventDefault();
    const newContact = {
      empresa:empresaName,
      nombre: contactName,
      tipo: contactType,
      email: contactEmail,
      telefono: contactPhone,
    };

    // Mostrar los datos antes de enviar la solicitud
    console.log('Datos a enviar:', newContact);

    // Realiza una solicitud para verificar si el correo electrónico ya existe
    fetch('http://vps-3732767-x.dattaweb.com:82/personas')
      .then((response) => response.json())
      .then((data) => {
        if (data.some((persona) => persona.email === contactEmail)) {
          // Muestra una SweetAlert si el correo electrónico ya está registrado
          Swal.fire({
            title: 'Error',
            text: 'Este correo electrónico ya está registrado',
            icon: 'error',
          });
        } else {
          // Si el correo electrónico no está registrado, procede con la inserción
          fetch('http://vps-3732767-x.dattaweb.com:82/api/personas', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newContact),
          })
            .then((response) => {
              if (response.ok) {
                console.log('Contacto agregado exitosamente.');
                closeModal();

                // Muestra una SweetAlert de éxito
                Swal.fire({
                  title: 'Éxito',
                  text: 'Contacto agregado exitosamente',
                  icon: 'success',
                });

                // Recargar la página para refrescar la tabla
                window.location.reload();
              } else {
                // Muestra una SweetAlert de error
                Swal.fire({
                  title: 'Error',
                  text: 'Hubo un problema al agregar el contacto',
                  icon: 'error',
                });
              }
            })
            .catch((error) => {
              console.error('Error en la solicitud POST:', error);

              // Muestra una SweetAlert de error en caso de fallo de solicitud
              Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al agregar el contacto',
                icon: 'error',
              });
            });
        }
      })
      .catch((error) => {
        console.error('Error al verificar el correo electrónico:', error);
      });
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
            <label htmlFor="empresaName" className="block text-sm font-medium text-gray-600">
              Empresa
            </label>
            <input
              type="text"
              id="empresaName"
              value={empresaName}
              onChange={(e) => setEmpresaName(e.target.value)}
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
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-600">
              Email del Contacto
            </label>
            <input
              type="email"
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
            className="bg-blue-500 text-white py-2 px-4 rounded hover-bg-blue-600"
            onClick={handleAddContact}
          >
            Agregar Contacto
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

export default AddContactModal;
