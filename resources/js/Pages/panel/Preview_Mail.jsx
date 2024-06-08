import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Menu_Item from "./Menu_Item";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import parse from "html-react-parser";
import { MdEmail } from "react-icons/md";
import { TiArrowBackOutline } from "react-icons/ti";


const Preview_Mail = ({ html, clienteId, plantilla,ClienteNombre }) => {
    console.log(clienteId);
    const [emailHtml, setEmailHtml] = useState(html);

    return (
        <>
            <div className="flex flex-col h-screen justify-between">
                <div className="flex   px-4 py-2 mt-0 bg-gray-900  justify-between ">
                    <Link
                        onClick={() => window.history.back()}
                        className="text-white flex items-center gap-x-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        <TiArrowBackOutline size={"20px"} /> Volver
                    </Link>
                    <Link
                       onClick={ async (e) => {
                        const result = await Swal.fire({
                            title: "Confirmación",
                            text: `¿Estas Seguro que Quieres enviar el correo  a: ${ClienteNombre}  ?`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Sí, Enviar",
                            cancelButtonText: "No, cancelar",
                            allowOutsideClick: false, // No permite cerrar la modal al hacer clic fuera
                            allowEscapeKey: false // No permite cerrar la modal al presionar ESC
                        });

                        if (result.isConfirmed) {
                            router.visit(`/panela/mail/${clienteId}/${plantilla}`, {
                                onSuccess: () => {
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "correo enviado",
                                        showConfirmButton: false,
                                        timer: 1500
                                      });
                                }
                            }, {
                                method: "get",
                                preserveState: true,
                            },);

                        } else {
                            e.preventDefault();
                        }
                    }}
                        className="text-white animate-pulse animate-ease-in flex items-center gap-x-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Enviar correo <MdEmail size={"20px"} />
                    </Link>
                </div>
                {emailHtml && (
                    <div className="border-8 p-10 mx-auto w-full md:w-1/2 lg:w-1/3 overflow-y-auto max-h-[700px]">
                        {parse(emailHtml)}
                    </div>
                )}
                <div className="flex py-10 justify-end items-center pb-5 bg-gray-900 mt-auto">
                    {/* <Link
                        onClick={(e) => {
                            e.preventDefault();
                            if (window.confirm("¿Está seguro de enviar el correo?")) {
                                router.visit(`/panela/mail/${clienteId}/${plantilla}`, {
                                    method: "get",
                                    preserveState: true,
                                });
                            }
                        }}
                        className="text-white flex items-center gap-x-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Enviar correo <MdEmail size={"20px"} />
                    </Link> */}
                </div>
            </div>
        </>
    );
};

export default Preview_Mail;
