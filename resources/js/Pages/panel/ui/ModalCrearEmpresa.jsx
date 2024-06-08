import React from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { FileInput } from "flowbite-react";
import { router } from "@inertiajs/react";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import Swal from "sweetalert2";

const ModalCrearEmpresa = () => {
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState("");

    function onCloseModal() {
        setOpenModal(false);
        setEmail("");
    }

    const [image, setImage] = useState(null);

    const [value, setValues] = useState({
        ruta_logo: "",
        correo: "",
        razon_social: "",
        ruc: "",
        telefono: "",
        facebook: "",
        instagram: "",
        web: "",
        direccion_local: "",
        item_source: 3,
        moneda_item_source: 1,
    });

    function handleChange(e) {
        if (e.target.id === "ruta_logo") {
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
        console.log(value);
        e.preventDefault();
        let formData = new FormData();
        for (let key in value) {
            formData.append(key, value[key]);
        }
        // Aquí puedes hacer la llamada al servidor para actualizar los datos
        router.post("/panela/empresa/crear", formData, {
            onSuccess: () => {
                setImage(null);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Empresa creada correctamente",
                    showConfirmButton: false,
                    timer: 2000,
                });
            },
        });

        setOpenModal(false);
    };

    return (
        <>
            <Button
                className="px-20 mt-12 bg-blue-600 hover:bg-blue-700 transition-all duration-200 ease-in-out"
                onClick={() => setOpenModal(true)}
            >
                Crear Empresa
            </Button>
            <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-md mx-auto animate-fade-left animate-ease-in-out flex flex-col justify-center mt-4 overflow-y-auto  gap-y-2 flex-grow mb-7"
                    >
                        <div className="flex flex-col">
                            <div className="flex items-center justify-center "></div>

                            <label
                                htmlFor="logo"
                                className="font-bold mb-1 flex items-center"
                            >
                                Logo:
                            </label>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="file-upload"
                                        value="Upload file"
                                    />
                                </div>
                                <FileInput
                                    id="ruta_logo"
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
                                Correo:
                            </label>
                            <input
                                id="correo"
                                type="email"
                                onChange={handleChange}
                                required
                                className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-bold mb-1 flex items-center">
                                Razón Social:
                            </label>
                            <input
                                id="razon_social"
                                type="text"
                                required
                                onChange={handleChange}
                                className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-bold mb-1 flex items-center">
                                Teléfono:
                            </label>
                            <input
                                id="telefono"
                                required
                                type="tel"
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
                                placeholder="Inserta la url"
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
                                //defaultValue={web}
                                placeholder="Inserta la url"
                                onChange={handleChange}
                                className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-bold mb-1 flex items-center">
                                Numero Ruc:
                            </label>
                            <input
                                id="ruc"
                                type="text"
                                required
                                onChange={handleChange}
                                className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <div className="flex">
                                <label className="font-bold mb-1 flex items-center">
                                    Dirección Local:
                                </label>
                            </div>

                            <textarea
                                id="direccion_local"
                                type="text"
                                required
                                onChange={handleChange}
                                className="px-2 py-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded mt-3 hover:bg-blue-700 transition-all duration-200 ease-in-out"
                        >
                            Crear Empresa
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalCrearEmpresa;
