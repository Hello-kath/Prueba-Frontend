import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const BuscadorContacto = ({ }) => {
    const [busqueda, setBusqueda] = useState("");
    const [sugerencias, setSugerencias] = useState([]);
    const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [contactoSeleccionado, setContactoSeleccionado] = useState(null);
    const [cargando, setCargando] = useState(false);
    const sugerenciasRef = useRef(null);
    
    // Datos simulados para autocompletado
    const contactos = [
        { id: 1, nombre: "Ana García", telefono: "123-456-7890", email: "ana.garcia@example.com" },
        { id: 2, nombre: "Luis Rodríguez", telefono: "098-765-4321", email: "luis.rodriguez@example.com" },
        { id: 3, nombre: "María López", telefono: "555-123-4567", email: "maria.lopez@example.com" },
        { id: 4, nombre: "Carlos Martínez", telefono: "777-888-9999", email: "carlos.martinez@example.com" },
        { id: 5, nombre: "Sofía Hernández", telefono: "222-333-4444", email: "sofia.hernandez@example.com" },
    ];

    useEffect(() => {
        // Manejador para cerrar sugerencias al hacer clic fuera
        const handleClickOutside = (event) => {
            if (sugerenciasRef.current && !sugerenciasRef.current.contains(event.target)) {
                setMostrarSugerencias(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        // Mostrar sugerencias solo cuando hay 3 o más caracteres
        if (busqueda.length >= 3) {
            const resultadosFiltrados = contactos.filter(contacto => 
                contacto.nombre.toLowerCase().includes(busqueda.toLowerCase())
            );
            setSugerencias(resultadosFiltrados);
            setMostrarSugerencias(true);
        } else {
            setSugerencias([]);
            setMostrarSugerencias(false);
        }
    }, [busqueda]);

    const buscarContacto = async (contactoId) => {
        setCargando(true);
        
        try {
            // Simulación de una petición al backend
            await new Promise(resolve => setTimeout(resolve, 600));
            
            // En un caso real, esto sería una llamada fetch al backend
            const contactoEncontrado = contactos.find(c => c.id === contactoId);
            setContactoSeleccionado(contactoEncontrado);
            setModalAbierto(true);
        } catch (error) {
            console.error("Error al buscar contacto:", error);
        } finally {
            setCargando(false);
        }
    };

    const seleccionarSugerencia = (contacto) => {
        setBusqueda(contacto.nombre);
        setMostrarSugerencias(false);
        buscarContacto(contacto.id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Si hay sugerencias y corresponde exactamente a una búsqueda
        if (sugerencias.length > 0) {
            // Buscar coincidencia exacta primero
            const coincidenciaExacta = sugerencias.find(
                s => s.nombre.toLowerCase() === busqueda.toLowerCase()
            );
            
            // Si hay coincidencia exacta usar esa, sino la primera sugerencia
            const contactoParaBuscar = coincidenciaExacta || sugerencias[0];
            buscarContacto(contactoParaBuscar.id);
        }
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setContactoSeleccionado(null);
    };

    return (
        <div className="w-full mx-auto relative">
            {/* Buscador */}
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                    <input
                        type="text"
                        className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-20 py-3 focus:outline-none focus:ring-2 focus:ring-[#d24d84] text-base"
                        placeholder="Buscar contacto..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        onClick={() => busqueda.length >= 3 && setMostrarSugerencias(true)}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaSearch className="text-gray-400" />
                    </div>
                    <button
                        type="submit"
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#d24d84] font-medium"
                    >
                        Buscar
                    </button>
                </div>
                
                {/* Lista de sugerencias */}
                {mostrarSugerencias && sugerencias.length > 0 && (
                    <div 
                        ref={sugerenciasRef}
                        className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
                    >
                        {sugerencias.map((sugerencia) => (
                            <div
                                key={sugerencia.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => seleccionarSugerencia(sugerencia)}
                            >
                                {sugerencia.nombre}
                            </div>
                        ))}
                    </div>
                )}
            </form>

            {/* Modal emergente centrado */}
            {modalAbierto && (
                <div className="fixed inset-0 bg-opacity-5 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm mx-4 overflow-hidden animate-fadeIn">
                        {/* Encabezado del modal */}
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-800">Detalle del Contacto</h3>
                            <button 
                                onClick={cerrarModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        
                        {/* Contenido del modal */}
                        <div className="px-6 py-4">
                            {contactoSeleccionado ? (
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-gray-700 text-base">
                                        {contactoSeleccionado.nombre}
                                    </h4>
                                    <div className="border-t border-gray-100 pt-2">
                                        <p className="text-sm text-gray-600 mb-1">
                                            <span className="font-medium">Tel:</span> {contactoSeleccionado.telefono}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Correo:</span> {contactoSeleccionado.email}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-center text-gray-500">No se encontró información del contacto</p>
                            )}
                        </div>
                        
                    </div>
                </div>
            )}
            
            {/* Indicador de carga */}
            {cargando && (
                <div className="fixed inset-0 bg-opacity-10 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <div className="animate-spin h-8 w-8 border-4 border-[#d24d84] border-t-transparent rounded-full mx-auto"></div>
                        <p className="mt-2 text-gray-600">Buscando...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuscadorContacto;