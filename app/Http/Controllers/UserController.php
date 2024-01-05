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




class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function showStars(){

       return Inertia::render('Preguntas/Stars');

      }

     public function index()
    {
        //Mostrar vista de review
        $user =User::all();

        //dd($data);



       return inertia('Products/Tes', ['user' =>  $user]);

    }//

    public function saveresena(int $id){

       $user =  User::where('id_usuario', $id)
       ->first();

       // dd($user);

       $resenaData =['id_usuario' =>$user->id_usuario,
        'comentario' => "sddfff", ];
         //dd($resenaData);
         // Resena::create($resenaData);

       //Aqui solo faltaria programae lo de generar el link

       return redirect()->route('review'); //
     }//

     public function StorePreguntas(Request $request){

      //dd($request);

        $data = $request->validate([
            "id_preguntas" => 'required',
            "pregunta" => "required",
            "id_posiblesRespuestas" => "required",
            "NombrePregunta" => "required",
        ]);

       PreguntasClientes::create($data);

       return redirect()->route('showStars'); //

     }

     public function showpreguntas(Request $request)
     { //Esta funcion en el futuro va a recebir la puntuacion de las estrellas(osea el request)

        // $preguntas=Preguntas::where('id_preguntas',1)->get();
        // dd($preguntas);

         //dd($request->only('puntuacion'));
         //dd($request);
         $limpieza = Prespuesta::where('id_preguntas', $request->pregunta)
         ->where('puntuacion', $request->score)
         ->with('pregunta') // Cargar la relación
         ->get();
        // dd($limpieza->toArray());

        return Inertia::render('Preguntas/Stars',
        ['limpieza' => $limpieza,
        'titulos' => $limpieza->pluck('pregunta.titulo'),]);


    }



    public function PreguntasClientes()
    {
       $data  = PreguntasClientes::all();
        dd($data);
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
