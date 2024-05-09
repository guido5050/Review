import React from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { Rating } from "flowbite-react";
import { router } from "@inertiajs/react";
import { LuPenSquare } from "react-icons/lu";

import { useState } from "react";

const ModalUpdateRazon = ({
    id_posiblesRespuestas,
    titulo_respuesta,
    puntuacion,
}) => {
    const [openModal, setOpenModal] = useState(false);

    const [values, setValues] = useState({
        id_posiblesRespuestas: id_posiblesRespuestas,
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit() {
        router.post("/panela/encuesta/updateRazon", values, {
            onSuccess: () => {
                onCloseModal();
            },
        });
    }

    function onCloseModal() {
        setOpenModal(false);
    }

    return (
        <>
            <button
                className="flex items-center gap-x-1 mx-1"
                onClick={() => setOpenModal(true)}
            >
                Editar <LuPenSquare />
            </button>
            <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Editando Posible Razon
                        </h3>
                        <div className="mb-2  flex  gap-x-5 items-center">
                            <Label htmlFor="email" value={"Puntuacion:"} />
                            <div className="flex ">
                                <p>{puntuacion}</p>
                                <Rating>
                                    <Rating.Star />
                                </Rating>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="posible razon:" />
                            </div>
                            <TextInput
                                color={"blue"}
                                id="posible_razon"
                                className="font-extrabold"
                                defaultValue={titulo_respuesta}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="w-full">
                            <Button
                                color="blue"
                                onClick={() => {
                                    handleSubmit();
                                }}
                            >
                                Actualizar
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalUpdateRazon;
