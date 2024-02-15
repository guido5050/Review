import React from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import Parametros_de_Empresa from "../Parametros_de_Empresa";

const ModalEmail = ({ ModalEmail, logo}) => {

    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Button onClick={() => setOpenModal(true)} size="600px">
                Toggle modal
            </Button>
            <Modal
                show={openModal}
                size="5xl"
                popup
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header />
                <Modal.Body >
                    <div>Hola modal</div>
                    <Parametros_de_Empresa logo={logo}></Parametros_de_Empresa>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalEmail;
