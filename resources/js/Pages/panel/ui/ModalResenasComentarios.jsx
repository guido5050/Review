import React from "react";
import { Button, Label, Modal, Textarea } from "flowbite-react";
import { useState } from "react";
import { router } from "@inertiajs/react";

import { LuMessageCircle } from "react-icons/lu";

const ModalResenasComentarios = ({ idPregunta, idresena, user }) => {
    const [openModal, setOpenModal] = useState(false);
    const [comment, setComment] = useState("");
    function onCloseModal() {
        setOpenModal(false);
        setComment("");
    }

    const [values, setValues] = useState({
        comentario: "",
        id_preguntas: idPregunta,
        id_resena: idresena,
        id_empleado: user.id_empleados,
        Nombre_Admin: user.nombre_completo,
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;

        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }
    console.log(values.comentario);
    function handleSubmit(e) {
        e.preventDefault();
        router.post("/panela/resenas/comentario", values);
    }

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>
                Enviar Comentario
            </Button>
            <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <div className="flex items-center gap-x-1 ">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                Deja un comentario
                            </h3>
                            <LuMessageCircle size={"25px"} />
                        </div>

                        <form
                            className="flex flex-col gap-y-3"
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-2 block"></div>
                            <Textarea
                                id="comentario"
                                onChange={handleChange}
                                placeholder="Escribe tu comentario aquí..."
                                required
                            />

                            <div className="w-full">
                                <Button type="submit">Enviar</Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalResenasComentarios;
