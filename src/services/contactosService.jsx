
const APICONTACTOS = '/api/contactos';
const APIBUSCAR = '/api/buscar';

// Funcion para manejar errores en las peticiones fetch
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
            errorData?.message || `Error: ${response.status} ${response.statusText}`
        );
    }
    return response.json();
};


// registrar un contacto
export const crearContacto = async (contactoData) => {
    try {
        const response = await fetch(`${APICONTACTOS}/registrar`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactoData),
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error al crear contacto:', error);
        throw error;
    }
};


//Funcion para login 
export const login = async (usuarioData) => {
    try {
        const response = await fetch(`${APICONTACTOS}/login`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarioData),
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};


// Obtener todos los contactos
export const obtenerContactos = async () => {
    try {
        const response = await fetch(`${APICONTACTOS}/listar`, {
            method: 'GET',
        });
        // Obtener los datos JSON de la respuesta
        const data = await response.json();
        // Verificar si la respuesta tiene el formato esperado
        if (data && data.contactos) {
            return data.contactos;
        }
        return data;
    } catch (error) {
        console.error('Error al obtener contactos:', error);
        throw error;
    }
};


// Actualizar un contacto existente
export const actualizarContacto = async (id, contactoData) => {
    try {
        const response = await fetch(`${APICONTACTOS}/contacto/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactoData),
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error al actualizar contacto:', error);
        throw error;
    }
};

// Eliminar un contacto
export const eliminarContacto = async (id) => {
    try {
        const response = await fetch(`${APICONTACTOS}/contacto/${id}`, { 
            method: 'DELETE',
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error al eliminar contacto:', error);
        throw error;
    }
};

// Buscar contactos
export const buscarContactos = async (termino) => {
    try {
        const response = await fetch(`${APIBUSCAR}/buscarC?termino=${termino}`);
        return handleResponse(response);
    } catch (error) {
        console.error('Error al buscar contactos:', error);
        throw error;
    }
};
