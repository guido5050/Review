import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";
import Menu_Item from "./Menu_Item";
import { Checkbox } from "flowbite-react";
import { Button } from "flowbite-react";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import ModalAsignarAccesos from "./ui/ModalAsignarAccesos";
const Accesos = ({
    auth,
    logo,
    razon_social,
    AppName,
    EmpresasAs,
    empleado,
    empresas,
    accesos,
    asignaAccesos,
    EmpleadoId,
}) => {
    //console.log( asignaAccesos);
    const [empresaAsig, setEmpresaAsig] = useState(EmpresasAs);


    const handleCheck = (idAcceso, Checked, empresaId) => {
        router.post(
            `/panela/usuarios/accesos/${EmpleadoId}/Asignar`,
            {
                idAcceso: idAcceso,
                Checked: Checked,
                empresa: empresaId,
            },
            { preserveState: true }
        );
    };

    const handleCheckEliminarAccesos = (empresaId, Checked) => {
        console.log(empresaId, Checked);
        router.post(
            `/panela/usuarios/accesos/${EmpleadoId}/Eliminar`,
            {
                empresa: empresaId,
                Checked: Checked,
            },
            { preserveState: false }
        );
    };

    return (
        <Menu_Item
            user={auth.user}
            logo={logo}
            razon_social={razon_social}
            AppName={AppName}
            empresas={empresas}
        >
            <>
                <div className="flex flex-col p-8  justify-center gap-y-4">
                    <div>
                        <div className="flex w-[20%] flex-col">
                            <h1 className="font-extrabold text-2xl">
                                {empleado.nombre_completo}
                            </h1>
                            <ModalAsignarAccesos
                                empresas={empresas}
                                empleado={empleado}
                                EmpleadoId={EmpleadoId}
                                empresaAsig={empresaAsig}
                            />
                        </div>
                        {EmpresasAs.map((empresa, index) => {
                            const accesosPorEmpresa = accesos.filter(
                                (acceso) =>
                                    acceso.pivot.id_parametro === empresa.id
                            );
                            return (
                                <div key={index} className=" ">
                                    <div className="flex gap-x-1 items-center m-3 justify-start">
                                        <p className="font-extrabold text-[40px] ">
                                            {empresa.razon_social} - Accesos - {accesosPorEmpresa.length}
                                        </p>
                                        <Checkbox
                                            className="w-[30px] h-[30px]"
                                            // defaultChecked={true}
                                            checked={true}
                                            value={empresa.id}
                                            onClick={async (e) => {
                                                const result = await Swal.fire({
                                                    title: "Confirmación",
                                                    text: `¿Estás seguro de que quieres Eliminar el Acceso a: ${empresa.razon_social} para este Usuario:${empleado.nombre_completo} ?`,
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonText:
                                                        "Sí, eliminar",
                                                    cancelButtonText:
                                                        "No, cancelar",
                                                    allowOutsideClick: false, // No permite cerrar la modal al hacer clic fuera
                                                    allowEscapeKey: false, // No permite cerrar la modal al presionar ESC
                                                });

                                                if (result.isConfirmed) {
                                                    handleCheckEliminarAccesos(
                                                        empresa.id,
                                                        e.target.checked
                                                    );
                                                } else {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <hr />
                                    </div>
                                    <div className="flex flex-col gap-y-2  ">
                                        {asignaAccesos.map((a, index) => (
                                            <div key={index} className=" ">
                                                <div className="bg-gray-200 rounded-lg flex items-center gap-x-2 p-2 w-1/4">
                                                    <Checkbox
                                                        value={a.id}
                                                        defaultChecked={
                                                            accesos.find(
                                                                (acceso) =>
                                                                    acceso.id ===
                                                                        a.id &&
                                                                    acceso.pivot
                                                                        .id_parametro ===
                                                                        empresa.id
                                                            )
                                                                ? true
                                                                : false
                                                        }
                                                        onClick={(e) =>
                                                            handleCheck(
                                                                a.id,
                                                                e.target
                                                                    .checked,
                                                                empresa.id
                                                            )
                                                        }
                                                    />
                                                    <p key={index}>
                                                        {a.nombre_vista}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </>
        </Menu_Item>
    );
};
export default Accesos;
