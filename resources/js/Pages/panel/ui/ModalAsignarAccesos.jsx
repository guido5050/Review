import React from "react";
import { useState } from "react";
import { Button, Checkbox, Label, Modal, Select } from "flowbite-react";

const ModalAsignarAccesos = ({ empresas,asignaAccesos,empleado }) => {
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState("");
    function onCloseModal() {
        setOpenModal(false);
        setEmail("");
    }
    console.log(empleado);
    // console.log(accesos);

    const handleCheck = (id) => {
        console.log(id);
    }
    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Asignar Accesos</Button>
            <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div>
                        <h1>Asignar Accesos</h1>
                    </div>
                    <div>
                        <h1>{}</h1>
                    </div>
                    <form>
                        <div className="flex justify-evenly flex-col  p-1 gap-y-2">
                        <Label>Empresas</Label>
                        <Select>
                            {empresas.map((empresa, index) => (
                                <option key={index} value={empresa.id}>
                                    {empresa.razon_social}
                                </option>
                            ))}
                        </Select>
                        </div>

                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalAsignarAccesos;
