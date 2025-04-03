import React, { useState } from "react";
import RegistrarContacto from "../components/RegistrarContactoComponent";
import ListaContactos from "../components/ListarContactoComponent";
import BuscarContacto from "../components/BuscadorComponent";

export default function Home() {
    // Estado compartido para el contacto que se está editando
    const [contactoEdit, setContactoEdit] = useState(null);
    const [contactos, setContactos] = useState([]);

    // Función para manejar cuando se selecciona un contacto para editar
    const handleSetContactoEdit = (contacto) => {
        console.log("Home recibió contacto para editar:", contacto);
        setContactoEdit(contacto);
    };

    return (
        <div className="h-screen flex flex-col md:flex-row overflow-hidden">
            {/* Sección Izquierda */}
            <section className="w-full md:w-1/2 bg-[#f8f9fa] flex justify-center items-center p-4 min-h-[50vh] md:min-h-screen">
                <div className="w-full max-w-md flex justify-center items-center">
                    {/* Pasar las props contactoEdit y setContactoEdit */}
                    <RegistrarContacto
                        contactoEdit={contactoEdit}
                        setContactoEdit={setContactoEdit}
                    />
                </div>
            </section>

            {/* Sección Derecha */}
            <section className="w-full md:w-1/2 bg-[#f8f9fa] flex flex-col justify-center items-center min-h-[50vh] md:min-h-screen">
                <div className="w-full h-full md:h-4/5 flex justify-center items-center mb-7">
                    {/* Pasar la prop setContactoEdit a ListaContactos */}
                    <ListaContactos contactos={contactos} setContactos={setContactos} setContactoEdit={handleSetContactoEdit} />
                </div>
            </section>
        </div>
    );
}