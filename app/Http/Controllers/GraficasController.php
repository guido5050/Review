<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Resena;
use Carbon\Carbon;
use DB;
use App\Models\Preguntas;

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

    public function graficapastel_index(Request $request){


        //dd($request->get('fecha'));

        $empresaId = session('empresa'); // ID de la empresa "Orison"



        $fecha = Carbon::parse($request->get('fecha'))->format('Y-m'); // Mes y año para filtrar



        // Obtener todas las preguntas disponibles para la empresa y el mes especificado
        $preguntas = Preguntas::where('id_empresa', $empresaId)
            ->pluck('id_preguntas');
      //  dd($preguntas);
        // Inicializar un arreglo para almacenar los datos de cada pregunta
        $datosDiagramas = [];

        // Iterar sobre cada pregunta para obtener los datos del diagrama de pastel
        foreach ($preguntas as $preguntaId) {

            $datos = DB::table('preguntas_clientes')
                ->select(
                    'preguntas.titulo AS pregunta',
                    'preguntas_clientes.NombreRespuesta AS NombreRespuesta',
                    DB::raw('COUNT(*) AS cantidad')
                )
                ->join('resenas', 'preguntas_clientes.id_resena', '=', 'resenas.id_resena')
                ->join('preguntas', 'preguntas_clientes.id_preguntas', '=', 'preguntas.id_preguntas')
                ->where('preguntas_clientes.id_preguntas', $preguntaId)
                ->where('resenas.id_empresa', $empresaId)
                ->where(DB::raw("DATE_FORMAT(resenas.fecha, '%Y-%m')"), $fecha)
                ->groupBy('preguntas.titulo', 'preguntas_clientes.NombreRespuesta')
                ->get();

              //  dd($datos->toArray());
                if($datos->isNotEmpty()){
                    $datosDiagramas[] = [
                        'pregunta' => $datos->first()->pregunta,
                        'datos' => $datos->map(function ($dato) {
                            return [
                                'name' => $dato->NombreRespuesta,
                                'value' => $dato->cantidad,
                            ];
                        }),
                    ];
                }


        }
       //dd($datosDiagramas);
       //dd("Aqui termina");

        return inertia::render('panel/GraficaPastelIndex', [
            'fecha' => $fecha,
            'datosDiagramas' => $datosDiagramas
        ]);
    }
}
