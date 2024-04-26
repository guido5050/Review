import {
    Button,
    Checkbox,
    Label,
    Modal,
    TextInput,
    Rating,
} from "flowbite-react";
import { useState } from "react";
import { router } from "@inertiajs/react";

const ModalCrearPosibleRazonClientes = ({
    modal,
    setModal,
    preguntaId,
    puntuacion,
    titulopregunta,
}) => {
    const [openModal, setOpenModal] = useState(modal);
    const [email, setEmail] = useState("");

    function onCloseModal() {
        setModal(false);
    }

    const [values, setValues] = useState({
        preguntaId: preguntaId,
        puntuacion: puntuacion,
        titulo: "",
    });

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
        router.post("/panela/encuestaclientes/crearrazon", values, {
            onSuccess: () => {
                setModal(false);
            },
        });
    }
    console.log(values);
    return (
        <>
            {/* <Button color="blue" onClick={() => setOpenModal(true)}>
                Crear Posible respuesta
            </Button> */}
            <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Creando Posible Razon
                        </h3>
                        <div className="flex justify-between">
                            <p>{titulopregunta}</p>
                            <div className="flex gap-x-1">
                                <p>{puntuacion}</p>
                                <Rating>
                                    <Rating.Star />
                                </Rating>
                            </div>
                        </div>
                        <form className="flex flex-col" onSubmit={handleSubmit}>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="email"
                                    value="Escribe el titulo de la pregunta"
                                />
                            </div>
                            <TextInput
                                id="titulo"
                                required
                                onChange={handleChange}
                            />
                            <div className="w-full mt-2">
                                <Button color="blue" type="submit">
                                    crear
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalCrearPosibleRazonClientes;
