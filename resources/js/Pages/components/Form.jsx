import React, { useState } from "react";
import { router } from "@inertiajs/react";

const Formulario = () => {
    const [value, setValues] = useState({
        nombre_completo: "",
        email: "",
        usuario: "",
        contrasena: "",
        password_confirm: "",
        num_identificacion: "",
        num_telefono: "",
        cargo: "",
        empresa: "",
    });
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(value);
        router.post("/register.store", value);
    }

    console.log(value);
    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
                Formulario de Registro
            </h2>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-4">
                    <label
                        htmlFor="nombre"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Nombre Completo:
                    </label>
                    <input
                        type="text"
                        id="nombre_completo"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="correo"
                        className="block text-sm font-medium text-gray-600"
                    >
                        E-Mail Address:
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="correo"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Usuario:
                    </label>
                    <input
                        type="text"
                        id="usuario"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="correo"
                        className="block text-sm font-medium text-gray-600"
                    ></label>
                    Contraseña:
                    <input
                        type="password"
                        id="password"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="correo"
                        className="block text-sm font-medium text-gray-600"
                    ></label>
                    Confirm Password:
                    <input
                        type="password"
                        id="password_confirm"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="empresa"
                        className="block text-sm font-medium text-gray-600"
                    >
                        No-identificacion:
                    </label>
                    <input
                        type="text"
                        id="num_identificacion"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="empresa"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Numero Telefono:
                    </label>
                    <input
                        type="text"
                        id="num_telefono"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="empresa"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Cargo:
                    </label>
                    <input
                        type="number"
                        id="cargo"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="empresa"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Empresa:
                    </label>
                    <input
                        type="text"
                        id="empresa"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default Formulario;
