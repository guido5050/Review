import React from "react";
import { Label, Textarea } from "flowbite-react";

const TextArea_Encuesta = ({setComentario}) => {
    const handleInputChange = (event) => {
        setComentario(event.target.value);
    };

    return (
        <>
            <div className="mt-[65px]">
                <div className="mb-2 block">
                    <Label htmlFor="comment" value="Deja un comentario" />
                </div>
                <Textarea
                    id="comment"
                    placeholder="Leave a comment..."
                    required
                    rows={4}
                    onChange={handleInputChange}
                />
            </div>
        </>
    );
};

export default TextArea_Encuesta;
