import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import Menu_Item from "./Menu_Item";
import BtnPrimary from "./ui/BtnPrimary";
import { MdEmail } from "react-icons/md";
import { Link } from "@inertiajs/react";
import { MdOutlineArrowBack } from "react-icons/md";

const Preview_Mail = ({ html, auth, logo, razon_social }) => {
    console.log(html);
    const [emailHtml, setEmailHtml] = useState(html);
    return (
        <>
            {/* <BtnPrimary className={"bg-blue-500 flex items-center mt-[10%]"}>
                 <MdOutlineArrowBack />
                volver
            </BtnPrimary> */}
            <div className="flex flex-col ">
                <div>
                    <div>
                        {emailHtml && (
                            <div
                                className="border-8 border-blue-500 p-10"
                                dangerouslySetInnerHTML={{
                                    __html: emailHtml,
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Link
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Enviar correo
            </Link>
        </>
    );
};

export default Preview_Mail;
