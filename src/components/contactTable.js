import React, { useState, useEffect } from 'react';
import AddContactModal from './mini-componentes/addContactModal';
import EditContactModal from './mini-componentes/editTables/editContactModal'; // Importa el nuevo componente
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/solid';

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [isAddContactModalOpen, setAddContactModalOpen] = useState(false);
  const [isEditContactModalOpen, setEditContactModalOpen] = useState(false); // Controla si se muestra el modal de edición
  const [selectedContact, setSelectedContact] = useState(null); // Almacena el contacto seleccionado para editar
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isTableRefreshing, setTableRefreshing] = useState(false);

  useEffect(() => {
    // Función para cargar contactos desde la API
    const loadContacts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/personas');
        if (response.ok) {
          const data = await response.json();
          setContacts(data);
          setFilteredContacts(data);
        } else {
          console.error('Error al cargar contactos desde la API');
        }
      } catch (error) {
        console.error('Error al cargar contactos desde la API:', error);
      }
    };

    // Llamar a la función para cargar contactos
    loadContacts();
  }, [isTableRefreshing]);

  const openAddContactModal = () => {
    setAddContactModalOpen(true);
  };

  const closeAddContactModal = () => {
    setAddContactModalOpen(false);
  };

  const openEditContactModal = (contact) => {
    setSelectedContact(contact);
    setEditContactModalOpen(true);
  };

  const closeEditContactModal = () => {
    setSelectedContact(null);
    setEditContactModalOpen(false);
  };

  const handleEditContact = (editedContact) => {
    const updatedContacts = contacts.map((contact) =>
      contact._id === editedContact._id ? editedContact : contact
    );
    setContacts(updatedContacts);
    setFilteredContacts(updatedContacts);
    closeEditContactModal();
  };

  const handleSearch = () => {
    const searchResults = contacts.filter((contact) => {
      return (
        contact._id.includes(searchTerm) ||
        contact.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredContacts(searchResults);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredContacts(contacts);
  };

  const handleDeleteContact = async (contactId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/personas/${contactId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTableRefreshing(!isTableRefreshing); // Actualiza el valor para recargar la tabla
      } else {
        console.error('Error al eliminar el contacto');
      }
    } catch (error) {
      console.error('Error en la solicitud DELETE:', error);
    }
  };

  return (
    <div className="p-2">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex w-12/12">
          <input
            type="text"
            placeholder="Buscar contactos"
            className="p-2 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded-lg ml-2"
          >
            <MagnifyingGlassIcon className="w-4 h-4" />
          </button>
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="bg-gray-500 text-white p-2 rounded-lg ml-2"
            >
              Limpiar búsqueda
            </button>
          )}
        </div>
        <div>
          <button onClick={openAddContactModal} className="bg-green-500 text-white p-2 rounded">
            <PlusIcon className="h-4 w-4" />
          </button>
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
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <tr key={contact._id}>
                <td className="p-2 border border-gray-300">{contact._id}</td>
                <td className="p-2 border border-gray-300">{contact.nombre}</td>
                <td className="p-2 border border-gray-300">{contact.tipo}</td>
                <td className="p-2 border border-gray-300">{contact.email}</td>
                <td className="p-2 border border-gray-300">{contact.telefono}</td>
                <td className="p-2 border border-gray-300 text-center">
                  <button
                    onClick={() => openEditContactModal(contact)} // Abre el modal de edición con el contacto seleccionado
                    className="bg-yellow-500 text-white p-2 rounded-lg mr-2"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteContact(contact._id)}
                    className="bg-red-500 text-white p-2 rounded-lg mr-2"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                  <button className="bg-green-500 text-white p-2 rounded-lg">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No se encontraron contactos.</td>
            </tr>
          )}
        </tbody>
      </table>

      <AddContactModal isOpen={isAddContactModalOpen} closeModal={closeAddContactModal} />
      <EditContactModal
        isOpen={isEditContactModalOpen}
        closeModal={closeEditContactModal}
        contact={selectedContact}
        onEditContact={handleEditContact} // Pasa la función para manejar la edición
      />
    </div>
  );
};

export default ContactTable;
