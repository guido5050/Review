import React, { useEffect, useState } from "react";
import Menu_Item from "./Menu_Item";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import parse from "html-react-parser";
import { MdEmail } from "react-icons/md";
import { TiArrowBackOutline } from "react-icons/ti";

const Preview_Mail = ({ html, clienteId, plantilla }) => {
    console.log(html);
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
                        onClick={(e) => {
                            e.preventDefault();
                            if (window.confirm("¿Está seguro de enviar el correo?")) {
                                router.visit(`/panela/mail/${clienteId}/${plantilla}`, {
                                    method: "get",
                                    preserveState: true,
                                });
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
