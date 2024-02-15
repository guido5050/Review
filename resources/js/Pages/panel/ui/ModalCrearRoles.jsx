import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Label, Modal, TextInput } from "flowbite-react";
import BtnPrimary from "./BtnPrimary";

const ModalCrearRoles = ({ setModal_CrearRoles, modal_crearroles }) => {
    const [openModal, setOpenModal] = useState(modal_crearroles);
    const [values, setValues] = useState({
        nombre: "",
        descripcion: "",
    });

    function onCloseModal() {
        setOpenModal(false);
        setModal_CrearRoles(false);
    }

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
        setModal_CrearRoles(false);
        router.post("/panela/usuarios/roles/create", values);
        router.visit("/panela/usuarios");

    }

    return (
        <>
            <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
                <Modal.Header />
                <form onSubmit={handleSubmit} className="overflow-y-auto p-5">
                    <Modal.Body>
                        <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                Creacion De Roles
                            </h3>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="nombre"
                                        value="Nombre Rol:"
                                    />
                                </div>
                                <TextInput
                                    id="nombre"
                                    placeholder="Escriba el nombre del rol"
                                    type="text"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="descripcion"
                                        value="Descripción:"
                                    />
                                </div>
                                <TextInput
                                    id="descripcion"
                                    placeholder="Escriba la descripción del rol"
                                    type="text"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <BtnPrimary
                                    type="submit"
                                    className={" hover:bg-blue-500 bg-blue-600"}
                                >
                                    Crear Rol
                                </BtnPrimary>
                            </div>
                        </div>
                    </Modal.Body>
                </form>
            </Modal>
        </>
    );
};

export default ModalCrearRoles;
