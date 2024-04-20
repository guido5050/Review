import { React, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { Rating } from "flowbite-react";

import { useState } from "react";
///panela/encuesta/crear
const ModalCrear_PosibleRazon_de_Estrellas = ({
    setOpenModal,
    openModal,
    puntuacion,
    preguntaId,
    tituloPregunta,
}) => {
    function onCloseModal() {
        setOpenModal(false);
    }
    const [values, setValues] = useState({
        preguntaId: preguntaId,
        puntuacion: puntuacion,
        titulo: "",
    });

    console.log(values);

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
        router.post("/panela/encuesta/crear", values, {
            onSuccess: () => {
                onCloseModal();
                console.log("success");
            },
        });
    }

    return (
        <>
            <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Creando Posible Razon
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="flex justify-between  ">
                                <p>{tituloPregunta}</p>
                                <div className="flex gap-x-1">
                                    <p>{puntuacion}</p>
                                    <Rating>
                                        <Rating.Star />
                                    </Rating>
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="email"
                                        value="Titulo de posible razon"
                                    />
                                </div>
                                <TextInput
                                    id="titulo"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <Button color="blue" type="submit">
                                    Crear
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalCrear_PosibleRazon_de_Estrellas;
