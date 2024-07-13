import React from "react";
import Swal from "sweetalert2";
import { RiMailAddFill } from "react-icons/ri";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import Buttonprimary from "@/Pages/components/Buttonprimary";

const
FormularioMail = ({
    plantillaCurrent = {},
    selectedId,
    setAlertcreate,
    setAlertupdate,
}) => {
    // console.log(selectedId);
    const [values, setValues] = useState({
        id_correo: plantillaCurrent.id_correo,
        nombre_plantilla: plantillaCurrent.nombre_plantilla || "",
        titulo: plantillaCurrent.titulo || "",
        cuerpo: plantillaCurrent.cuerpo || "",
        asunto: plantillaCurrent.asunto || "",
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
        if (selectedId === 0) {
            router.post("/panela/config.mail/create", values, {
                onSuccess: () => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Plantilla de Correo Creada",
                        showConfirmButton: false,
                        timer: 2000,
                      })
                },
            });
        } else {
            router.post("/panela/config.mail/update", values,{
                onSuccess: () => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Plantilla de Correo Actualizada",
                        showConfirmButton: false,
                        timer: 2000
                      })
                },

            });
        }
    }

    //console.log(plantillaCurrent);

    return (
        <>
            <form
                className=" gap-y-8 overflow-y-auto shadow-md"
                onSubmit={handleSubmit}
            >
                <h1 className="font-semibold">plantilla de correo</h1>
                <label htmlFor="" className="mb-3">
                    <RiMailAddFill className="mb-1 mt-3" size={"38px"} />
                </label>
                <div className="flex flex-col">
                    <label htmlFor="" className="font-extrabold" title="Nombre del archivo de la plantilla de correo para identificarla">
                        Nombre de la plantilla de correo(#identificador)
                    </label>
                    <input
                        className="py-3 px-4 w-[70%] mb-3 rounded-lg"
                        type="text"
                        defaultValue={
                            plantillaCurrent &&
                            plantillaCurrent.nombre_plantilla
                                ? plantillaCurrent.nombre_plantilla
                                : ""
                        }
                        onChange={handleChange}
                        name=""
                        id="nombre_plantilla"
                        required
                        placeholder="Nombre de la plantilla de correo"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="" className="font-extrabold">
                        Asunto del correo
                    </label>
                    <input
                        className="py-3 px-4 w-[70%] mb-3 rounded-lg"
                        type="text"
                        defaultValue={
                            plantillaCurrent && plantillaCurrent.asunto
                                ? plantillaCurrent.asunto
                                : ""
                        }
                        onChange={handleChange}
                        name=""
                        id="asunto"
                        required
                        placeholder="Asunto del Correo"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="" className="font-extrabold">
                        Titulo de Email
                    </label>
                    <input
                        className="py-3 px-4 w-[70%] mb-3 rounded-lg"
                        type="text"
                        defaultValue={
                            plantillaCurrent && plantillaCurrent.titulo
                                ? plantillaCurrent.titulo
                                : ""
                        }
                        onChange={handleChange}
                        name=""
                        id="titulo"
                        required
                        placeholder="titulo del Correo"
                    />
                </div>

                <div className="w-full  mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                        <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                            <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                                <button
                                    type="button"
                                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 12 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                                        />
                                    </svg>
                                    <span className="sr-only">Attach file</span>
                                </button>
                                @{/* ... (resto del código) */}
                            </div>
                            <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
                                {/* ... (resto del código) */}
                            </div>
                        </div>
                        <label htmlFor="" className="font-extrabold">
                            Cuerpo del correo electronico
                        </label>
                        <button
                            type="button"
                            data-tooltip-target="tooltip-fullscreen"
                            className="p-2 text-gray-500 rounded cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                        >
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 19 19"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"
                                />
                            </svg>
                            <span className="sr-only">Full screen</span>
                        </button>
                        <div
                            id="tooltip-fullscreen"
                            role="tooltip"
                            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                        >
                            Show full screen
                            <div
                                className="tooltip-arrow"
                                data-popper-arrow
                            ></div>
                        </div>
                    </div>

                    <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                        <label htmlFor="editor" className="sr-only">
                            Publish post
                        </label>
                        <textarea
                            id="cuerpo"
                            rows="8"
                            onChange={handleChange}
                            defaultValue={
                                plantillaCurrent && plantillaCurrent.cuerpo
                                    ? plantillaCurrent.cuerpo
                                    : ""
                            }
                            className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                            placeholder="Escribe cuerpo del correo"
                            required
                        ></textarea>
                    </div>
                </div>
                <Buttonprimary
                    type="submit"
                    className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                    {Object.keys(plantillaCurrent).length > 0
                        ? "Actualizar"
                        : "Crear"}{" "}
                    Plantilla
                </Buttonprimary>
            </form>
        </>
    );
};

export default FormularioMail;
