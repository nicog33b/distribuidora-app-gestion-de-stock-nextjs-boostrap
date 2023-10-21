import React from 'react';
import { useState } from 'react';
import AddContactModal from './mini-componentes/addContactModal'; // Asegúrate de importar el modal de contacto correspondiente
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/solid';

const ContactTable = () => {
  // Datos de ejemplo de contactos
  const contacts = [
    {
      id: 1,
      name: 'Cliente 1',
      type: 'Cliente',
      email: 'cliente1@example.com',
      phone: '123-456-7890',
    },
    {
      id: 2,
      name: 'Proveedor 1',
      type: 'Proveedor',
      email: 'proveedor1@example.com',
      phone: '987-654-3210',
    },
    // Agrega más contactos aquí...
  ];

  const [isAddContactModalOpen, setAddContactModalOpen] = useState(false);

  const openAddContactModal = () => {
    setAddContactModalOpen(true);
  };

  const closeAddContactModal = () => {
    setAddContactModalOpen(false);
  };

  return (
    <div className="p-2">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex w-12/12">
          <input
            type="text"
            placeholder="Buscar contactos"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <button className="bg-blue-500 text-white p-2 rounded-lg ml-2">
            <MagnifyingGlassIcon className="w-4 h-4" />
          </button>
        </div>
        <div>
          <button onClick={openAddContactModal} className="bg-green-500 text-white p-2 rounded">
            <PlusIcon className="h-4 w-4" />
          </button>
          <AddContactModal isOpen={isAddContactModalOpen} closeModal={closeAddContactModal} />
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Email</th>
            <th className="p-2">Teléfono</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td className="p-2 border border-gray-300">{contact.id}</td>
              <td className="p-2 border border-gray-300">{contact.name}</td>
              <td className="p-2 border border-gray-300">{contact.type}</td>
              <td className="p-2 border border-gray-300">{contact.email}</td>
              <td className="p-2 border border-gray-300">{contact.phone}</td>
              <td className="p-2 border border-gray-300 text-center">
                <button className="bg-yellow-500 text-white p-2 rounded-lg mr-2">
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button className="bg-red-500 text-white p-2 rounded-lg mr-2">
                  <TrashIcon className="h-4 w-4" />
                </button>
                <button className="bg-green-500 text-white p-2 rounded-lg">
                  <EyeIcon className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
