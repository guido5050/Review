import { router } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import Meni_Item from "./Menu_Item";
const Parametros_de_Empresa = ({ auth, config }) => {
    const [value, setValues] = useState({
        logo: config.logo,
        correo: config.correo,
        razon_social: config.razon_social,
        telefono: config.telefono,
        id: config.id,
        direccion_local: config.direccion_local,
    });
    function handleChange(e) {
        if (e.target.id === "logo") {
            // Manejar el archivo de imagen
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onloadend = () => {
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
        router.post("/panela/empresa_actualizar", value);
    };

    return (
        <>
            <Meni_Item user={auth.user}>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="flex flex-col">
                        <img
                            src={config.ruta_logo}
                            alt="Imagen De La Empresa"
                            className="img-thumbnail"
                            width={"48px"}
                        />
                        <label htmlFor="logo" className="font-bold mb-1">
                            Logo:
                        </label>
                        <input
                            type="file"
                            id="logo"
                            name="logo"
                            className="form-control-file"
                            style={{ color: "transparent" }}
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold mb-1">Correo:</label>
                        <input
                            id="correo"
                            type="email"
                            onChange={handleChange}
                            required
                            defaultValue={config.correo}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold mb-1">Razón Social:</label>
                        <input
                            id="razon_social"
                            type="text"
                            defaultValue={config.razon_social}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold mb-1">Teléfono:</label>
                        <input
                            id="telefono"
                            type="tel"
                            defaultValue={config.telefono}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold mb-1">ID:</label>
                        <input
                            id="id"
                            hidden
                            type="text"
                            defaultValue={config.id}
                            onChange={(e) => setId(e.target.value)}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold mb-1">
                            Dirección Local:
                        </label>
                        <input
                            id="direccion_local"
                            type="text"
                            defaultValue={config.direccion_local}
                            onChange={handleChange}
                            className="border p-2 rounded"
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
