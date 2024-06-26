import React from "react";
import {
    Button,
    Checkbox,
    Label,
    Modal,
    TextInput,
    Select,
    Rating,
} from "flowbite-react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import BtnPrimary from "./BtnPrimary";
import { router } from "@inertiajs/react";

const ModalCrear_PosibleRazon = ({ preguntas, estadoEncuesta }) => {
    console.log(estadoEncuesta);
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

    const todasLasPuntuacionesEstanPresentes = preguntas.every((pregunta) => {
        const puntuaciones = pregunta.posibles_respuestas.map(
            (respuesta) => respuesta.puntuacion
        );
        for (let i = 1; i <= 5; i++) {
            if (!puntuaciones.includes(i)) {
                return false;
            }
        }
        return true;
    });

    console.log(todasLasPuntuacionesEstanPresentes);

    console.log(preguntas);
    function handleSubmit(e) {
        e.preventDefault();
        console.log(values);
        router.post("/panela/encuesta/crear", values, {
            onSuccess: () => {
                setOpenModal(false);
                router.visit("/panela/encuesta", { method: "get" });
            },
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
                        <div className=" flex justify-evenly flex-col  p-1 gap-y-2">
                            <div>
                                <Label htmlFor="preguntaId" value=" Seleccione Pregunta" />
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
                                    {preguntas.map(
                                        (pregunta, preguntaIndex) => {
                                            const puntuaciones =
                                                pregunta.posibles_respuestas.map(
                                                    (respuesta) =>
                                                        respuesta.puntuacion
                                                );

                                            const todasLasPuntuacionesEstanPresentes =
                                                [1, 2, 3, 4, 5].every(
                                                    (puntuacion) =>
                                                        puntuaciones.includes(
                                                            puntuacion
                                                        )
                                                );

                                            return (
                                                <option
                                                    key={preguntaIndex}
                                                    value={
                                                        pregunta.id_preguntas
                                                    }
                                                    className={
                                                        todasLasPuntuacionesEstanPresentes
                                                            ? "text-black"
                                                            : "text-yellow-500"
                                                    }
                                                >
                                                    {pregunta.titulo}
                                                </option>
                                            );
                                        }
                                    )}
                                </Select>
                            </div>

                            <div>
                                <Label
                                    htmlFor="preguntaId"
                                    value="Seleccione puntuacion"
                                />
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
                                    <option value="1"> puntuacion ⭐1</option>
                                    <option value="2">puntuacion ⭐⭐ 2</option>
                                    <option value="3">
                                        puntuacion ⭐⭐⭐ 3
                                    </option>
                                    <option value="4">
                                        puntuacion ⭐⭐⭐⭐ 4
                                    </option>
                                    <option value="5">
                                        puntuacion ⭐⭐⭐⭐⭐ 5
                                    </option>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="titulo" value="Escriba el titulo de la razon" />
                            <TextInput
                                id="titulo"
                                required
                                onChange={handleInputChange}
                                label="Titulo de la pregunta"
                                placeholder="Titulo de la Posible Razon"
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
