<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Resena;
use Carbon\Carbon;
use DB;

class GraficasController extends Controller
{
    //
    public function GraficaporMes(){
    //Obtén el año actual
     $year = Carbon::now()->year;
     //Obtén el promedio mensual de Puntuacion_global
    $promedioporMes = Resena::select(
        DB::raw('DATE_FORMAT(fecha, "%M") as Mes'),
        DB::raw('ROUND(AVG(Puntuacion_global), 1) as promedio')
     )
     ->whereYear('fecha', $year)
     ->groupBy(DB::raw('DATE_FORMAT(fecha, "%M")'))
     ->get();

       // mes actual
        $month = Carbon::now()->month;
       // dd($year, $month);
        //Obtén el promedio diario de Puntuacion_global
        $promedioporDia = Resena::select(
            DB::raw('DATE(fecha) as Dia'),
            DB::raw('ROUND(AVG(Puntuacion_global), 1) as promedio')
        )
        ->whereYear('fecha', $year)
        ->whereMonth('fecha', $month)
        ->groupBy(DB::raw('DATE(fecha)'))
        ->get();

        //dd($promedioporDia->toArray());
       return inertia::render('panel/EstadisticaDeGraficas', [
        'promediopormes' => $promedioporMes,
        'promediopordia' => $promedioporDia
    ]);

    }

    public function GraficaporDia(){
        //Obtén el año y el mes actual
        $year = Carbon::now()->year;
        $month = Carbon::now()->month;

        //Obtén el promedio diario de Puntuacion_global
        $promedioporDia = Resena::select(
            DB::raw('DATE(fecha) as Dia'),
            DB::raw('ROUND(AVG(Puntuacion_global), 1) as promedi')
        )
        ->whereYear('fecha', $year)
        ->whereMonth('fecha', $month)
        ->groupBy(DB::raw('DATE(fecha)'))
        ->get();
        dd($promedioporDia);
        return inertia::render('panel/EstadisticaDeGraficas', [
            'promediopordia' => $promedioporDia
        ]);
    }

}
