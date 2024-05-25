import { Select, Label, Modal, TextInput, Checkbox } from "flowbite-react";
import { useState } from "react";
import BtnPrimary from "./BtnPrimary";
import { router } from "@inertiajs/react";

const ModalCrearUsuarios = ({
    modal_crearusuarios,
    setModal_CrearUsuarios,
    cargo,
    setAlertcreate,
    empresas,
}) => {
    const [openModal, setOpenModal] = useState(modal_crearusuarios);
    const [empresasx_, setEmpresas] = useState([]);

    function onCloseModal() {
        setOpenModal(false);
        setModal_CrearUsuarios(false);
    }

    const [value, setValues] = useState({
        nombre_completo: "",
        email: "",
        usuario: "",
        password: "",
        num_identificacion: "",
        num_telefono: "",
        cargo: "",
        activo: "no",
    });
    function handleChange(e) {
        const key = e.target.id;
        const value =
            e.target.type === "select-one" ? e.target.value : e.target.value;

        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(empresasx_);
        //mm
        router.post("/register.store", {empleado: value, empresas: empresasx_}, {
            onSuccess: () => {
                setModal_CrearUsuarios(false);
                setAlertcreate(true);
                setTimeout(() => {
                    setAlertcreate(false);
                }, 2500);
            },
        });
        //router.visit("/panela/usuarios");
    }

    const handleChangeEmpresa = (idEmpresa) => {
        const empresaCurrent = empresas.find(
            (empresa) => empresa.id === idEmpresa
        );

        let empresaExistente = empresasx_.find(
            (empresa_x) => empresa_x.id === empresaCurrent.id
        );

        if (empresaExistente) {
            let index = empresasx_.indexOf(empresaExistente);

            empresasx_.splice(index, 1);

            console.log(empresasx_);
        } else {
            setEmpresas([...empresasx_, empresaCurrent]);
        }
    };



    return (
        <>
            {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
            <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
                <Modal.Header />
                <form onSubmit={handleSubmit} className="  overflow-y-auto p-5">
                    <Modal.Body>
                        <div className="space-y-6 animate-fade-left animate-ease-in-out">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                Creacion De Usuario
                            </h3>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="email"
                                        value="Nombre completo"
                                    />
                                </div>
                                <TextInput
                                    id="nombre_completo"
                                    placeholder="Nombre completo"
                                    type="text"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="email"
                                        value="E-Mail Address"
                                    />
                                </div>
                                <TextInput
                                    id="email"
                                    placeholder="name@ejempl.com"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="usuario" value="Usuario: Con este Usuario Iniciara Sesion(loigin)❗️" />
                                </div>
                                <TextInput
                                    id="usuario"
                                    placeholder=""
                                    onChange={handleChange}
                                    type="text"
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="password"
                                        value="Contraseña"
                                    />
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>


                            <div className="flex gap-x-10 ">
                                <div className="w-1/2">
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="No-indentificacion"
                                            value="No-indentificacion"
                                        />
                                    </div>
                                    <TextInput
                                        id="num_identificacion"
                                        placeholder="numero de indentificacion"
                                        onChange={handleChange}
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="No-Telefono"
                                            value="No-Telefono"
                                        />
                                    </div>
                                    <TextInput
                                        id="num_telefono"
                                        placeholder="No-Telefono"
                                        onChange={handleChange}
                                        type="text"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex gap-x-10 ">
                                <div className="w-1/2">
                                    <div className="mb-2 block">
                                        <Label htmlFor="Cargo" value="Cargo" />
                                    </div>
                                    <Select
                                        id="cargo"
                                        onChange={handleChange}
                                        required
                                    >
                                        {cargo.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.nombre}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="w-1/2">
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="Activo"
                                            value="Usuarios Activo ?"
                                        />
                                    </div>
                                    <Select
                                        id="activo"
                                        required
                                        onChange={handleChange}
                                    >
                                        <option>no</option>
                                        <option>si</option>
                                    </Select>
                                </div>
                            </div>
                            <div className=" flex flex-col  gap-2">
                                <Label
                                    htmlFor="empresas"
                                    value="Asignar Empresas"
                                />
                                <div className="grid p-3 grid-flow-row grid-cols-1 md:grid-cols-3 gap-5 max-h-70 overflow-x-auto">
                                    {empresas.map((empresa) => (
                                        <div
                                            key={empresa.id}
                                            className="flex items-center gap-2"
                                        >
                                            <Checkbox
                                                id={empresa.id}
                                                onClick={() => {
                                                    handleChangeEmpresa(
                                                        empresa.id
                                                    );
                                                }}
                                            />
                                            <Label
                                                htmlFor={empresa.id}
                                                className="flex"
                                            >
                                                <span>
                                                    {empresa.razon_social}
                                                </span>
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between"></div>
                            <div className="w-full">
                                <BtnPrimary
                                    type="submit"
                                    className={" hover:bg-blue-500 bg-blue-600"}
                                >
                                    Crear Usuario
                                </BtnPrimary>
                            </div>
                        </div>

                    </Modal.Body>
                </form>
            </Modal>
        </>
    );
};

export default ModalCrearUsuarios;
