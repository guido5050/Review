import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { MdContentCopy, MdOutlineMarkEmailUnread } from "react-icons/md";
import { Link } from "@inertiajs/react";
import { Alert, Badge, Select, Label } from "flowbite-react";

import BtnPrimary from "./BtnPrimary";

const ModalResenas = ({
    email,
    modalOpen,
    onClose,
    clienteId,
    plantillas,
    empresa,
    nombreCliente,
}) => {
    const [openModal, setOpenModal] = useState(modalOpen);
    const [text, setText] = useState("");
    const inputRef = useRef();
    const [selectPlantilla, setSelectPlantilla] = useState("");

    useEffect(() => {
        if (plantillas && plantillas.length > 0) {
            setSelectPlantilla(plantillas[0].id_correo);
        }
    }, [plantillas]);

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
            `${window.location.origin}/generarResena?id_reserva=122&id_usuario=${clienteId}&id_empresa=${empresa}`
        );
    };

    return (
        <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="space-y-6">
                    <div className="flex items-center gap-x-1">
                        <MdOutlineMarkEmailUnread size={"28px"} /> Para:{" "}
                        <strong>{nombreCliente}</strong>
                    </div>
                    <div className="p-2 flex flex-col gap-y-3 rounded-lg">
                        <Badge className="text-sm">
                            {`#cliente:`}
                            <strong>{clienteId}</strong>
                        </Badge>
                        {email ? (
                            <Badge className="text-sm font-bold">{`email: ${email}`}</Badge>
                        ) : (
                            <Alert color="warning" withBorderAccent>
                                <span>
                                    <span className="font-medium">
                                        Usuario sin correo electrónico
                                    </span>{" "}
                                    puedes generar un link para mandar la
                                    evaluación por otro medio
                                </span>
                            </Alert>
                        )}
                    </div>

                    {email && (
                        <>
                            <div className="flex flex-col gap-y-5">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="countries"
                                        value="Selecciona una plantilla de correo:"
                                    />
                                </div>
                                <Select
                                    id="countries"
                                    required
                                    value={selectPlantilla}
                                    onChange={(event) =>
                                        setSelectPlantilla(event.target.value)
                                    }
                                >
                                    {plantillas?.length > 0 ? (
                                        plantillas.map((plantilla, index) =>
                                            plantilla ? (
                                                <option
                                                    key={index}
                                                    value={plantilla.id_correo}
                                                >
                                                    {plantilla.nombre_plantilla}
                                                </option>
                                            ) : null
                                        )
                                    ) : (
                                        <option>
                                            No se encontró plantillas de correo 
                                        </option>
                                    )}
                                </Select>
                            </div>
                            {selectPlantilla ? (
                                <Link
                                    href={`/preview.email/mail/${clienteId}/${selectPlantilla}`}
                                    method="get"
                                    className="text-white inline-block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    preserveState
                                >
                                    Ver-Preview correo
                                </Link>
                            ) : (
                               <Link
                               href="/panela/config.mail"
                               className="text-white inline-block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                               preserveState
                               >Crear plantilla</Link>
                            )}

                        </>
                    )}

                    <BtnPrimary
                        className={"bg-blue-600 hover:bg-blue-800"}
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
                            className="flex-grow mr-2"
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
