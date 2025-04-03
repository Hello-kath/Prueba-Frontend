import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import { obtenerContactos, eliminarContacto } from "../services/contactosService";

const ListaContactos = ({ setContactoEdit, contactos, setContactos }) => {
    // Estado para manejar la lista de contactos
    // Estado para manejar carga y errores
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Estado para manejar el filtro de búsqueda
    const [busqueda, setBusqueda] = useState("");
    // Estado para contactos filtrados
    const [contactosFiltrados, setContactosFiltrados] = useState([]);

    // Función para cargar los contactos desde la API
    const cargarContactos = async () => {
        try {
            setLoading(true);
            const data = await obtenerContactos();
            setContactos(data);
            setContactosFiltrados(data); // Inicialmente los contactos filtrados son todos
            setError(null);
        } catch (error) {
            console.error("Error al cargar contactos:", error);
            setError("No se pudieron cargar los contactos. Intente nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    // Cargar contactos al montar el componente
    useEffect(() => {
        cargarContactos();
    }, []);

    // Efecto para filtrar contactos cuando cambia la búsqueda
    useEffect(() => {
        if (!busqueda.trim()) {
            // Si la búsqueda está vacía, mostrar todos los contactos
            setContactosFiltrados(contactos);
        } else {
            // Filtrar contactos según la búsqueda
            const terminoBusqueda = busqueda.toLowerCase().trim();
            const resultados = contactos.filter(contacto => 
                contacto.nombreContacto.toLowerCase().includes(terminoBusqueda) ||
                contacto.numTelefono.includes(terminoBusqueda) ||
                contacto.correo.toLowerCase().includes(terminoBusqueda)
            );
            setContactosFiltrados(resultados);
        }
    }, [busqueda, contactos]);

    // Función para eliminar un contacto
    const handleEliminarContacto = async (id) => {
        if (window.confirm("¿Está seguro que desea eliminar este contacto?")) {
            try {
                await eliminarContacto(id);
                // Actualizar la lista de contactos después de eliminar
                cargarContactos();
            } catch (error) {
                console.error("Error al eliminar contacto:", error);
                alert("No se pudo eliminar el contacto. Intente nuevamente.");
            }
        }
    };

    // Función para editar un contacto
    const editarContacto = (contacto) => {
        if (typeof setContactoEdit === 'function') {
            // Transformar el contacto al formato esperado por RegistrarContacto
            const contactoTransformado = {
                id: contacto._id, // Usar _id como id
                nombre: contacto.nombreContacto,
                telefono: contacto.numTelefono,
                email: contacto.correo,
                password: ""
            };
            
            console.log("ListaContactos enviando contacto para editar:", contactoTransformado);
            setContactoEdit(contactoTransformado);
        } else {
            console.error("ERROR: setContactoEdit no es una función:", setContactoEdit);
            alert("Error interno: No se puede editar el contacto en este momento.");
        }
    };

    // Función para manejar el cambio en el campo de búsqueda
    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

    return (
        <div className="w-full h-full flex flex-col justify-start items-center bg-slate-50 rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold pb-3 text-[#d24d84]">Lista de Contactos</h2>
            
            {/* Buscador de contactos */}
            <div className="w-full mb-4 relative">
                <div className="relative">
                    <input
                        type="text"
                        className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d24d84] text-base"
                        placeholder="Buscar contacto..."
                        value={busqueda}
                        onChange={handleBusquedaChange}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaSearch className="text-gray-400" />
                    </div>
                </div>
            </div>
            
            {/* Mostrar estado de carga */}
            {loading && (
                <div className="text-center py-8 text-gray-500">
                    Cargando contactos...
                </div>
            )}
            
            {/* Mostrar mensaje de error si existe */}
            {error && (
                <div className="text-center py-4 text-red-500">
                    {error}
                </div>
            )}
            
            {/* Sección con scroll para las cards */}
            <section className="w-full overflow-y-auto max-h-[calc(100%-120px)] pr-1">
                {!loading && !error && contactosFiltrados.length > 0 ? (
                    contactosFiltrados.map((contacto) => (
                        <div 
                            key={contacto._id} 
                            className="bg-white rounded-lg shadow-sm p-3 mb-3"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-gray-700">{contacto.nombreContacto}</h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        <span className="font-medium">Tel:</span> {contacto.numTelefono}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-medium">Correo:</span> {contacto.correo}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => editarContacto(contacto)}
                                        className="text-[#b1a7a6] hover:text-blue-700 p-1 rounded-full hover:bg-gray-100"
                                        title="Editar contacto"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button 
                                        onClick={() => handleEliminarContacto(contacto._id)}
                                        className="text-[#b1a7a6] hover:text-red-700 p-1 rounded-full hover:bg-gray-100"
                                        title="Eliminar contacto"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && !error && (
                        <div className="text-center py-8 text-gray-500">
                            {busqueda.trim() ? 
                                "No se encontraron contactos con ese término" : 
                                "No hay contactos registrados"}
                        </div>
                    )
                )}
            </section>
        </div>
    );
};

export default ListaContactos;