import React, { useState } from "react";
import ListaContactos from "../components/ListarContactoComponent";
import RegistrarContacto from "../components/RegistrarContactoComponent";

const editarContacto = () => {
    // Estado compartido para el contacto que se está editando
    const [contactoEdit, setContactoEdit] = useState(null);

    // Función de edición con debugging
    const handleSetContactoEdit = (contacto, cargarContactos) => {
        console.log("AppComponent recibió contacto para editar:", contacto);
        setContactoEdit(contacto); 
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center text-[#d24d84] mb-6">
                Gestor de Contactos
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Componente para registrar/editar contactos */}
                <div>
                    <RegistrarContacto
                        contactoEdit={contactoEdit}
                        setContactoEdit={setContactoEdit}
                    />
                </div>

                {/* Componente para listar contactos */}
                <div>
                    <ListaContactos setContactoEdit={handleSetContactoEdit} />
                </div>
            </div>
        </div>
    );
};

export default editarContacto;