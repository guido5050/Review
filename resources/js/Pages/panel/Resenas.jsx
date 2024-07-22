"use client";

import React from "react";
import Menu_Item from "./Menu_Item";
import { Table, Rating, Button, Tooltip } from "flowbite-react";
import Buttonprimary from "../components/Buttonprimary";
import { startOfYear, endOfYear } from "date-fns";
import { router } from "@inertiajs/react";
import { Pagination } from "flowbite-react";
import { BsCalendar2Date } from "react-icons/bs";
import { GrPieChart } from "react-icons/gr";
import { BsFillPieChartFill } from "react-icons/bs";
import { FcDoughnutChart } from "react-icons/fc";
import { useState, useMemo } from "react";
import AccesoDenegado from "../panel/ui/AccesoDenegado";
import BarraEstaDistica from "./components/BarraEstaDisticaporMes";
import BarraEstaDisticaporDia from "./components/BarraEstaDisticaporDia";
import { Label, Select } from "flowbite-react";
import { FaFilter } from "react-icons/fa6";
import { MdFilterAltOff } from "react-icons/md";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

const Resenas = ({
    auth,
    resenas,
    logo,
    razon_social,
    AppName,
    estados,
    empresas,
    Accesos,
    promedioMes,
    promedioAño,
    promeYear,
}) => {

    const [year, setYear] = useState(new Date());

    const date = new Date(); //fecha actual
    const currentMonth = date.getMonth() + 1; // getMonth() devuelve un número de 0 (enero) a 11 (diciembre),
    // por lo que sumamos 1 para obtener un número de 1 (enero) a 12 (diciembre)
    const currentDay = date.getDay(); //Aqui obtengo el dia de la semana

    const [month, setMonth] = useState(new Date());

    const [day, setDay] = useState(currentDay);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const currentYearStart = startOfYear(new Date());
    const currentYearEnd = endOfYear(new Date());

    const onPageChange = (page) => {
        router.get(
            route("resenas", { page: page }),
            {},
            { preserveState: true }
        );
    };

    const filtrofecha = () => {
        router.get(
            route("resenas", { startDate: startDate, endDate: endDate }),
            {},
            { preserveState: true }
        );
        setYear(new Date());
    };
    const filtroporaño = () => {
        router.get(
            route("resenas", { year: year }),
            {},
            { preserveState: true  }
        );
        setStartDate(new Date());
        setEndDate(new Date());
    };
    const filtroporMes = () => {
        router.get(
            route("resenas", { month: month }),
            {},
            { preserveState: true}
        );
        handleButtonClick();
    };

    const resetearfiltro = () => {
        router.get(route("resenas"));
    };



    const handleButtonClick = () => {
        const [monthValue, yearValue] = month.split("/");
        const newYear = new Date(yearValue, monthValue - 1).getFullYear();
        setYear(newYear);
    };

    const renderYearContent = (year) => {
        const tooltipText = `Tooltip for year: ${year}`;
        return <span title={tooltipText}>{year}</span>;
    };
    const renderMonthContent = (month, shortMonth, longMonth, day) => {
        const fullYear = new Date(day).getFullYear();
        const tooltipText = `Tooltip for month: ${longMonth} ${fullYear}`;

        return <span title={tooltipText}>{shortMonth}</span>;
    };
    //TODO: Este componente es la vista de Evaluaciones a Empresas

    return (
        <>
            <Menu_Item
                user={auth.user}
                razon_social={razon_social}
                logo={logo}
                AppName={AppName}
                empresas={empresas}
            >
                {Accesos.find((acceso) => acceso.id === 1) ? (
                    <div className=" animate-fade-down animate-ease-out p-8">
                        <div className="  flex  py-2 gap-y-3  flex-col ">
                            <div className="max-w-md flex gap-x-3 whitespace-nowrap items-center ">
                                <Label>Fecha Inicio</Label>
                                <DatePicker
                                    selected={startDate}
                                    showIcon
                                    icon={<BsCalendar2Date className="ml-3" />}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    locale={es}
                                    startDate={startDate}
                                    minDate={currentYearStart}
                                    maxDate={currentYearEnd}
                                    endDate={endDate}
                                    className="rounded-lg  flex items-center text-center ml-3"
                                />
                                <Label>Fecha Fin</Label>
                                <DatePicker
                                    selected={endDate}
                                    showIcon
                                    icon={<BsCalendar2Date />}
                                    locale={es}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    className="rounded-lg  flex items-center text-center "
                                    maxDate={currentYearEnd}
                                    endDate={endDate}
                                    minDate={startDate}
                                />

                                <Buttonprimary
                                    size={'sm'}
                                    onClick={() => {
                                        filtrofecha();
                                    }}
                                    >
                                    Filtrar Por Rango{" "}
                                    <FaFilter className="ml-2" />{" "}
                                </Buttonprimary>

                                <Buttonprimary
                                    size={'sm'}
                                    className="whitespace-nowrap"
                                    onClick={resetearfiltro}
                                >
                                    Resetear Filtro{" "}
                                    <MdFilterAltOff className="ml-2" />
                                </Buttonprimary>
                            </div>
                            <div className="flex items-center gap-x-3   ">
                                <Label>Buscar por año</Label>
                                <DatePicker
                                    showIcon
                                    icon={<BsCalendar2Date />}
                                    selected={year}
                                    onChange={(date) => setYear(date)}
                                    className="rounded-lg  flex items-center text-center"
                                    renderYearContent={renderYearContent}
                                    showYearPicker
                                    dateFormat="yyyy"
                                />
                                <Buttonprimary
                                    size={'sm'}
                                    className="whitespace-nowrap"
                                    onClick={filtroporaño}
                                >
                                    Filtrar por año
                                    <FaFilter className="ml-2" />
                                </Buttonprimary>

                            </div>

                            <div
                                id="filtro por mes "
                                className="flex items-center gap-x-3"
                            >
                                <Label>Filtrar por mes</Label>
                                <DatePicker
                                    showIcon
                                    selected={month}
                                    onChange={(date) => {
                                        setMonth(date), setYear(date);
                                    }}
                                    locale={es}
                                    icon={<BsCalendar2Date />}
                                    renderMonthContent={renderMonthContent}
                                    showMonthYearPicker
                                    className="rounded-lg flex items-center text-center"
                                    dateFormat="MM/yyyy"
                                />
                                <Buttonprimary
                                    onClick={filtroporMes}
                                    size={'sm'}

                                >
                                    Filtrar por mes
                                    <FaFilter className="ml-2" />
                                </Buttonprimary>
                            </div>
                            <div>
                                <Buttonprimary
                                onClick={() => {
                                    router.get(route('graficapastel'));
                                }}
                                >Informe de Retroalimentación <BsFillPieChartFill className="ml-2" /></Buttonprimary>
                            </div>
                            <div className="flex overflow-x-auto sm:justify-end justify-center ">
                                <Pagination
                                    currentPage={resenas.current_page}
                                    totalPages={resenas.last_page}
                                    onPageChange={onPageChange}
                                    showIcons
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <Table>
                                <Table.Head>
                                    <Table.HeadCell>ID#</Table.HeadCell>
                                    <Table.HeadCell>Ref</Table.HeadCell>
                                    <Table.HeadCell>
                                        Nombre Usuario
                                    </Table.HeadCell>
                                    {/* <Table.HeadCell></Table.HeadCell> */}
                                    <Table.HeadCell>Puntuación</Table.HeadCell>
                                    <Table.HeadCell>
                                        Comentario Final
                                    </Table.HeadCell>
                                    <Table.HeadCell>fecha</Table.HeadCell>
                                    <Table.HeadCell>Estado</Table.HeadCell>
                                    <Table.HeadCell> </Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {resenas.data.map((resena, index) => (
                                        <Table.Row
                                            key={index}
                                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                        >
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {resena.id_resena}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {resena.id_reserva}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {resena.usuarios_clientes ? (
                                                    <p className="whitespace-nowrap">
                                                        {
                                                            resena
                                                                .usuarios_clientes
                                                                .nombre_completo
                                                        }
                                                    </p>
                                                ) : (
                                                    "No definido"
                                                )}
                                            </Table.Cell>
                                            {/* <Table.Cell className="font-extrabold flex items-center gap-x-2">
                                              <FaStar size={"25px"} />
                                          </Table.Cell> */}
                                            <Table.Cell className="font-extrabold text-black">
                                                <Rating>
                                                    <Rating.Star />
                                                    <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                        {resena.Puntuacion_global ? (
                                                            resena.Puntuacion_global
                                                        ) : (
                                                            <span className="whitespace-nowrap">
                                                                no puntuacion
                                                            </span>
                                                        )}
                                                    </p>
                                                </Rating>
                                            </Table.Cell>
                                            <Table.Cell className="font-extrabold text-black whitespace-nowrap">
                                                <p>
                                                    {resena.comentario
                                                        ? resena.comentario.substring(
                                                              0,
                                                              70
                                                          ) +
                                                          (resena.comentario
                                                              .length > 70
                                                              ? "..."
                                                              : "")
                                                        : "no-comentario"}
                                                </p>
                                            </Table.Cell>
                                            <Table.Cell className="font-extrabold text-black">
                                                {resena.fecha}
                                            </Table.Cell>

                                            <Table.Cell className="font-extrabold text-black">
                                                {estados[resena.estado] &&
                                                estados[resena.estado][0] ? (
                                                    <Tooltip
                                                        content={
                                                            estados[
                                                                resena.estado
                                                            ][0].descripcion
                                                        }
                                                    >
                                                        <strong
                                                            className="whitespace-nowrap"
                                                            // title={
                                                            //     estados[resena.estado][0]
                                                            //         .descripcion
                                                            // }
                                                            cursor="pointer"
                                                        >
                                                            {
                                                                estados[
                                                                    resena
                                                                        .estado
                                                                ][0].estado
                                                            }
                                                        </strong>
                                                    </Tooltip>
                                                ) : (
                                                    "Estado no definido"
                                                )}
                                            </Table.Cell>

                                            <Table.Cell className="font-extrabold text-white ">
                                                <Tooltip content="Ver los Detalles de la evaluacion">
                                                    <Buttonprimary
                                                        gradientMonochrome="pink"
                                                        onClick={() => {
                                                            router.visit(
                                                                `/panela/resenas/${resena.id_usuario}/${resena.id_resena}`
                                                            );
                                                        }}
                                                    >
                                                        Gestionar
                                                    </Buttonprimary>
                                                </Tooltip>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                        <div>
                            <BarraEstaDistica
                                promediopormes={promedioAño}
                                year={year}
                                promeYear={promeYear}
                            />
                            <BarraEstaDisticaporDia
                                month={month}
                                year={year}
                                promedioMes={promedioMes}
                            />
                        </div>
                    </div>
                ) : (
                    <AccesoDenegado />
                )}
            </Menu_Item>
        </>
    );
};

export default Resenas;
