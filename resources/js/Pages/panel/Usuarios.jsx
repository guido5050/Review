import React from "react";

const Usuarios = ({ users }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="w-[70%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nombre
                        </th>
                        {/* Agrega más encabezados según la estructura de tu modelo de usuario */}
                        <th scope="col" className="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id_usuario}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user.nombre}
                            </td>
                            {/* Agrega más celdas según la estructura de tu modelo de usuario */}
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => handleButtonClick(user)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Generar Reseña
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Usuarios;
