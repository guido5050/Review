import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import BtnPrimary from "./BtnPrimary";
import Swal from "sweetalert2";
import Buttonprimary from "@/Pages/components/Buttonprimary";

const ModalCrearRoles = ({ cargo, Accesos }) => {
    console.log(Accesos);
    const [openModal, setOpenModal] = useState(false);
    const [AccesoSeleccionado, setAccesoSeleccionado] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const [values, setValues] = useState({
        nombre: "",
        descripcion: "",
    });

    function onCloseModal() {
        setOpenModal(false);
        setAccesoSeleccionado([]);
    }

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }
    console.log(values);
    function handleSubmit(e) {
        e.preventDefault();

        router.post("/panela/usuarios/roles/create", { role: values, Accesos: AccesoSeleccionado },{
            onSuccess: () => {
                onCloseModal();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Role Creado Exitosamente",
                    showConfirmButton: false,
                    timer:2000
                });
            },
            onError: (error) => {
                console.error("Error al crear el rol:", error);
            }
        });
        // router.visit("/panela/usuarios");
    }
    console.log(AccesoSeleccionado);

    const handleCheck = (id, checked) => {



        let index = AccesoSeleccionado.indexOf(id);


        if (index !== -1 && checked===false) {
            AccesoSeleccionado.splice(index, 1);
        }else{
            AccesoSeleccionado.push(id);
        }
      setAccesoSeleccionado([...AccesoSeleccionado]);
    };

    return (
        <>
            <Buttonprimary onClick={() => setOpenModal(true)} color="blue">
                Crear Rol
            </Buttonprimary>

            <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
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
                            <div className="mb-2 block">
                                <Label htmlFor="Accesos" value="Accesos:" />
                                <div className="flex gap-x-1 mb-4">
                                    <Label
                                        htmlFor="As"
                                        value="Asignar Todos los Accesos:"
                                    />
                                    <Checkbox
                                        checked={selectAll}
                                        onChange={(e) =>
                                            setSelectAll(e.target.checked)
                                        }
                                    />
                                </div>
                                {Accesos.map((Acceso) => (
                                    <div
                                        key={Acceso.id}
                                        className="flex items-center gap-x-2"
                                    >
                                        <Checkbox
                                            id={Acceso.id}
                                            value={Acceso.id}
                                            label={Acceso.nombre}

                                            onClick={(e) => {
                                                handleCheck(
                                                    Acceso.id,
                                                    e.target.checked
                                                );
                                            }}
                                        />
                                        <p>{Acceso.nombre_vista}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full">
                                <Buttonprimary
                                    type="submit"
                                >
                                    Crear Rol
                                </Buttonprimary>
                            </div>
                        </div>
                    </Modal.Body>
                </form>
            </Modal>
        </>
    );
};

export default ModalCrearRoles;
