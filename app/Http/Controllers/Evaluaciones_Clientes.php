<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\PreguntasEvaluacionesClientes;
use App\Models\PosiblesRespuestasEvaluacionesClientes;
use App\Models\EvaluacionesClientes;
use App\Models\CalificacionesEva_clientes;
use Illuminate\Support\Facades\Auth;

class Evaluaciones_Clientes extends Controller
{
    public function Evaluacion_clientes()
    {
        $evaluaciones = EvaluacionesClientes::with(['UsuariosClientes', 'usuarios_empleado'])
            ->orderBy('id', 'desc')
            ->paginate(10);
          // dd($evaluaciones->toArray());

        return Inertia::render('Evaluacionesclientes/EvaluacionesClientes', ['evaluaciones' => $evaluaciones]);
    }
    public function Evaluacion_clientes_show($id)
    {
        $empresa = session('empresa');
         $preguntas = PreguntasEvaluacionesClientes::where('id_empresa', $empresa)->get();
         $userId = Auth::id();
        $evaluacionData=[
            'id_empresa' => $empresa,
            'id_moderador'=> $userId,
            'id_cliente' => $id,
            'id_usuario' => $userId,
            'fecha' => date('Y-m-d'),];
            //dd($evaluacionData);
        $evaluacion = EvaluacionesClientes::create($evaluacionData); //TODO:Genera la evaluacion del cliente


        return Inertia::render('Evaluacionesclientes/StrellasClientes',
        [
            'preguntas' => $preguntas,
                'idmoderador' => $userId,
             'idEvaluaciones' => $evaluacion->id
        ]);
    }

    public function showposiblesrespuestas(Request $request)
    {
        $posiblesRespuestas =PosiblesRespuestasEvaluacionesClientes::where('id_preguntas_evaluacion',$request->pregunta)
        ->where('puntuacion',$request->score)
        ->with('preguntasEvaluacionesClientes')
        ->get();

        return Inertia::render('Evaluacionesclientes/StrellasClientes', ['posiblesRespuestas' => $posiblesRespuestas]);


    }


    public function saveposiblesrespuestas(Request $request)
    {
       //  dd($request->toArray());

        $historialPuntajes = $request->get('historialPuntajes');
        $idEvaluacion = $request->get('idEvaluaciones_');
        $comentatio = $request->get('comentario');

        foreach ($historialPuntajes as $idPregunta => $puntuacion) {
            CalificacionesEva_clientes::create([
                'id_evaluacion' => $idEvaluacion,
                'id_pregunta_ev' => $idPregunta,
                'puntuacion' => $puntuacion,
            ]);
        }

        $promedio = CalificacionesEva_clientes::where('id_evaluacion', $idEvaluacion)
            ->avg('puntuacion') ?? 0;
        $promedio = $promedio ? round($promedio, 1) : 0; // Formateamos a un decimal

        $evaluacion = EvaluacionesClientes::find($idEvaluacion);
        $evaluacion->puntuacion_global = $promedio;
        $evaluacion->comentario = $comentatio;
        $evaluacion->save();

        return Inertia::render('components/Final');
    }


}
