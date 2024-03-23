import React, { useState, useEffect } from "react";
import Menu_Item from "./Menu_Item";
import FormularioMail from "./ui/FormularioMail";
import { Label, Select } from "flowbite-react";
import { RiMailSettingsLine } from "react-icons/ri";
import { Badge } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

const ConfigPlantilla = ({ auth, logo, razon_social, plantillas }) => {
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

    //console.log(selectedId);

    return (
        <>
            <Menu_Item user={auth.user} logo={logo} razon_social={razon_social}>
                {alertcreate && (
                    <Alert
                        color="success"
                        icon={HiInformationCircle}
                        className="animate-fade-left animate-ease-in-out "
                    >
                        <span className="font-extrabold text-xl animate-fade animate-ease-in text-center">
                            PLANTILLA CREADA!
                        </span>{" "}
                        .
                    </Alert>
                )}
                {alertupdate && (
                    <Alert
                        color="info"
                        icon={HiInformationCircle}
                        className="animate-fade-left animate-ease-in-out "
                    >
                        <span className="font-extrabold text-xl animate-fade animate-ease-in text-center">
                            PLANTILLA ACTUALIZADA!
                        </span>{" "}
                        .
                    </Alert>
                )}

                <div className="flex items-center gap-x-1 justify-center p-3">
                    <Badge color="gray">
                        <h1 className="font font-extrabold text-xl">
                            Configuracion de Email{" "}
                        </h1>
                    </Badge>
                    <RiMailSettingsLine size={"20px"} />
                </div>
                <div className="p-6">
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
                            <option value="0" className="font-extrabold">
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
            </Menu_Item>
        </>
    );
};

export default ConfigPlantilla;
