import React from "react";
import { useState } from "react";
import { Button, Checkbox, Label, Modal, Select } from "flowbite-react";
import { router } from '@inertiajs/react'
const ModalAsignarAccesos = ({ empresas,empresaAsig,empleado,EmpleadoId }) => {
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState("");
    function onCloseModal() {
        setOpenModal(false);
        setValue(empresasAsignadas[0].id)

    }
    const [empresaslogin, setEmpresasLogin] = useState(empresas);
    const [empresasAsignadas, setEmpresasAsignadas] = useState(empresaAsig);
    const [value, setValue]=useState(empresasAsignadas[0].id);


    const handleCheck = (e) => {

        const empresaId = Number(e.target.value);
        setValue(empresaId);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const existe=empresasAsignadas.find(empresa => empresa.id === value)?true:false;
        console.log(existe);
        if(existe){
            //console.log('Ya existe');
            alert(`La Empresa Seleccionada ya esta asignada al Usuario ${empleado.nombre_completo}`);
        }else{
            router.post(`/panela/usuarios/accesos/${EmpleadoId}/AsignarEmpresa`,
                {
                    empresa: value,
                },
                { preserveState: true },
            );
            onCloseModal();
          }

    }
    return (
        <>
            <Button  color="blue" onClick={() => setOpenModal(true) }>Asignar Accesos</Button>
            <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div>
                        <h1>Asignar Empresas</h1>
                    </div>
                    <div>
                        <h1>{}</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-evenly flex-col  p-1 gap-y-7">
                        <Select onChange={handleCheck}>
                            {empresaslogin.map((empresa, index) => (
                                <option className="font-extrabold text-[20px] " key={index} value={empresa.id}  defaultValue={empresa.id} >
                                    {empresa.razon_social}
                                </option>
                            ))}
                        </Select>
                        <Button type="submit" color="blue">Asignar</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalAsignarAccesos;
