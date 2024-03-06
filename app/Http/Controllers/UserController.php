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
use Illuminate\Support\Facades\Session; // Asegúrate de tener esta línea




class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function showStars(Request $request){

    //dd($request->toArray());

      $id_resena = $request->id_resena;

      $preguntas = Preguntas::Where('id_empresa', $request->empresa)->get();//Aqui se obtienen las preguntas
    //  $preguntas->prepend('');
     //dd($preguntas->toArray());
      $resena = Resena::where('id_resena',$id_resena)->first();
   // dd($resena);
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
    public function StorePreguntas(Request $request){ //TODO: Guardar las posibles respuestas por el cliente
        // Verifica si el array es multidimensional
       // dd($request->toArray());

        if (isset($request[0])) {
            // Maneja el caso multidimensional
           //dd("arreglo multi dimensional");

            $id_resena = $request[0]['id_Resenita'];
            $id_preguntas = $request[0]['id_preguntas'];
            $puntuacion = $request[0]['puntuacion'];

            $imprimir=Calificaciones::updateOrCreate([
                'id_resena' => $id_resena,
                'id_preguntas' => $id_preguntas,
                'puntuacion' => $puntuacion,
            ]);

            foreach ($request->toArray() as $data) {
                $id_posiblesRespuestas = $data['id_posiblesRespuestas'];
                $id_preguntas = $data['id_preguntas'];
                $nombre_pre_repu = $data['titulo_respuesta'];
                $puntuacion = $data['puntuacion'];
                $pregunta =  $data['pregunta']['titulo'];
                $id_reseni2=$id_resena;

                PreguntasClientes::firstOrCreate([
                    'id_posiblesRespuestas' => $id_posiblesRespuestas,
                    'id_preguntas' => $id_preguntas,
                    'NombreRespuesta' => $nombre_pre_repu,
                    'puntuacion' => $puntuacion,
                    'pregunta' => $pregunta,
                    'id_resena' => $id_reseni2,
                    'id_empresa' => Session::get('empresa')
                ]);
            }
        } else {
            // Maneja el caso unidimensional
           // dd('arreglo unidimensional');
            $id_resena = $request['id_Resenita'];
            $id_preguntas = $request['id_preguntas'];
            $puntuacion = $request['puntuacion'];

            $imprimir=Calificaciones::firstOrCreate([
                'id_resena' => $id_resena,
                'id_preguntas' => $id_preguntas,
                'puntuacion' => $puntuacion,
            ]);
            //En el arreglo unidimencional 
           $data= PreguntasClientes::firstOrCreate([
                'id_posiblesRespuestas' => null,
                'id_preguntas' => $id_preguntas,
                'NombreRespuesta' => null,
                'puntuacion' => $puntuacion,
                'pregunta' => null,
                'id_resena' => $id_resena,
                'id_empresa' => Session::get('empresa') //Esta viene en null siempre igual no se necesita
            ]);

           // dd($data->toArray());

        }

        return redirect()->route('showStars');
    }
     public function storecomments(Request $request) {

        //dd($request);

        $id_resena = $request['id']; // Reemplaza con el ID de la pregunta deseada

        $promedio = round(Calificaciones::where('id_resena', $id_resena)->avg('puntuacion'), 1); // Sacamos promedio
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


     public function showpreguntas(Request $request) //TODO: Mostrar las posible respuestas este metodo entra aqui cuando doy click en las estrella
     {
    //dd($request->toArray());

   // $id_empresa = Resena::where('id_resena', $request->idresena)->first()->id_empresa;
   // dd($id_empresa);
    //Session::put('empresa', $id_empresa);
    //dd($request->pregunta);
$respuesta = Prespuesta::where('id_preguntas', $request->pregunta)
    ->where('puntuacion', $request->score)
    ->with('pregunta') // Cargar la relación
    ->get();

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
