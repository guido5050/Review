<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\PreguntasEvaluacionesClientes;
use App\Models\PosiblesRespuestasEvaluacionesClientes;
use App\Models\EvaluacionesClientes;
use App\Models\CalificacionesEva_clientes;
use App\Models\respuesta_ev_clientes;
use Illuminate\Support\Facades\Auth;

class Evaluaciones_Clientes extends Controller
{
    public function Evaluacion_clientes()
    {
        $empresa = session('empresa');
        $evaluaciones = EvaluacionesClientes::with(['UsuariosClientes', 'usuarios_empleado'])
            ->where('id_empresa', $empresa)
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
            //dd($preguntas->toArray());

        if($preguntas->isNotEmpty()){
            $evaluacion = EvaluacionesClientes::create($evaluacionData);
            //TODO:Genera la evaluacion del cliente
        }



        return Inertia::render('Evaluacionesclientes/StrellasClientes',
        [
            'preguntas' => $preguntas,
            'idmoderador' => $userId,
            'idEvaluaciones' => isset($evaluacion->id) ? $evaluacion->id : 0
            ]);
    }

    public function showposiblesrespuestas(Request $request)
    {
        $posiblesRespuestas =PosiblesRespuestasEvaluacionesClientes::where('id_preguntas_evaluacion',$request->pregunta)
        ->where('puntuacion',$request->score)
        ->where('estado',1)
        ->with('preguntasEvaluacionesClientes')
        ->get();

        return Inertia::render('Evaluacionesclientes/StrellasClientes', ['posiblesRespuestas' => $posiblesRespuestas]);


    }


    public function saveposiblesrespuestas(Request $request)
    {
       //dd($request->toArray());
       /**
        * Metodo para guardar las respuestas de las estrellas
        *en vista de evaluaciones a clientes
        */

        $historialPuntajes = $request->get('historialPuntajes');
        $historialRespuestas = $request->get('historialRespuestas');
        $idEvaluacion = $request->get('idEvaluaciones_');
        $comentatio = $request->get('comentario');

        foreach ($historialPuntajes as $idPregunta => $puntuacion) {
            CalificacionesEva_clientes::create([
                'id_evaluacion' => $idEvaluacion,
                'id_pregunta_ev' => $idPregunta,
                'puntuacion' => $puntuacion,
            ]);
        }

        //Guardado de respuetas

        if ($historialRespuestas !== null) {
            foreach ($historialRespuestas as $respuesta) {
                if ($respuesta !== null) {
                    $pregunta= $respuesta['preguntas_evaluaciones_clientes']['titulo'];
                    $id_PosibleRespuestas = $respuesta['id'];
                    $nombre_respuesta = $respuesta['titulo_respuesta'];
                    $id_preguntas=$respuesta['preguntas_evaluaciones_clientes']['id'];
                    $puntuacion = $respuesta['puntuacion'];

                    //dd($id_preguntas);

                    respuesta_ev_clientes::create([
                        'id_evaluacion' => $idEvaluacion,
                        'pregunta' => $pregunta,
                        'id_posiblesRespuestas' => $id_PosibleRespuestas,
                        'nombre_respuesta' => $nombre_respuesta,
                        'id_preguntas' => $id_preguntas,
                        'puntuacion' => $puntuacion,
                    ]);
                }
            }
        }

      $promedio = CalificacionesEva_clientes::where('id_evaluacion', $idEvaluacion)
            ->avg('puntuacion') ?? 0;
        $promedio = $promedio ? round($promedio, 1) : 0; // Formateamos a un decimal

        $evaluacion = EvaluacionesClientes::find($idEvaluacion);
        $evaluacion->puntuacion_global = $promedio;
        $evaluacion->comentario = $comentatio;
        $evaluacion->save();

        return redirect()->route('evaluacion.clientes');
    }


}
