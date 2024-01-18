<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Resena;
use Inertia\Inertia;


class PanelController extends Controller
{
    //
    public function index(){

       // return view('panel');

    return  inertia('panel/MainLayout'); //Vista principal del panel
   }

   public function home(){
    return view('home');
   }

   public function panel(){
    return view('panel');
   }

    public function User(){ //Metodo muestra la lista de usuarios en el panel
      $User = User::all();
      return inertia::render('panel/MainLayout',['users' => $User]);
    }



    public function generarResena(Request $request){

        $user =User::where('id_usuario', $request->id_usuario)->first();


        $resenaData = [
        'id_reserva' => $request->id_reserva,
        'id_usuario' =>$user->id_usuario,
        'estado' => 0]; //Estado cero para no revisado.
        Resena::create($resenaData);

    //     $user =  User::where('id_usuario', $id)
    //    ->first();
     $id_resena = Resena::where('id_usuario', $request->id_usuario)
    ->max('id_resena');

    // dd($id_resena);


     // Redirigir a la ruta de UserController@showStars
     return redirect()->route('showStars', ['id_resena' =>  $id_resena]);

        }


        public function test1(Request $request){
         $test2 = $request;
         //dd($test2);

        $data = User::all();

         return  inertia('panel/Panel',['test2' =>  $test2]);

        }


}
