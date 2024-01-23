import React from "react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import Btn from "../components/Btn";
import { PiUsersBold } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";

import BtnPanel from "./ui/BtnPanel";
import BtnPrimary from "./ui/BtnPrimary";

const Usuarios = ({ users }) => {
    const [values, setValues] = useState(
        users.map((user) => ({
            id_empleados: user.id_empleados,
            nombre_completo: user.nombre_completo,
            email: user.email,
        }))
    );

    function handleChange(e, userId, field) {
        const updatedValues = values.map((user) =>
            user.id_empleados === userId
                ? { ...user, [field]: e.target.value }
                : user
        );

        setValues(updatedValues);
    }

    function handleSubmit(e) {
        e.preventDefault();
        router.post("/panela/update", values);
    }

    function handleDelete(e, id_usuario) {
        e.preventDefault();
        console.log(id_usuario);

        router.delete(`/panela/${id_usuario}`, {
            onBefore: () => confirm("Esta seguro de Eliminar este Usuario...."),
        });
    }

    return (
        <form
            className="relative  shadow-md sm:rounded-lg flex flex-col items-center p-10"
            onSubmit={handleSubmit}
        >
            <div className=" flex items-center gap-x-5 mb-10 ">
                <h1 className="text-center text-3xl mt-3  font-extrabold">
                    Lista de Usuarios
                </h1>
                <div className="mt-3">
                    <PiUsersBold size={"30px"} />{" "}
                </div>
            </div>
            <div className="w-full   mb-5">
                <BtnPanel
                    type={"onSubmit"}
                    className={"font-extrabold "}
                    span={<FiEdit size={"15px"} />}
                >
                    Actualizar Usuarios
                </BtnPanel>
            </div>

            <table className="w-full animate-fade-down animate-ease-in text-xl text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 text-xl py-3 font-extrabold"
                        >
                            Nombre
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-xl  font-extrabold"
                        >
                            Correo
                        </th>
                        {/* Agrega más encabezados según la estructura de tu modelo de usuario */}
                        <th
                            scope="col"
                            className="px-6 py-3 text-xl font-extrabold"
                        >
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id_empleados}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            <td className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                                <input
                                    type="text"
                                    id="nombre_completo"
                                    defaultValue={user.nombre_completo}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            user.id_empleados,
                                            "nombre_completo"
                                        )
                                    }
                                />
                            </td>
                            <td className="px-6 py-2 font-medium text-gray-900">
                                <input
                                    type="email"
                                    id="email"
                                    defaultValue={user.email}
                                    onChange={(e) =>
                                        handleChange(e, user.email, "email")
                                    }
                                    className="px-8 w-[60%]"
                                />
                            </td>
                            {/* Agrega más celdas según la estructura de tu modelo de usuario */}
                            <td className="px-6 py-4">
                                <BtnPrimary
                                    span={<RiDeleteBin6Fill size={"18px"} />}
                                    onClick={(e) =>
                                        handleDelete(e, user.id_empleados)
                                    }
                                >
                                    Borrar
                                </BtnPrimary>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </form>
    );
};

export default Usuarios;
