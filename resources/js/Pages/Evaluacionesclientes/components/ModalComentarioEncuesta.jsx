import { Button, Textarea, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { router } from "@inertiajs/react";

const ModalComentarioEncuesta = ({
    preguntaTitulo,
    id_preguntas,
    user,
    id_evaluacion,
}) => {
    const [openModal, setOpenModal] = useState(false);
    function onCloseModal() {
        setOpenModal(false);
    }
    const [values, setValues] = useState({
        comentario: "",
        id_preguntas: id_preguntas,
        id_evaluacion: id_evaluacion,
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

    console.log(values);
    return (
        <>
            <Button color="blue" onClick={() => setOpenModal(true)}>
                Dejar Comentario
            </Button>
            <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            {preguntaTitulo}
                        </h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="text" value="Mensaje" />
                            </div>
                            <Textarea
                                color={"blue"}
                                className="font-extrabold text-[18px]"
                                id="comentario"
                                placeholder="Escribe tu comentario aquí"
                                onChange={handleChange}
                                required0
                            />
                        </div>

                        <div className="w-full">
                            <Button
                                color="blue"
                                onClick={() => {
                                    router.post(
                                        "/panela/evaluaciones_clientes/saveComentario",
                                        values,
                                        {
                                            onSuccess: () => {
                                                onCloseModal();
                                            },
                                        }
                                    );
                                }}
                            >
                                Enviar
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalComentarioEncuesta;
