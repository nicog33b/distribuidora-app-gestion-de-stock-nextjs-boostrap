import React, { useState, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
const UserSelectionComponent = ({ onUserDataChange, onTransactionTypeChange,}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUsersList, setSelectedUsersList] = useState([]);
    const [transactionDate, setTransactionDate] = useState([]);
    const [transactionTime, setTransactionTime] = useState([]);
    const [transactionType, setTransactionType] = useState('venta'); // Estado para el tipo de transacción (venta por defecto)


    
    // Función para manejar cambios y pasar datos a componente padre
   const handleDataChange = () => {
    onUserDataChange({
      selectedUsersList,
      transactionDate,
      transactionTime,
      transactionType, // Incluir el tipo de transacción en los datos enviados
    });
  };

  // Dentro del useEffect o en cualquier cambio que quieras escuchar
  useEffect(() => {
    handleDataChange(); // Llamar a la función cuando cambie algún dato
  }, [selectedUsersList,transactionDate,transactionTime]);

    const handleDeleteUser = (index) => {
      const updatedUsersList = [...selectedUsersList];
      updatedUsersList.splice(index, 1);
      setSelectedUsersList(updatedUsersList);
    };
  
    const handleSelectUser = (user) => {
      // Verificar si el usuario ya está en la lista
      if (!selectedUsersList.find(selectedUser => selectedUser._id === user._id)) {
        setSelectedUsersList([...selectedUsersList, user]);
        setSearchTerm('')
      } else {
        console.log('El usuario ya está en la lista.');
        // Aquí podrías mostrar un mensaje de que el usuario ya está en la lista si lo deseas
      }
    };
  
    useEffect(() => {
      fetch('http://localhost:3000/api/personas')
        .then(response => response.json())
        .then(data => {
          setUsers(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    useEffect(() => {
      if (searchTerm.trim() === '') {
        setFilteredUsers([]);
      } else {
        const normalizedSearchTerm = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const filtered = users.filter(user =>
          user.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedSearchTerm)
        );
        setFilteredUsers(filtered);
      }
    }, [searchTerm, users]);
  return (
    <div className="max-w-screen-xl mx-auto p-8">


{/*ELEGIR VENTA-COMPRA Y BUSCADOR DE PERSONA*/}
      <div className="flex  items-center w-full mt-4">
    <div className="p-2 border text-center font-serif border-gray-300 w-6/12">
    <select
            name="tipoTransaccion"
            value={transactionType}
            onChange={(e) => {
              setTransactionType(e.target.value);
              onTransactionTypeChange(e.target.value); // Enviar el nuevo valor al componente padre
            }}
            className='w-full'
            
          >
            <option value="venta">Venta</option>
            <option value="compra">Compra</option>
          </select>

    </div>
    <div className="p-2 border text-center font-serif border-gray-300 w-full">
    <input
            className='w-full'
            type="text"
            name="persona"
            placeholder="Buscar Persona (Proveedor/Cliente)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
    </div>
</div>

{/*FINALIZA VENTA-COMPRA Y BUSCADOR DE USUARIO */}


<div className='mt-4 p-2'>


{/*GRID DE PERSONAS FILTRADAS*/}
<div className="grid grid-cols-4 gap-4">
  {/* Mostrar usuarios filtrados */}
  {filteredUsers.map(user => (
    <div key={user._id} onClick={() => handleSelectUser(user)} className="border border-black rounded p-2 text-center hover:bg-lime-100">
      <div className='font-sans text-amber-800'>
        {user.nombre}
      </div>
      <div className='font-sans text-green-950'>
        {user.tipo}
      </div>
    </div>
  ))}
</div>

</div>

{/*TERMINAR USUARIOS FILTRADOS.*/}



{/*EMPIEZA FECHA Y HORA*/}
<div className="mt-4 flex justify-between">
  <input
    className="w-5/12 p-2 border rounded border-gray-300 mr-2"
    type="date"
    placeholder="Fecha de ingreso de la transacción"
    value={transactionDate}
    onChange={(e) => setTransactionDate(e.target.value)}
   
  />
  <input
    className="w-5/12 p-2 border rounded border-gray-300 ml-2"
    type="time"
    placeholder="Hora de ingreso"
    value={transactionTime}
    onChange={(e) => setTransactionTime(e.target.value)}
  />
</div>

{/*TERMINAR FECHA Y HORA */}


{/*TABLA DONDE MUESTRA LOS PERSONAS INGRESADOS */}

<table className="mt-4 border-collapse border border-black w-full">
        <thead>
          <tr className='bg-blue-50 border-black'>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Tipo</th>
            <th className='border p-2'>Telefono</th>
            <th className='border p-2'>Empresa</th>
            <th className='border p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {selectedUsersList.map((user, index) => (
            <tr key={index}>
              <td className="border p-2">{user.nombre}</td>
              <td className="border p-2">{user.tipo}</td>
              <td className="border p-2">{user.telefono}</td>
              <td className="border p-2">{user.empresa}</td>
              <td className='border p-2 flex justify-center items-center'>
  <TrashIcon
    className="h-5 w-5 text-red-600 cursor-pointer"
    onClick={() => handleDeleteUser(index)}
  />
</td>
            </tr>
          ))}
        </tbody>
      </table>

{/*FINAL DE LA TABLA DE PERSONAS */}
    </div>
  )
};

export default UserSelectionComponent;
