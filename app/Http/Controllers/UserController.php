<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Review;
use App\Models\Resena;
use Inertia\Inertia;
use App\Models\Prespuesta;
use App\Models\Preguntas;
use App\Models\PreguntasClientes;
use App\Models\Calificaciones;
use Illuminate\Support\Facades\Session;
// Asegúrate de tener esta línea




class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function showStars(Request $request){

  //dd($request->toArray());

      $id_resena = $request->id_resena;

      $preguntas = Preguntas::Where('id_empresa', $request->empresa)->get();//Aqui se obtienen las preguntas
    // $preguntas->prepend('');
     //dd($preguntas->toArray());
      $resena = Resena::where('id_resena',$id_resena)->first();
      //dd($resena);
     return Inertia::render('Preguntas/Stars',['preguntas' => $preguntas,'idresena' => $id_resena]);

      }


     public function index()
    {
        //Mostrar vista de review
        $user =User::all();

        //dd($data);



       return inertia('Products/Tes', ['user' =>  $user]);

    }//

    // public function saveresena(int $id){

    //    $user =  User::where('id_usuario', $id)
    //    ->first();

    //    // dd($user);

    //    $resenaData =['id_usuario' =>$user->id_usuario,
    //     'comentario' => "sddfff", ];
    //      //dd($resenaData);
    //      // Resena::create($resenaData);

    //    //Aqui solo faltaria programae lo de generar el link

    //    return redirect()->route('review'); //
    //  }//
    public function StorePreguntas(Request $request){ //TODO: Guardar los datos de la Resena en evaluaciones a la empresa
        // Verifica si el array es multidimensional
         // dd($request->toArray());
         $historialPuntajes = $request->get('historialPuntajes');
         $historialRespuestas = $request->get('historialRespuestas');
         $idResena = $request->get('idResena');
         $comentatio = $request->get('comentario');

//        dd($historialPuntajes, $historialRespuestas, $idResena, $comentatio);


        foreach ($historialPuntajes as $idPregunta => $puntuacion) {
            Calificaciones::create([
                'id_resena' => $idResena,
                'id_preguntas' => $idPregunta,
                'puntuacion' => $puntuacion,
                'id_empresa' => session()->get('empresa'),
            ]);
        }

        if ($historialRespuestas !== null) {
            foreach ($historialRespuestas as $respuestas) {
                foreach ($respuestas as $respuesta) {
                    if ($respuesta !== null) {
                        $pregunta= $respuesta['pregunta']['titulo'];
                        $id_PosibleRespuestas = $respuesta['id_posiblesRespuestas'];
                        $nombre_respuesta = $respuesta['titulo_respuesta'];
                        $id_preguntas=$respuesta['pregunta']['id_preguntas'];
                        $puntuacion = $respuesta['puntuacion'];

                        PreguntasClientes::create([
                            'id_resena' => $idResena,
                            'id_preguntas' => $id_preguntas,
                            'pregunta' => $pregunta,
                            'id_posiblesRespuestas' => $id_PosibleRespuestas,
                            'NombreRespuesta' => $nombre_respuesta,
                            'puntuacion' => $puntuacion,
                            // Asegúrate de agregar aquí cualquier otro campo que necesites llenar
                        ]);
                    }
                }
            }
        }

        $promedio = Calificaciones::where('id_resena', $idResena)
            ->avg('puntuacion') ?? 0;
        $promedio = $promedio ? round($promedio, 1) : 0; // Formateamos a un decimal

        $resena = Resena::find($idResena);
        $resena->Puntuacion_global = $promedio;
        $resena->estado = 1; //Estado 1 que ha completado la encuesta
        $resena->comentario = $comentatio;
        $resena->fecha = date('Y-m-d'); // Guardar la fecha actual en formato año-mes-día
        $resena->save();


        return inertia('components/Final');
    }
     public function storecomments(Request $request) {

        //dd($request);

        $id_resena = $request['id']; // Reemplaza con el ID de la pregunta deseada

        $promedio = round(Calificaciones::where('id_resena', $id_resena)->avg('puntuacion'), 1); // Sacamos promedio
        //dd($promedio);
        $resenas = Resena::where('id_resena', $id_resena)->first();

        if ($promedio && is_null($request['comentario'])) {
            $resenas->comentario = "sin comentario";
        } else {
            $resenas->comentario = $request['comentario'];
        }

        $resenas->Puntuacion_global = $promedio;
        $resenas->fecha = date('Y-m-d'); // Guardar la fecha actual en formato año-mes-día

        $resenas->save();

        /* $data =['comentario'=>$request->comentario,
          'Puntuacion_global' =>$promedio];
         //dd($resenaData); */
       //Resena::update($data);

       $estado =Resena::find($id_resena);

       $estado->estado = 3; //Estado 3 que ha completado la encuesta
       $estado->save();

       return inertia('components/Final');
    }


     public function showpreguntas(Request $request) //TODO: Mostrar las posible respuestas este metodo entra aqui cuando doy click en las estrella
     {
        //dd($request->toArray());
        $respuesta = Prespuesta::where('id_preguntas', $request->pregunta)
            ->where('puntuacion', $request->score)
            ->where('estado', true)
            ->with('pregunta') // Cargar la relación
            ->get();
    // dd($respuesta->toArray());
 // dd($respuesta->toArray());

$wx2 = 0;
foreach ($respuesta as $WX) {
    $id_posiblesRespuestas = $WX->id_posiblesRespuestas;
    $nuevoElemento = [
        "id_posiblesRespuestas" => $WX->id_posiblesRespuestas,
        "id_preguntas" => $WX->id_preguntas,
        "titulo_respuesta" => $WX->titulo_respuesta,
        "puntuacion" => $WX->puntuacion,
        "pregunta" => [
            "id_preguntas" => $WX->pregunta['id_preguntas'],
            "titulo" => $WX->pregunta['titulo'],
            "puntuacion_maxima" => $WX->pregunta['titulo'],
        ], // Tu contenido real aquí
        "id_Resenita" => $id_resena = $request->idresena,
    ];
    $limpieza[$wx2] = $nuevoElemento;
   // dd($id_empresa);

       $respuesta=Prespuesta::where('id_preguntas', $request->pregunta)
      ->where('puntuacion', $request->score)
      ->where('estado', true)
      ->with('pregunta') // Cargar la relación
      ->get();

$wx2=0;
foreach ($respuesta as $WX) {

    $id_posiblesRespuestas = $WX->id_posiblesRespuestas;
    $nuevoElemento = [
        "id_posiblesRespuestas" => $WX->id_posiblesRespuestas,
        "id_preguntas" => $WX->id_preguntas,
        "titulo_respuesta" => $WX->titulo_respuesta,
        "puntuacion" => $WX->puntuacion,
        "pregunta" => [
            "id_preguntas" => $WX->pregunta['id_preguntas'],
            "titulo" => $WX->pregunta['titulo'],
            "puntuacion_maxima" => $WX->pregunta['titulo'],
        ], // Tu contenido real aquí
        "id_Resenita" =>  $id_resena = $request->idresena,
    ];
    $limpieza[$wx2] = $nuevoElemento;
    $wx2=$wx2+1;

}
// Añadir el nuevo elemento al final del arreglo


       /* $limpieza = Prespuesta::where('id_preguntas', $request->pregunta)
         ->where('puntuacion', $request->score)
         ->with('pregunta') // Cargar la relación
         ->get();*/

         $pregunta = $request->pregunta; //1
         $score = $request->score;//5
          //dd($pregunta, $score, $limpieza->toArray());



      // $id_resena = $request->idresena;


        return Inertia::render('Preguntas/Stars',
        ['limpieza' => $limpieza,
        'id_pregunta'=>$pregunta,
        'score' => $score,
        'titulos' =>  $respuesta->pluck('pregunta.titulo'),
    ]);


    }

     /**
     * Show the form for creating a new resource.
     */


        return redirect()->route('showStars');  //TODO aqui

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //Validate

        //dd($request->only('nombre','email'));

        $data = $request->validate([
        'nombre' => 'required',
         'email' => 'required',
       ]);
        //Insert Method...
       $user= User::Create($data);



        return redirect()->route('resena');
    }


    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
