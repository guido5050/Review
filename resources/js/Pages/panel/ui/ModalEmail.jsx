import React from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";

const ModalEmail = ({ModalEmail}) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
            <Modal
                show={openModal}
                size="md"
                popup
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header />
                <Modal.Body>
                   <div>Hola modal</div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalEmail;
