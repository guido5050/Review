import Graficapastel from "./components/Graficapastel";
import { useState, useEffect, useMemo, useCallback } from "react";
import { TbMessageReport } from "react-icons/tb";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { PiChartPieLight } from "react-icons/pi";
import { router } from "@inertiajs/react";
import Buttonprimary from "../components/Buttonprimary";
import { es } from "date-fns/locale";
import { FcDoughnutChart } from "react-icons/fc";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FcCalendar } from "react-icons/fc";

export default function GraficaPastelIndex({
    datosDiagramas,
    fecha,
    razon_social,
}) {
    const [dataf, setDataf] = useState(datosDiagramas);
    const [startDate, setStartDate] = useState(new Date());

    const filtropiechart = (fecha) => {
        router.get(
            route("graficapastel", { fecha: fecha }),
            {},
            { preserveState: true }
        );
    };

    const getRandomColor=()=>{
        const formato = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += formato[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return (
        <>
            <div className=" px-16">
                <div
                    id="titulo"
                    className="flex justify-between mt-3   items-center "
                >
                    <Buttonprimary
                    onClick={()=>{
                        router.get(route('resenas'));
                    }}
                    >Volver</Buttonprimary>
                    <h1 className=" mt-2 font-extrabold text-[20px] flex items-center justify-center">
                        {`Evaluación de Clientes y Análisis de Razones ${razon_social} `}
                        <FcDoughnutChart size={'45px'}  />
                    </h1>
                    <p className="font-extralight flex items-center">
                        {new Date(`${fecha}-01T00:00:00`).toLocaleDateString(
                            "es-ES",
                            {
                                year: "numeric",
                                month: "long",
                            }
                        )}
                        <FcCalendar size={'25px'} className="ml-2" />

                    </p>
                </div>
                <div className="my-3 flex items-center">
             <DatePicker
            className="rounded-lg p-2 border border-gray-300"
            selected={startDate}
            locale={es}
            onChange={(date) => {
                setStartDate(date);
            }}
            dateFormat="MM/yyyy"
            showMonthYearPicker
        />
                    <Buttonprimary
                        onClick={() => {
                            filtropiechart(startDate);
                        }}
                    >
                        Buscar
                    </Buttonprimary>
                </div>
                <div className=" grid grid-cols-2 overflow-x-hidden gap-3 ">
                    {datosDiagramas.map((item) => (
                        <div className=" border  p-4  rounded-lg shadow-lg">
                            <h1 className="flex items-center font-extrabold text-[20px]">
                                {item.pregunta} <TbMessageReport />
                            </h1>
                            <Graficapastel
                                getRandomColor={getRandomColor}
                                key={datosDiagramas.pregunta}
                                data={item.datos}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
