import React, { useState } from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import BtnPrimary from "./BtnPrimary";
import { router } from '@inertiajs/react'


const ModalCrearClientes = () => {
    const [openModal, setOpenModal] = useState(false);
    const [values, setValues] = useState({
        nombre_completo: "",
        nacionalidad: "",
        num_identificacion: "",
        num_telefono: "",
        email: "",
        ciudad: "",
        id_empresa: "",
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function onCloseModal() {
        setOpenModal(false);
        setValues({
            nombre_completo: "",
            nacionalidad: "",
            num_identificacion: "",
            num_telefono: "",
            email: "",
            ciudad: "",
            id_empresa: "",
        });
    }

    function handleSubmit(e) {
        e.preventDefault()
        router.post('/panela/clientes/crear', values,{
            onSuccess: () => {
                onCloseModal();
            }
        })
      }

    return (
        <>
            <BtnPrimary
                onClick={() => setOpenModal(true)}
                className={"bg-blue-700"}
            >
                Agregar usuario
            </BtnPrimary>
            <Modal show={openModal} size="xl" popup onClose={onCloseModal}>
                <Modal.Header />
                <Modal.Body>

                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Ingresa Datos del Cliente
                        </h3>

                        <form action="" onSubmit={handleSubmit}>
                            <div className="mb-2 block">
                                <Label for="nombre_completo">
                                    Nombre completo
                                </Label>
                                <TextInput
                                    id="nombre_completo"
                                    value={values.nombre_completo}
                                    required
                                    onChange={handleChange}
                                    placeholder="Nombre completo"
                                />
                            </div>
                            <div className="mb-2 block">
                                <Label for="nacionalidad">Nacionalidad</Label>
                                <TextInput
                                    id="nacionalidad"
                                    value={values.nacionalidad}
                                    onChange={handleChange}
                                    placeholder="Nacionalidad"
                                />
                            </div>
                            <div className="mb-2 block">
                                <Label for="num_identificacion">
                                    Número de identificación
                                </Label>
                                <TextInput
                                    id="num_identificacion"
                                    value={values.num_identificacion}
                                    onChange={handleChange}
                                    placeholder="Número de identificación"
                                />
                            </div>
                            <div className="mb-2 block">
                                <Label for="num_telefono">
                                    Número de teléfono
                                </Label>
                                <TextInput
                                    id="num_telefono"
                                    value={values.num_telefono}
                                    onChange={handleChange}
                                    placeholder="Número de teléfono"
                                />
                            </div>
                            <div className="mb-2 block">
                                <Label for="email">Email</Label>
                                <TextInput
                                    id="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                            </div>
                            <div className="mb-2 block">
                                <Label for="ciudad">Ciudad</Label>
                                <TextInput
                                    id="ciudad"
                                    value={values.ciudad}
                                    onChange={handleChange}
                                    placeholder="Ciudad"
                                />
                            </div>

                            <BtnPrimary  className={"bg-blue-700"}  type="submit">
                                Agregar usuario
                            </BtnPrimary>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalCrearClientes;
