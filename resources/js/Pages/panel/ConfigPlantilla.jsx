import React, { useState, useEffect } from "react";
import Menu_Item from "./Menu_Item";
import FormularioMail from "./ui/FormularioMail";
import Swal from "sweetalert2";
import { Label, Select } from "flowbite-react";
import { RiMailSettingsLine } from "react-icons/ri";
import { Badge } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import AccesoDenegado from "./ui/AccesoDenegado";

const ConfigPlantilla = ({
    auth,
    logo,
    razon_social,
    plantillas,
    empresas,
    Accesos,
}) => {
    const [alertcreate, setAlertcreate] = useState(false);
    const [alertupdate, setAlertupdate] = useState(false);

    const [selectedId, setSelectedId] = useState(0);
    const [plantillaCurrent, setPlantillaCurrent] = useState({});

    useEffect(() => {
        const plantillaSeleccionada = plantillas.find(
            (plantilla) => plantilla.id_correo === Number(selectedId)
        );
        setPlantillaCurrent(plantillaSeleccionada);
    }, [selectedId, plantillas]);



    return (
        <>
            <Menu_Item
                user={auth.user}
                logo={logo}
                razon_social={razon_social}
                empresas={empresas}
            >
                {Accesos.find((acceso) => acceso.id == 8) ? (
                    <div>
                        <div className="flex items-center gap-x-1 justify-center p-3 ">
                            <Badge color="gray">
                                <h1 className="font font-extrabold text-xl">
                                    Configuracion de Email{" "}
                                </h1>
                            </Badge>
                            <RiMailSettingsLine size={"20px"} />
                        </div>
                        <div className="md:p-6 p-3">
                            <div className="max-w-md">
                                <div className="mb-2 block">
                                    <Label
                                        className="font-extrabold"
                                        htmlFor="countries"
                                        value="Seleccione una plantilla de correo existente o  Crear plantilla:"
                                    />
                                </div>
                                <Select
                                    id="countries"
                                    className="font-extrabold"
                                    required
                                    value={selectedId}
                                    onChange={(e) =>
                                        setSelectedId(Number(e.target.value))
                                    }
                                >
                                    <option
                                        value="0"
                                        className="font-extrabold"
                                    >
                                        CREAR PLANTILLA
                                    </option>
                                    {plantillas.map((plantilla) => (
                                        <option
                                            key={plantilla.id_correo}
                                            value={plantilla.id_correo}
                                        >
                                            {plantilla.nombre_plantilla}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                            <FormularioMail
                                key={
                                    plantillaCurrent
                                        ? plantillaCurrent.id_correo
                                        : "new"
                                }
                                plantillaCurrent={plantillaCurrent}
                                selectedId={selectedId}
                                alertcreate={alertcreate}
                                setAlertcreate={setAlertcreate}
                                setAlertupdate={setAlertupdate}
                            />{" "}
                        </div>
                    </div>
                ) : (
                    <AccesoDenegado />
                )}
            </Menu_Item>
        </>
    );
};

export default ConfigPlantilla;
