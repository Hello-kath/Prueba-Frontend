import { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { crearContacto, actualizarContacto } from "../services/contactosService";

const RegistrarContacto = ({ contactoEdit, setContactoEdit }) => {
    const [showPwd, setShowPwd] = useState(false);
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); // Estado para mensajes de éxito
    const [modoEdicion, setModoEdicion] = useState(false);
    const [idEdicion, setIdEdicion] = useState(null);

    // Debugging
    console.log("RegistrarContacto renderizado, contactoEdit:", contactoEdit);

    // Efecto para cargar los datos cuando se selecciona un contacto para editar
    useEffect(() => {
        if (contactoEdit) {
            console.log("RegistrarContacto recibió contacto para editar:", contactoEdit);

            setNombre(contactoEdit.nombre || "");
            setTelefono(contactoEdit.telefono || "");
            setEmail(contactoEdit.email || "");
            setPassword(contactoEdit.password || "");
            setConfirmPassword(contactoEdit.password || "");
            setIdEdicion(contactoEdit.id);
            setModoEdicion(true);
        }
    }, [contactoEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            setLoading(false);
            return;
        }

        try {
            // Preparar los datos según el formato esperado por la API
            const contactoData = {
                nombreContacto: nombre,
                numTelefono: telefono,
                correo: email,
                password: password,
                confirmPassword: confirmPassword
            };

            if (modoEdicion) {
                // Lógica para actualizar el contacto
                console.log("Actualizando contacto:", { id: idEdicion, ...contactoData });
                const respuesta = await actualizarContacto(idEdicion, contactoData);
                console.log("Respuesta del servidor:", respuesta);
                setInterval(() => {
                    setSuccess("Contacto actualizado correctamente");
                }, 1000)
                // Limpiar el formulario y salir del modo edición
                limpiarFormulario();
                
            } else {
                // Lógica para registrar un nuevo contacto
                console.log("Registrando nuevo contacto:", contactoData);
                const respuesta = await crearContacto(contactoData);
                console.log("Respuesta del servidor:", respuesta);
                setSuccess("Contacto registrado correctamente");
                // Limpiar el formulario
                limpiarFormulario();
            }
        } catch (error) {
            console.error("Error en la operación:", error);
            setError(error.message || "Ocurrió un error al procesar la solicitud");
        }
    };

    const limpiarFormulario = () => {
        setNombre("");
        setTelefono("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setModoEdicion(false);
        setIdEdicion(null);

        // Verificar que setContactoEdit es una función antes de llamarla
        if (typeof setContactoEdit === 'function') {
            setContactoEdit(null);
        } else {
            console.error("ERROR: setContactoEdit no es una función en RegistrarContacto");
        }
    };

    const cancelarEdicion = () => {
        limpiarFormulario();
    };

    return (
        <div className="flex justify-center items-center w-full">
            <div className="flex flex-col w-full sm:w-80 md:w-96 justify-center items-center gap-3 bg-slate-50 rounded-lg shadow-lg p-4 mx-auto">
                <h2 className="text-xl font-bold text-[#d24d84]">
                    {modoEdicion ? "Editar Contacto" : "Registrar Contacto"}
                </h2>
                {success && <div className="text-green-500 text-sm text-center">{success}</div>}
                <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-1 text-sm text-gray-500 font-medium">Nombre del contacto</label>
                        <input
                            type="text"
                            id="nombre"
                            className="bg-gray-200 text-sm rounded-lg focus:outline-[#d24d84] focus:ring-1 block w-full p-2"
                            placeholder="Nombre completo"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-gray-500 font-medium">Número de teléfono</label>
                        <input
                            type="text"
                            id="telefono"
                            className="bg-gray-200 text-sm rounded-lg focus:outline-[#d24d84] focus:ring-1 block w-full p-2"
                            placeholder="Ej. 312665489"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-gray-500 font-medium">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-200 text-sm rounded-lg focus:outline-[#d24d84] focus:ring-1 block w-full p-2"
                            placeholder="pere@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-gray-500 font-medium">Contraseña</label>
                        <div className="flex items-center bg-gray-200 rounded-lg">
                            <input
                                type={showPwd ? "text" : "password"}
                                id="password"
                                className="bg-transparent text-sm rounded-lg focus:outline-[#d24d84] block w-full p-2"
                                placeholder="•••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            // required
                            />
                            <div
                                className="pr-3 text-lg text-gray-500 hover:text-[#d24d84] cursor-pointer"
                                onClick={() => setShowPwd(!showPwd)}
                            >
                                {showPwd ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-gray-500 font-medium">Confirmar Contraseña</label>
                        <div className="flex items-center bg-gray-200 rounded-lg">
                            <input
                                type={showConfirmPwd ? "text" : "password"}
                                id="confirmPassword"
                                className="bg-transparent text-sm rounded-lg focus:outline-[#d24d84] block w-full p-2"
                                placeholder="•••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            // required
                            />
                            <div
                                className="pr-3 text-lg text-gray-500 hover:text-[#d24d84] cursor-pointer"
                                onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                            >
                                {showConfirmPwd ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </div>
                        </div>
                    </div>

                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                    <div className="flex justify-center gap-3 mt-2">
                        {modoEdicion ? (
                            <>
                                <button
                                    type="button"
                                    onClick={cancelarEdicion}
                                    className="bg-gray-300 px-3 py-2 rounded-lg hover:scale-105 transition-transform cursor-pointer text-gray-800 font-bold text-sm shadow-md"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#d24d84] px-3 py-2 rounded-lg hover:scale-105 transition-transform cursor-pointer text-white font-bold text-sm shadow-md"
                                >
                                    Guardar Cambios
                                </button>
                            </>
                        ) : (
                            <button
                                type="submit"
                                className="bg-[#d24d84] w-56 px-3 py-2 rounded-lg hover:scale-105 transition-transform cursor-pointer text-white font-bold text-sm shadow-md"
                            >
                                Registrar Contacto
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrarContacto;