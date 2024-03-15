import React from "react";
import {
    Button,
    Checkbox,
    Label,
    Modal,
    TextInput,
    Select,
} from "flowbite-react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import BtnPrimary from "./BtnPrimary";
import { router } from "@inertiajs/react";

const ModalCrear_PosibleRazon = ({ preguntas }) => {
    const [openModal, setOpenModal] = useState(false);
    const [puntuacion, setPuntuacion] = useState(1);
    const [preguntaId, setPreguntaId] = useState(preguntas[0].id_preguntas);

    function onCloseModal() {
        setOpenModal(false);
    }

    const [values, setValues] = useState({
        preguntaId: preguntaId,
        puntuacion: puntuacion,
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

    function handleSelectChange(value, id) {
        setValues((values) => ({
            ...values,
            [id]: value,
        }));
    }

    console.log(puntuacion);
    console.log(preguntaId);

    console.log(values);
    function handleSubmit(e) {
        e.preventDefault();
        console.log(values);
        router.post("/panela/encuesta/crear", values, {
            onSuccess: () => {
                setOpenModal(false);
                router.visit('/panela/encuesta');
            }
        });
    }

    return (
        <>
            <Button
                className="mb-2 bg-blue-500 hover:bg-blue-700"
                onClick={() => setOpenModal(true)}
            >
                Crear Posible Razon
            </Button>
            <Modal
                show={openModal}
                size="2xl"
                popup
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header />
                <Modal.Body>
                    <form
                        action=""
                        className="flex flex-col gap-y-8"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="">Agregar Posible Razon</label>
                        <div className=" flex justify-evenly p-1">
                            <Select
                                id="preguntaId"
                                onChange={(e) => {
                                    setPreguntaId(e.target.value);
                                    setValues((values) => ({
                                        ...values,
                                        preguntaId: Number(e.target.value),
                                    }));
                                }}
                            >
                                {preguntas.map((pregunta, preguntaIndex) => (
                                    <option
                                        key={preguntaIndex}
                                        value={pregunta.id_preguntas}
                                    >
                                        {pregunta.titulo}
                                    </option>
                                ))}
                            </Select>
                            <Select
                                id="puntuacion"
                                onChange={(e) => {
                                    setPuntuacion(e.target.value);
                                    setValues((values) => ({
                                        ...values,
                                        puntuacion: e.target.value,
                                    }));
                                }}
                            >
                                <option value=" 1">puntuacion de 1</option>
                                <option value="2">puntuacion de 2 </option>
                                <option value="3">puntuacion de 3 </option>
                                <option value="4">puntuacion de 4 </option>
                                <option value="5">puntuacion de 5</option>
                            </Select>
                        </div>
                        <div>
                            <TextInput
                                id="titulo"
                                sizing={"lg"}
                                required
                                onChange={handleInputChange}
                                label="Titulo de la pregunta"
                                placeholder="Titulo de la pregunta"
                            />
                            <BtnPrimary
                                type="submit"
                                className={" bg-blue-500 mt-3"}
                            >
                                Agregar Posible Razon
                            </BtnPrimary>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalCrear_PosibleRazon;
