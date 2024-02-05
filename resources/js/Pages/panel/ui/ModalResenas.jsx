import { Button, Modal, TextInput } from "flowbite-react";
import { useState, useRef } from "react";
import { MdContentCopy } from "react-icons/md";
import { Link } from "@inertiajs/react";

import BtnPrimary from "./BtnPrimary";

const ModalResenas = ({ modalOpen, onClose, clienteId }) => {
    const [openModal, setOpenModal] = useState(modalOpen);
    const [text, setText] = useState("");
    const inputRef = useRef();

    const onCloseModal = () => {
        setOpenModal(false);
        setText("");
        if (onClose) onClose();
    };

    const copyToClipboard = () => {
        inputRef.current.select();
        document.execCommand("copy");
    };

    const generateLink = () => {
        setText(
            `${window.location.origin}/generarResena?id_reserva=122&id_usuario=${clienteId}`
        );
    };

    console.log(clienteId);

    return (
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="space-y-6 ">
                    <h1 className="mb-6">{`numero de cliente: ${clienteId}`}</h1>
                    <Link
                        href={`/panela/mail/${clienteId}`}
                        method="get"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        preserveState
                    >
                        Enviar correo
                    </Link>

                    <BtnPrimary
                        className={" bg-blue-600 hover:bg-blue-800"}
                        onClick={generateLink}
                    >
                        Generar link
                    </BtnPrimary>
                    <div className="flex items-center">
                        <TextInput
                            ref={inputRef}
                            id="text"
                            placeholder=""
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            required
                            className="flex-grow mr-2" // Añade un margen a la derecha para separar el input del botón
                        />
                        <BtnPrimary
                            className="bg-blue-600 hover:bg-blue-800 py-2"
                            onClick={copyToClipboard}
                            span={<MdContentCopy size={"18px"} />}
                        >
                            Copiar
                        </BtnPrimary>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalResenas;
