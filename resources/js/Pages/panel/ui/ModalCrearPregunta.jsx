import React from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import BtnPrimary from "./BtnPrimary";
import { router } from "@inertiajs/react";
import Buttonprimary from "@/Pages/components/Buttonprimary";

const ModalCrearPregunta = () => {
    const [openModal, setOpenModal] = useState(false);
    const [values, setValues] = useState({
        titulo: "",
    });

    function handleInputChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }
    console.log(values);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(values);
        router.post("/panela/encuesta/pregunta", values, {
            onSuccess: () => {
                setOpenModal(false);
                router.refresh();
            },
        });
    }

    function onCloseModal() {
        setOpenModal(false);
    }
    return (
        <>
            <Buttonprimary
                onClick={() => setOpenModal(true)}
            >
                Crear Pregunta
            </Buttonprimary>
            <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
                <Modal.Body>
                    <Modal.Header>Creando Pregunta</Modal.Header>
                    <form
                        onSubmit={handleSubmit}
                        className="overflow-y-auto space-y-6 "
                    >
                        <div className="mb-2 block">
                            <Label
                                htmlFor="text"
                                value="Titulo de la Pregunta"
                            />
                            <TextInput
                                id="titulo"
                                type="text"
                                onChange={handleInputChange}
                                placeholder="Escriba el titulo de la pregunta"
                                required
                            ></TextInput>
                        </div>{" "}
                        <Buttonprimary>Crear</Buttonprimary>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalCrearPregunta;
