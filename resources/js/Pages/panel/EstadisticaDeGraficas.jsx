import React from "react";
import BarraEstaDistica from "./components/BarraEstaDisticaporMes";
import { IoCalendarNumberSharp } from "react-icons/io5";
import BarraEstaDisticaporDia from "./components/BarraEstaDisticaporDia";
const EstadisticaDeGraficas = ({ promediopormes, promediopordia }) => {
    return (
        <div className="text-center m-auto mt-3">
            <div>
                <BarraEstaDistica promediopormes={promediopormes} />
                
            </div>

            <div>
                <BarraEstaDisticaporDia promediopordia={promediopordia} />
            </div>
        </div>
    );
};

export default EstadisticaDeGraficas;
