"use client";

import { useState, useContext, createContext, useEffect } from "react";

import {
    getClientesRequest,
    getClienteRequest,
    updateClienteRequest,
    deleteClienteRequest,
    createClienteRequest,
} from "../api/cliente";

const ClienteContext = createContext();

export const useCliente = () => {
    const context = useContext(ClienteContext);

    if (!context) {
        throw new Error("El useCliente debe estar dentro de un ClienteProvider");
    }

    return context;
};

export function ClienteProvider({ children }) {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const handleError = (error, defaultMessage) => {
        setErrors(error.response?.data?.message || defaultMessage);
        console.log(error);
    };

    const getClientes = async () => {
        setLoading(true);
        try {
            const res = await getClientesRequest();
            setClientes(res.data);
            // console.log("Datos recibidos de clientes:", res.data);
        } catch (error) {
            handleError(error, "Error al cargar clientes");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    const createCliente = async (cliente) => {
        try {
            const res = await createClienteRequest(cliente);
            setClientes((prev) => [...prev, res.data]);
            return {
                success: true,
                data: res.data,
                status: res.status
            };
        } catch (error) {
            console.log(error);
            handleError(error, "Error al crear cliente");
            return {
                success: false,
                error: error.message,
                status: error.response?.status
            };
        }
    };

    const deleteCliente = async (id) => {
        try {
            const res = await deleteClienteRequest(id);
            if (res.status === 204) {
                setClientes((prev) => prev.filter((cliente) => cliente.id !== id));
            }
        } catch (error) {
            handleError(error, "Error al eliminar cliente");
            console.log(error);
        }
    };

    const getCliente = async (id) => {
        try {
            const res = await getClienteRequest(id);
            return res.data;
        } catch (error) {
            handleError(error, "Error al obtener cliente");
        }
    };

    const updateCliente = async (id, cliente) => {
        try {
            const res = await updateClienteRequest(id, cliente);
            setClientes((prev) =>
                prev.map((item) => (item.id === id ? { ...item, ...cliente } : item))
            );
            return {
                success: true,
                data: res.data,
                status: res.status
            };
        } catch (error) {
            handleError(error, "Error al actualizar el cliente");
            console.log(error);
            return {
                success: false,
                error: error.message,
                status: error.response?.status
            }
        }
    };


    return (
        <ClienteContext.Provider
            value={{
                clientes,
                createCliente,
                getCliente,
                deleteCliente,
                getClientes,
                updateCliente,
                loading,
                errors,
            }}
        >
            {children}
        </ClienteContext.Provider>
    );
}