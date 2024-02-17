import React from "react";
import { Modal, TextInput, Label } from "flowbite-react";
import { useState } from "react";
import Parametros_de_Empresa from "../Parametros_de_Empresa";

const ModalParametros_empresa = ({ ModalMail, setModalMail, logo , empresa}) => {
   console.log(empresa);

    const [openModal, setOpenModal] = useState(ModalMail);
    function onCloseModal() {
        setOpenModal(false);
        setModalMail(false);
    }

    return (
        <>
            <Modal
                show={openModal}
                size="5xl"
                popup
                onClose={() => onCloseModal()}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Sign in to our platform
                        </h3>
                        <img src={logo} alt=""  width={"48px"} height={"48px"}/>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Your email" />
                        </div>
                        <TextInput
                            id="email"
                            placeholder="name@company.com"
                            required
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalParametros_empresa;
