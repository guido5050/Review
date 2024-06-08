import React from "react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { PiUsersBold } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import Menu_Item from "./Menu_Item";
import BtnPanel from "./ui/BtnPanel";
import ModalAlert from "./ui/ModalAlert";
import ModalCrearUsuarios from "./ui/ModalCrearUsuarios";
import ModalCrearRoles from "./ui/ModalCrearRoles";
import { Alert, Button } from "flowbite-react";
import Tabsx from "./ui/Tabs";
import AccesoDenegado from "./ui/AccesoDenegado";

const Usuarios = ({
    users,
    auth,
    cargo,
    logo,
    razon_social,
    AppName,
    empresas,
    AccesosT,
    Accesos,
}) => {
    const [alertupdate, setAlertupdate] = useState(false);
    const [alertcreate, setAlertcreate] = useState(false);
    const [alertupdaterol, setAlertupdaterol] = useState(false);
    const [modal, setModal] = useState(false); //Estado del Modal que maneja el eliminar
    const [modal_crearusuarios, setModal_CrearUsuarios] = useState(false);
    const [modal_crearroles, setModal_CrearRoles] = useState(false);
    const [iduser, setIduser] = useState(0); //id del usuario a eliminar
    const [values, setValues] = useState(
        users.map((user) => ({
            id_empleados: user.id_empleados,
            nombre_completo: user.nombre_completo,
            email: user.email,
            usuario: user.usuario,
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
        router.post("/panela/usuarios/update", values, {
            onSuccess: () => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Usuarios Actualizados Correctamente.",
                    showConfirmButton: false,
                    timer: 2000,
                });
            },
        });
    }

    function handleSubmitRoles(e) {
        e.preventDefault();
        router.post("/panela/usuarios/roles/update", valuesRoles, {
            onSuccess: () => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Roles Actualizados Correctamente.",
                    showConfirmButton: false,
                    timer: 2000,
                });
            },
        });
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

    console.log(cargo);

    return (
        <>
            <Menu_Item
                user={auth.user}
                logo={logo}
                razon_social={razon_social}
                AppName={AppName}
                empresas={empresas}
            >
                {Accesos.find((acceso) => acceso.id === 7) ? (
                    <div>
                        {alertupdate && (
                            <Alert
                                color="success"
                                className="animate-fade-left animate-ease-in-out "
                            >
                                <span className="font-medium">
                                    Informacion!
                                </span>{" "}
                                Usuarios Actualizados Correctamente.
                            </Alert>
                        )}
                        {alertupdaterol && (
                            <Alert
                                color="success"
                                className="animate-fade-left animate-ease-in-out "
                            >
                                <span className="font-medium">
                                    Informacion!
                                </span>{" "}
                                Roles actualizados.
                            </Alert>
                        )}
                        {alertcreate && (
                            <Alert
                                color="success"
                                className="animate-fade-left animate-ease-in-out "
                            >
                                <span className="font-medium">
                                    Informacion!
                                </span>{" "}
                                Usuario Creado Correctamente.
                            </Alert>
                        )}

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
                                empresas={empresas}
                                setModal_CrearUsuarios={setModal_CrearUsuarios}
                                modal_crearusuarios={modal_crearusuarios}
                                setAlertcreate={setAlertcreate}
                            ></ModalCrearUsuarios>
                        )}

                        <div className=" px-8 ">
                            <h1 className="text-2xl font-bold mb-2 mt-3">
                                Lista de Usuarios:
                            </h1>
                            <BtnPanel
                                type={"button"}
                                span={"+"}
                                className={""}
                                onClick={handleCrearUsuarios}
                            >
                                Crear usuarios
                            </BtnPanel>
                        </div>
                        <form
                            className="relative sm:rounded-lg flex flex-col items-center p-5"
                            onSubmit={handleSubmit}
                        >
                            <div className="w-full flex"></div>

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
                                            Usuario
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
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xl  font-extrabold"
                                        >
                                            Accesos
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
                                                    defaultValue={
                                                        user.nombre_completo
                                                    }
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
                                                    id="usuario"
                                                    defaultValue={user.usuario}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            e,
                                                            user.id_empleados,
                                                            "usuario"
                                                        )
                                                    }
                                                    className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                                ></input>
                                            </td>
                                            <td className="px-6 py-2 font-medium text-gray-900">
                                                <input
                                                    type="text"
                                                    id="num_telefono"
                                                    defaultValue={
                                                        user.num_telefono
                                                    }
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
                                                    disabled={
                                                        user.nombre_completo ==
                                                        "Admin"
                                                            ? true
                                                            : false
                                                    }
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
                                                            disabled={
                                                                cargo.nombre ===
                                                                "Admin"
                                                            }
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
                                                    disabled={
                                                        user.nombre_completo ==
                                                        "Admin"
                                                            ? true
                                                            : false
                                                    }
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
                                                    <option value="1">
                                                        Si
                                                    </option>
                                                    <option value="0">
                                                        No
                                                    </option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-2 font-medium text-gray-900">
                                                <Button
                                                    disabled={
                                                        user.nombre_completo ==
                                                        "Admin"
                                                            ? true
                                                            : false
                                                    }
                                                    onClick={() => {
                                                        router.get(
                                                            `/panela/usuarios/accesos/${user.id_empleados}`
                                                        );
                                                    }}
                                                    color="blue"
                                                >
                                                    Accesos
                                                </Button>
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
                        <div className=" px-8">
                            <h2 className="text-2xl font-bold mb-2"> Roles:</h2>

                            <ModalCrearRoles
                                cargo={cargo}
                                Accesos={AccesosT}
                            ></ModalCrearRoles>
                        </div>
                        <form
                            className="relative sm:rounded-lg flex flex-col items-center p-5 "
                            onSubmit={handleSubmitRoles}
                        >
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
                                                    readOnly ={rol.nombre === "Admin" ? true : false}
                                                    // Si cargo.nombre es "Admin", haz que el campo de entrada sea de solo lectura
                                                       onChange={(e) =>
                                                        handleChangeRol(
                                                            e,
                                                            rol.id
                                                        )
                                                    }
                                                ></input>
                                            </td>
                                            <td className="px-6 py-2 font-medium text-gray-900">
                                                <input
                                                    id="descripcion"
                                                    name="descripcion"
                                                    className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                                    defaultValue={
                                                        rol.descripcion
                                                    }
                                                    onChange={(e) =>
                                                        handleChangeRol(
                                                            e,
                                                            rol.id
                                                        )
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
                    </div>
                ) : (
                    <AccesoDenegado />
                )}
            </Menu_Item>
        </>
    );
};

export default Usuarios;
