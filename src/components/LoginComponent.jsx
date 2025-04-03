import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { login } from "../services/contactosService"; 

const Login = () => {
    const [showPwd, setShowPwd] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Para mostrar errores de login
    const [loading, setLoading] = useState(false); // Para mostrar estado de carga
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Limpiamos errores previos
        setLoading(true); // Activamos estado de carga

        try {
            // Preparamos el objeto con los datos para enviar al backend
            const usuarioData = {
                correo: email,
                password: password
            };

            // Llamamos a la función login del servicio
            const response = await login(usuarioData);
            
            // Si el login es exitoso
            if (response) {
                // Guardamos el token o información de sesión si el backend lo proporciona
                if (response.token) {
                    localStorage.setItem('token', response.token);
                }
                
                // Guardamos información del usuario si es necesario
                if (response.usuario) {
                    localStorage.setItem('usuario', JSON.stringify(response.usuario));
                }
                
                // Redirigimos a la página principal
                navigate("/home");
            }
        } catch (error) {
            // Mostramos el mensaje de error
            setError(error.message || "Error al iniciar sesión. Verifica tus credenciales.");
        } finally {
            setLoading(false); // Desactivamos estado de carga
        }
    };

    return (
        <main className="min-h-screen w-full flex justify-center items-center bg-[#f1e4f3]">
            <div className="flex flex-col w-full max-w-md p-8 justify-center items-center gap-6 bg-slate-50 rounded-lg shadow-2xl mx-auto my-auto">
                <h2 className="text-3xl font-bold text-[#d13e84]">Iniciar Sesión</h2>
                
                {error && (
                    <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}
                
                <form className="w-full flex flex-col gap-5" onSubmit={handleLogin}>
                    <div>
                        <label className="block mb-1 text-gray-500 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-200 text-sm rounded-lg focus:outline-[#d13e84] focus:ring-1 focus:ring-[#d13e84] block w-full p-3"
                            placeholder="Tu email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-500 font-medium">Contraseña</label>
                        <div className="flex items-center bg-gray-200 rounded-lg">
                            <input
                                type={showPwd ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-transparent focus:outline-[#d13e84] rounded-lg block w-full p-3"
                                placeholder="•••••••••"
                                required
                            />
                            <div
                                className="pr-3 text-xl text-gray-500 hover:text-[#d13e84] cursor-pointer"
                                onClick={() => setShowPwd(!showPwd)}
                            >
                                {showPwd ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`mx-20 bg-[#d13e84] px-4 py-3 rounded-lg hover:scale-105 cursor-pointer text-white font-bold text-lg shadow-md w-56 ${loading ? 'opacity-70' : ''}`}
                    >
                        {loading ? "Iniciando..." : "Ingresar"}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Login;
