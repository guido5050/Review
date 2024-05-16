import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Label, Textarea } from "flowbite-react";

const TextArea = ({ setComentario }) => {
    const handleInputChange = (event) => {
        setComentario(event.target.value);
    };
    return (
        <>
            <div className="mt-[65px]">
                <div className="mb-2 block">
                    <Label
                        htmlFor="comment"
                        value="Deja un comentario te estaremos leyendo😉"
                    />
                </div>
                <div className="bg-red-100 md:w-1/2 m-auto">
                    <Textarea
                        id="comment"
                        color={"blue"}
                        placeholder="Escribe tu comentario..."
                        required
                        rows={8}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </>
    );
};

export default TextArea;
