import React from "react";
import { Button, Table } from "flowbite-react";
import { router } from "@inertiajs/react";

const Mailable = ({ reservas }) => {
    console.log(reservas);
    return (
        <div className="overflow-x-auto">
            <Table>
                <Table.Head>
                    <Table.HeadCell>ID Reservas</Table.HeadCell>
                    <Table.HeadCell>Fecha</Table.HeadCell>
                    <Table.HeadCell>Fecha Salida</Table.HeadCell>
                    <Table.HeadCell>Proveedor</Table.HeadCell>
                    <Table.HeadCell>Estado</Table.HeadCell>
                    <Table.HeadCell>Tipo Habitación</Table.HeadCell>
                    <Table.HeadCell>Número Habitación</Table.HeadCell>
                    <Table.HeadCell>Link</Table.HeadCell>
                    {/* Añade aquí más columnas según sea necesario */}
                </Table.Head>
                <Table.Body className="divide-y">
                    {reservas.map((reserva) => (
                        <Table.Row
                            key={reserva.id_reservas}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {reserva.id_reservas}
                            </Table.Cell>
                            <Table.Cell>{reserva.fecha}</Table.Cell>
                            <Table.Cell>
                                {reserva.fecha_hora_out_prev}
                            </Table.Cell>
                            <Table.Cell>{reserva.proveedor}</Table.Cell>
                            <Table.Cell>{reserva.estado}</Table.Cell>
                            <Table.Cell>{reserva.tipo_habitacion}</Table.Cell>
                            <Table.Cell>{reserva.numero_habitacion}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    onClick={() => {
                                        router.post("/Mailable/Reservas",
                                        {idReserva:reserva.id_reservas,
                                        fechaSalida:reserva.fecha_hora_out_prev
                                        
                                    });
                                    }}
                                >
                                    Genera link
                                </Button>
                            </Table.Cell>
                            {/* Añade aquí más celdas según sea necesario */}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export default Mailable;
