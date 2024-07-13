import React from "react";
import Swal from 'sweetalert2'

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";
import { router } from "@inertiajs/react";
import { useState } from "react";
import Buttonprimary from "@/Pages/components/Buttonprimary";

export default function PasswordChangeModal({ user }) {
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    function onCloseModal() {
        setOpenModal(false);
        setPassword("");
        setConfirmPassword("");
        setPasswordsMatch(true);

    }

    const passwordchanged = () => {
        console.log("Cambio de Contraseña");
        router.post(
            route("passwordchanged"),
            { user: user.nombre_completo,
                 userId: user.id_empleados,
                 email: user.email,
                 password:confirmPassword },
            {
                onSuccess: () => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Contraseña Cambiada, Se Envio un Email al Usuario",
                        showConfirmButton: false,
                        timer: 4000,
                      });
                    onCloseModal();
                },
            }
        );
    };

    return (
        <>
            <Buttonprimary
                disabled={user.nombre_completo == "Admin"}
                onClick={() => setOpenModal(true)}
            >
                Cambiar Contraseña
            </Buttonprimary>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl flex items-center font-medium gap-x-2 text-gray-900 dark:text-white">
                            Cambio de Contraseña
                            <TbPasswordUser />{" "}
                        </h3>
                        <h4 className="text-xl flex items-center font-medium gap-x-2 text-gray-900 dark:text-white">
                            {`Usuario: ${user.nombre_completo}`}{" "}
                        </h4>
                        <div className="relative">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="password"
                                    value="Your password"
                                />
                            </div>
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    defaultValue={password}
                                    type={showPassword ? "text" : "password"}
                                    className="pr-10"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordsMatch(
                                            e.target.value === confirmPassword
                                        );
                                    }}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="confirmPassword"
                                    value="Confirm your password"
                                />
                            </div>
                            <div className="relative">
                                <TextInput
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    className="pr-10"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setPasswordsMatch(
                                            e.target.value === password
                                        );
                                    }}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        {!passwordsMatch && confirmPassword && (
                            <p className="text-red-500 text-sm">
                                Las contraseñas no coinciden
                            </p>
                        )}
                        <div>
                            <Button
                                disabled={
                                    !password ||
                                    !confirmPassword ||
                                    !passwordsMatch
                                }
                                gradientMonochrome="success"
                                onClick={passwordchanged}
                                className="font-extrabold"
                            >
                                Cmabiar Contraseña
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
