<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Review;
use App\Models\Resena;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Prespuesta;
use App\Models\Preguntas;
use App\Models\PreguntasClientes;
use App\Models\Calificaciones;



class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function showStars(Request $request){


      $id_resena = $request->id_resena;

      $preguntas = Preguntas::all()->pluck('titulo');
      $preguntas->prepend('');



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

     public function StorePreguntas(Request $request){



        $id_resena = $request[0]['id_Resenita'];


        $id_preguntas = $request[0]['id_preguntas'];
       $puntuacion = $request[0]['puntuacion'];

     //  dd($id_preguntas);

     $imprimir=Calificaciones::create([
           'id_resena' => $id_resena,
           'id_preguntas' => $id_preguntas,
           'puntuacion' => $puntuacion,
        ]);


///dd($imprimir);

        // dd($request[0]['id_preguntas'],$request[0]['puntuacion'],$id_resena);
      // dd($request->toArray());
         foreach ($request->toArray() as $data) {


                $id_posiblesRespuestas = $data['id_posiblesRespuestas'];
                 $id_preguntas = $data['id_preguntas'];
                 $nombre_pre_repu = $data['titulo_respuesta'];
                 $puntuacion = $data['puntuacion'];
                 $pregunta =  $data['pregunta']['titulo'];
                 $id_reseni2=$id_resena;
                //dd($guardar, $pregunta,$id_posiblesRespuestas,$nombre_pre_repu,$puntuacion);
                 PreguntasClientes::create([
                    'id_posiblesRespuestas' => $id_posiblesRespuestas,'id_preguntas' => $id_preguntas,
                    'NombreRespuesta' => $nombre_pre_repu,
                    'puntuacion' => $puntuacion,
                    'pregunta' => $pregunta, 'id_resena' => $id_reseni2]);
    }
      // PreguntasClientes::create($request);

       return redirect()->route('showStars'); //

     }

     public function storecomments(Request $request) {

        //dd($request);

        $id_resena = $request['id']; // Reemplaza con el ID de la pregunta deseada

        $promedio = Calificaciones::where('id_resena', $id_resena)->avg('puntuacion'); //Sacmos promedio

        //dd($promedio);
        $resenas = Resena::where('id_resena',$id_resena)->first();

        $resenas->comentario=$request['comentario'];

        $resenas->Puntuacion_global= $promedio;

        //dd($resenas);

        $resenas->save();

        /* $data =['comentario'=>$request->comentario,
          'Puntuacion_global' =>$promedio];
         //dd($resenaData); */
       //Resena::update($data);

       return inertia('components/Final');
    }


     public function showpreguntas(Request $request)
     {
      //  dd($request->toArray());

       //dd($request->toArray());

       $respuesta=Prespuesta::where('id_preguntas', $request->pregunta)
      ->where('puntuacion', $request->score)
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
    public function create()
    {
        //
    }

    //mostrando datos de resena
    public function showresena(){ //Metodo de prueba para debuguear cualquier cosa..
       //$data = Resena::all();

       //$data =Resena::with('User')->get();
       //dd($data);



       return redirect()->route('resena');

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
