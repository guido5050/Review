import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import Menu_Item from "./Menu_Item";
const Preview_Mail = ({ html, auth, logo, razon_social }) => {
    console.log(html);
    const [emailHtml, setEmailHtml] = useState(html);
    return (
        <>
            <Menu_Item user={auth.user} logo={logo} razon_social={razon_social}>
                <div className="flex justify-center items-center  h-screen">
                    
                    <div className=" p-20">
                        <div>
                            {emailHtml && (
                                <div
                                    className="border-8 mt-4 shadow-xl "
                                    dangerouslySetInnerHTML={{
                                        __html: emailHtml,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </Menu_Item>
            <button className="mt-6">Enviar correo</button>
        </>
    );
};

export default Preview_Mail;
