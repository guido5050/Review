import React from "react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { PiUsersBold } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";

import Menu_Item from "./Menu_Item";
import BtnPanel from "./ui/BtnPanel";
import ModalAlert from "./ui/ModalAlert";
import ModalCrearUsuarios from "./ui/ModalCrearUsuarios";
import ModalCrearRoles from "./ui/ModalCrearRoles";

const Usuarios = ({ users, auth, cargo, logo, razon_social, AppName }) => {
    console.log(cargo);
    const [modal, setModal] = useState(false); //Estado del Modal que maneja el eliminar
    const [modal_crearusuarios, setModal_CrearUsuarios] = useState(false);
    const [modal_crearroles, setModal_CrearRoles] = useState(false);
    const [iduser, setIduser] = useState(0); //id del usuario a eliminar
    const [values, setValues] = useState(
        users.map((user) => ({
            id_empleados: user.id_empleados,
            nombre_completo: user.nombre_completo,
            email: user.email,
            num_telefono: user.num_telefono,
            num_identificacion: user.num_identificacion,
            activo: user.activo,
            cargo: user.cargo,
        }))
    );
    const [valuesRoles, setValuesRoles] = useState(
        cargo.map((rol) => ({
            id: rol.id,
            nombre: rol.nombre,
            descripcion: rol.descripcion,
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

    function handleChangeRol(e, rolId) {
        const key = e.target.name;
        const value = e.target.value;

        setValuesRoles((values) =>
            values.map((rol) =>
                rol.id === rolId ? { ...rol, [key]: value } : rol
            )
        );
    }

    function handleSubmit(e) {
        e.preventDefault();
        router.post("/panela/usuarios/update", values);
        
    }

    function handleSubmitRoles(e) {
        e.preventDefault();
        router.post("/panela/usuarios/roles/update", valuesRoles);
    }

    function handleDelete(e, id_empleados) {
        e.preventDefault();
        setModal(true);

        setIduser(id_empleados);
    }

    const handleConfirm = () => {
        console.log("Usuario confirmó la eliminación");
        setModal(false); // Cierra el modal después de confirmar
    };

    const handleCancel = () => {
        console.log("usuario no eliminado");
        setModal(false); // Cierra el modal si el usuario cancela
    };

    const handleCrearUsuarios = () => {
        setModal_CrearUsuarios(true);
    };

    const handleCrearRoles = () => {
        setModal_CrearRoles(true);
    };

    {
        /**Este codigo se puede mejorar metiendo la logica de los dos formularios en componented diferentes.... */
    }
    return (
        <>
            <Menu_Item
                user={auth.user}
                logo={logo}
                razon_social={razon_social}
                AppName={AppName}
            >
                {modal && (
                    <ModalAlert
                        modal={modal}
                        setModal={setModal}
                        iduser={iduser}
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                    ></ModalAlert>
                )}
                {modal_crearusuarios && (
                    <ModalCrearUsuarios
                        cargo={cargo}
                        setModal_CrearUsuarios={setModal_CrearUsuarios}
                        modal_crearusuarios={modal_crearusuarios}
                    ></ModalCrearUsuarios>
                )}
                {modal_crearroles && (
                    <ModalCrearRoles
                        setModal_CrearRoles={setModal_CrearRoles}
                        modal_crearroles={modal_crearroles}
                    ></ModalCrearRoles>
                )}

                <form
                    className="relative sm:rounded-lg flex flex-col items-center p-5"
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
                    <div className="w-full flex  gap-x-5 mb-5">
                        <BtnPanel
                            type={"button"}
                            span={"+"}
                            className={""}
                            onClick={handleCrearUsuarios}
                        >
                            Crear usuarios
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
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-xl  font-extrabold"
                                >
                                    Telefono
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-xl  font-extrabold"
                                >
                                    Identificación
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-xl  font-extrabold"
                                >
                                    Cargo
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-xl  font-extrabold"
                                >
                                    Activo
                                </th>
                                {/* Agrega más encabezados según la estructura de tu modelo de usuario */}
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
                                            className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </td>
                                    <td className="px-6 py-2 font-medium text-gray-900">
                                        <input
                                            type="email"
                                            id="email"
                                            defaultValue={user.email}
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    user.id_empleados,
                                                    "email"
                                                )
                                            }
                                            className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </td>
                                    <td className="px-6 py-2 font-medium text-gray-900">
                                        <input
                                            type="text"
                                            id="num_telefono"
                                            defaultValue={user.num_telefono}
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    user.id_empleados,
                                                    "num_telefono"
                                                )
                                            }
                                            className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            id="num_identificacion"
                                            defaultValue={
                                                user.num_identificacion
                                            }
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    user.id_empleados,
                                                    "num_identificacion"
                                                )
                                            }
                                            className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </td>
                                    <td className="px-6 py-2 font-medium text-gray-900">
                                        <select
                                            id="cargo"
                                            defaultValue={user.cargo}
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    user.id_empleados,
                                                    "cargo",
                                                    e.target.value // Aquí es donde obtienes el valor seleccionado
                                                )
                                            }
                                            className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            {cargo.map((cargo) => (
                                                <option
                                                    key={cargo.id}
                                                    value={cargo.id}
                                                >
                                                    {cargo.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-2 font-medium text-gray-900">
                                        <select
                                            id="activo"
                                            defaultValue={user.activo}
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    user.id_empleados,
                                                    "activo",
                                                    e.target.value // Aquí es donde obtienes el valor seleccionado
                                                )
                                            }
                                            className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <option value="1">Si</option>
                                            <option value="0">No</option>
                                        </select>
                                    </td>
                                    {/* Agrega más celdas según la estructura de tu modelo de usuario */}
                                    {/* <td className="px-6 py-4">
                                        <BtnPrimary
                                            span={
                                                <RiDeleteBin6Fill
                                                    size={"18px"}
                                                />
                                            }
                                            className={
                                                "bg-red-800 hover:bg-red-600"
                                            }
                                            onClick={(e) =>
                                                handleDelete(
                                                    e,
                                                    user.id_empleados
                                                )
                                            }
                                        >
                                            Borrar
                                        </BtnPrimary>
                                    </td> */}
                                    {/**
                                     * se borro el boton Eliminar, ya que no se puede eliminar usuarios
                                     * pero si se llegara a necesitar por alguna razon ahi estara comenrtado
                                     */}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="w-full mb-5 relative mt-5 flex justify-end">
                        <BtnPanel
                            type={"onSubmit"}
                            className={
                                " bg-green-500 hover:bg-green-400 relative "
                            }
                            span={<FiEdit size={"15px"} />}
                        >
                            Actualizar Usuarios
                        </BtnPanel>
                    </div>
                </form>
                {/*TODO: fin del primer form */}

                <form
                    className="relative sm:rounded-lg flex flex-col items-center p-5 "
                    onSubmit={handleSubmitRoles}
                >
                    <div className=" flex items-center gap-x-5 mb-10 ">
                        <h1 className="text-center text-3xl mt-3  font-extrabold">
                            Roles de Ususarios
                        </h1>
                        <div className="mt-1">
                            <PiUsersBold size={"30px"} />{" "}
                        </div>
                    </div>
                    <div className="w-full flex  gap-x-5 mb-5">
                        <BtnPanel
                            type={"button"}
                            span={"+"}
                            className={""}
                            onClick={handleCrearRoles}
                        >
                            Crear Roles
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
                                    Descripción
                                </th>

                                {/* Agrega más encabezados según la estructura de tu modelo de usuario */}
                            </tr>
                        </thead>
                        <tbody>
                            {cargo.map((rol) => (
                                <tr
                                    key={rol.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <td className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                                        <input
                                            id="nombre"
                                            name="nombre"
                                            className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                            defaultValue={rol.nombre}
                                            onChange={(e) =>
                                                handleChangeRol(e, rol.id)
                                            }
                                        ></input>
                                    </td>
                                    <td className="px-6 py-2 font-medium text-gray-900">
                                        <input
                                            id="descripcion"
                                            name="descripcion"
                                            className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                            defaultValue={rol.descripcion}
                                            onChange={(e) =>
                                                handleChangeRol(e, rol.id)
                                            }
                                        ></input>
                                    </td>
                                    <td className="px-6 py-2 font-medium text-gray-900">
                                        {rol.activo}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="w-full mb-5 relative mt-5 flex justify-end">
                        <BtnPanel
                            type={"onSubmit"}
                            className={
                                " bg-green-500 hover:bg-green-400 relative "
                            }
                            span={<FiEdit size={"15px"} />}
                        >
                            Actualizar Roles
                        </BtnPanel>
                    </div>
                </form>
            </Menu_Item>
        </>
    );
};

export default Usuarios;
