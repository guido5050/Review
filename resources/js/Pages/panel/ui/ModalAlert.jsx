import React from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { router } from "@inertiajs/react";

/**
 * TODO : Crear un modal para eliminar usuarios
 * este modal se encarga de eliminar usuarios
 *
 */

const ModalAlert = ({ modal, setModal, onConfirm, onCancel, iduser }) => {
    const [openModal, setOpenModal] = useState(modal);

    const handleConfirmClick = () => {
        //Metodo para elimar al usuario en el Modal
        onConfirm(); // Llama a la función onConfirm desde el componente principal
        console.log(iduser);
        router.delete(`/panela/usuarios/${iduser}`);
    };

    const handleCancelClick = () => {
        onCancel(); // Llama a la función onCancel desde el componente principal
    };

    return (
        <>
            {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
            <Modal
                show={openModal}
                size="md"
                onClose={() => setModal(false)}
                popup
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <MdDelete
                            className="mx-auto mb-4 h-14 w-14"
                            size={"60px "}
                            color="gray"
                        />

                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            ¿Seguro que quiere Eliminar este Usuario?{" "}
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="failure"
                                onClick={handleConfirmClick}
                                // onClick={() => setOpenModal(false)}
                            >
                                {"Sí, estoy seguro"}
                            </Button>
                            <Button color="gray" onClick={handleCancelClick}>
                                No, cancelar
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalAlert;
