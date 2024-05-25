import { router } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import Meni_Item from "./Menu_Item";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import { IoDocumentAttachOutline } from "react-icons/io5";
import ModalCrearEmpresa from "./ui/ModalCrearEmpresa";
import { FileInput, Label, Badge } from "flowbite-react";
import { IoIosAlert } from "react-icons/io";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

const Parametros_de_Empresa = ({
    auth,
    config,
    logo,
    razon_social,
    redes_sociales,
    empresas,
}) => {
    const [image, setImage] = useState(null);

    const facebook = redes_sociales.find(
        (red) => red.nombre_redsocial === "facebook"
    )?.enlace;
    const instagram = redes_sociales.find(
        (red) => red.nombre_redsocial === "instagram"
    )?.enlace;
    const web = redes_sociales.find(
        (red) => red.nombre_redsocial === "web"
    )?.enlace;

    const [value, setValues] = useState({
        logo: config.logo,
        correo: config.correo,
        razon_social: config.razon_social,
        ruc: config.ruc,
        telefono: config.telefono,
        id: config.id,
        direccion_local: config.direccion_local,
        facebook: facebook,
        instagram: instagram,
        web: web,
    });

    console.log(value);

    console.log(typeof value); // object

    function handleChange(e) {
        if (e.target.id === "logo") {
            // Manejar el archivo de imagen
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onloadend = () => {
                setImage(URL.createObjectURL(file));
                setValues((values) => ({
                    ...values,
                    [e.target.id]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            // Manejar los otros campos
            const key = e.target.id;
            const value = e.target.value;
            setValues((values) => ({
                ...values,
                [key]: value,
            }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        for (let key in value) {
            formData.append(key, value[key]);
        }
        // Aquí puedes hacer la llamada al servidor para actualizar los datos
        router.post("/panela/empresa_actualizar", formData, {
            onSuccess: () => {
                setImage(null);
            },
        });

        //setImage(null);
    };

    // Resto del código...
    return (
        <>
            <Meni_Item user={auth.user} logo={logo} razon_social={razon_social} empresas={empresas}>
                <div className="flex items-center justify-center mt-3">
                    <ModalCrearEmpresa />
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-md mx-auto  animate-fade-left animate-ease-in-out flex flex-col justify-center mt-4 overflow-y-auto  gap-y-2 flex-grow mb-7"
                >
                    <Badge color="info" size={"xl"}>
                        {" "}
                        <IoIosAlert /> Configuraciones de empresa puedes
                        actualizar los datos o crear una nueva
                    </Badge>
                    <div className="flex flex-col">
                        <div className="flex items-center justify-center "></div>
                        <div className="">
                            <img
                                className="img-thumbnail border-2  border-gray-300 rounded-md"
                                src={config.ruta_logo}
                                alt="Imagen De La Empresa"
                                width={"48px"}
                            />
                        </div>

                        <label
                            htmlFor="logo"
                            className="font-bold mb-1 flex items-center"
                        >
                            Logo: <RiImageAddFill />
                        </label>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="file-upload"
                                    value="Upload file"
                                />
                            </div>
                            <FileInput
                                id="logo"
                                type="file"
                                name="logo"
                                className="form-control-file"
                                onChange={handleChange}
                            />
                            {image && (
                                <div className="w-full bg-slate-100 mt-2 flex p-7 items-center justify-center">
                                    <img
                                        src={image}
                                        alt="preview"
                                        width={"40px"}
                                    />
                                </div>
                            )}
                        </div>
                        {/* <div className="flex ">
                            <input
                                type="file"
                                id="logo"
                                name="logo"
                                className="form-control-file hidden"
                                style={{ color: "transparent" }}
                                accept="image/*"
                                onChange={handleChange}
                            />

                        </div> */}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold mb-1 flex items-center">
                            Correo: <MdOutlineMailOutline />
                        </label>
                        <input
                            id="correo"
                            type="email"
                            onChange={handleChange}
                            required
                            defaultValue={config.correo}
                            className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold mb-1 flex items-center">
                            Razón Social: <MdOutlineMapsHomeWork />
                        </label>
                        <input
                            id="razon_social"
                            type="text"
                            defaultValue={config.razon_social}
                            required
                            onChange={handleChange}
                            className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold mb-1 flex items-center">
                            Teléfono: <MdOutlineLocalPhone />
                        </label>
                        <input
                            id="telefono"
                            type="tel"
                            required
                            defaultValue={config.telefono}
                            onChange={handleChange}
                            className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold mb-1 flex items-center">
                            Numero Ruc: <IoDocumentAttachOutline />
                        </label>
                        <input
                            id="ruc"
                            type="text"
                            required
                            defaultValue={config.ruc}
                            onChange={handleChange}
                            className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold mb-1 flex items-center">
                            Facebook:
                            <FaSquareFacebook />
                        </label>
                        <input
                            id="facebook"
                            type="text"
                            placeholder="Inserta la url"
                            defaultValue={facebook}
                            onChange={handleChange}
                            className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold mb-1 flex items-center">
                            Instagran: <FaInstagram />
                        </label>
                        <input
                            id="instagram"
                            type="text"
                            required
                            placeholder="Inserta la url"
                            defaultValue={instagram}
                            onChange={handleChange}
                            className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold mb-1 flex items-center">
                            Sitio Web:
                            <TbWorld />
                        </label>
                        <input
                            id="web"
                            type="text"
                            placeholder="Inserta la url"
                            defaultValue={web}
                            onChange={handleChange}
                            className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <input
                            id="id"
                            hidden
                            type="text"
                            defaultValue={config.id}
                            onChange={(e) => setId(e.target.value)}
                            className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex">
                            <label className="font-bold mb-1 flex items-center">
                                Dirección Local:
                                <IoLocationOutline />
                            </label>
                        </div>

                        <textarea
                            id="direccion_local"
                            type="text"
                            defaultValue={config.direccion_local}
                            onChange={handleChange}
                            required
                            className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded mt-3 hover:bg-blue-700 transition-all duration-200 ease-in-out"
                    >
                        Actualizar
                    </button>
                </form>
            </Meni_Item>
        </>
    );
};

export default Parametros_de_Empresa;
