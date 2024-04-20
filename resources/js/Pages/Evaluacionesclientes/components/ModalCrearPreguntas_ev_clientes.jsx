import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { router } from "@inertiajs/react";

const ModalCrearPreguntas_ev_clientes = () => {
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState("");

    function onCloseModal() {
        setOpenModal(false);
        setEmail("");
    }

    const [values, setValues] = useState({
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
        router.post("/panela/encuestaclientes/save",values, {
            onSuccess: () => {
                setOpenModal(false);
                router.refresh();
            }

        });
    }

    console.log(values);

    return (
        <>
            <Button color="blue" onClick={() => setOpenModal(true)}>Crear Pregunta</Button>
            <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Creando pregunta
                        </h3>
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
                                <Button color="blue" type="submit">crear</Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalCrearPreguntas_ev_clientes;
