<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\PreguntasEvaluacionesClientes;
use App\Models\PosiblesRespuestasEvaluacionesClientes;
use App\Models\EvaluacionesClientes;
use App\Models\CalificacionesEva_clientes;
use App\Models\respuesta_ev_clientes;
use App\Models\ComentariosEvClientes;

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

    public function ClientesGestionar($idCliente,$IdEvaluacion){

        $evaluacion = EvaluacionesClientes::with(['UsuariosClientes','usuarios_empleado'])->
        where('id_cliente', $idCliente)->first();

        $preguntas = PreguntasEvaluacionesClientes::where('id_empresa', session('empresa'))->get();

        $respuestas = respuesta_ev_clientes::with('preguntasEvaluacionesClientes')->
        where('id_evaluacion', $IdEvaluacion)->get();

        $comentarios = ComentariosEvClientes::where('id_evaluacion', $IdEvaluacion)->get();
        // dd($comentarios->toArray());


        return Inertia::render('Evaluacionesclientes/GestionarEv_Clientes',
         ['evaluacion' => $evaluacion,
          'preguntas'=>$preguntas,
           'respuestas' => $respuestas,
           'comentarios' => $comentarios]);
    }

    public function Evaluacion_clientes_show($id)
    {
        $empresa = session('empresa');
         $preguntas = PreguntasEvaluacionesClientes::where('id_empresa', $empresa)->get();
         // posiblesRespuestasEvaluacionesClientes
         $userId = Auth::id();
         //TODO: hacer la condicion de si existe al menos una posible respuesta por cada pregunta

         $evaluacionData=[
            'id_empresa' => $empresa,
            'id_moderador'=> $userId,
            'id_cliente' => $id,
            'id_usuario' => $userId,
            'fecha' => date('Y-m-d'),
            ];
            /**
             * Verifica si existe alguna pregunta sin respuesta para un determinado empresa.
             *
             * @return bool True si existe alguna pregunta sin respuesta, False en caso contrario.
             */
            $existePreguntaSinRespuesta = PreguntasEvaluacionesClientes::where('id_empresa', $empresa)
                ->where(function ($query) {
                    foreach (range(1, 5) as $puntuacion) {
                        $query->orWhereDoesntHave('posiblesRespuestasEvaluacionesClientes', function ($query) use ($puntuacion) {
                            $query->where('puntuacion', $puntuacion);
                        });
                    }
                })
                ->exists();

            $existePreguntaConRespuesta = !$existePreguntaSinRespuesta;

        //dd($existePreguntaConRespuesta);
        /**
         *  en la condicional del if $preguntas->isNotEmpty() se valida que existan preguntas
         * y que exista al menos una posible respuesta por cada pregunta es decir
         * cuando $existePreguntaConRespuesta sea igual a true se crea la evaluacion
         * que seria la contra parte de generar resena
         */
        if ($preguntas->isNotEmpty() && $existePreguntaConRespuesta === true) {
            $evaluacion = EvaluacionesClientes::create($evaluacionData);
        }

        return Inertia::render('Evaluacionesclientes/StrellasClientes',
        [
            'preguntas' => $preguntas,
            'estadoPreguntas' => $existePreguntaConRespuesta,
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


        return Inertia::render('Evaluacionesclientes/StrellasClientes', ['posiblesRespuestas_' => $posiblesRespuestas]);


    }

        public function saveComentario(Request $request){
            // Validar los datos del request si es necesario
           // dd($request->toArray());
            // Crear un nuevo comentario
            ComentariosEvClientes::create([
                'comentario' => $request->comentario,
                'id_empleados' => $request->id_empleado,
                'Nombre_Admin' => $request->Nombre_Admin,
                'id_evaluacion' => $request->id_evaluacion,
                'id_preguntas' => $request->id_preguntas,
                    'fecha' => date('Y-m-d'), // Asume que la fecha es la fecha actual
            ]);
            return back();
            // Redirigir o devolver una respuesta si es necesario
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
            foreach ($historialRespuestas as $respuestas) {
                foreach ($respuestas as $respuesta) {
                    if ($respuesta !== null) {
                        $pregunta= $respuesta['preguntas_evaluaciones_clientes']['titulo'];
                        $id_PosibleRespuestas = $respuesta['id'];
                        $nombre_respuesta = $respuesta['titulo_respuesta'];
                        $id_preguntas=$respuesta['preguntas_evaluaciones_clientes']['id'];
                        $puntuacion = $respuesta['puntuacion'];

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
