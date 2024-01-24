<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Resena;
use Inertia\Inertia;
use App\Models\usuarios_empleado;

class PanelController extends Controller
{
    //



    public function index(){
        $Auth_User = Auth::user();
        //dd($Auth_User->toArray());

        $User = usuarios_empleado::all();

      return inertia::render('panel/MainLayout',
      ['users' => $User,
       'userAuth' =>$Auth_User]);//Vista principal del panelA
   }

   public function update(Request $request){
    //Metodo para actualizar usuarios
    //dd($request->toArray());
    $data = $request->toArray();


    foreach ($data as $empleado) {
        // Accede a cada propiedad del empleado
        $idEmpleado = $empleado['id_empleados'];
        $nombreCompleto = $empleado['nombre_completo'];
        $email = $empleado['email'];
         //pregunta si existe
        // Encuentra el modelo del empleado por su ID

        $empleadoModel = usuarios_empleado::find($idEmpleado);

        if ($empleadoModel) {
            $empleadoModel->update([
                'nombre_completo' => $nombreCompleto,
                'email' => $email,
                // Agrega más campos según sea necesario
            ]);
        }
    }

    return redirect()->route('index');

   }

   public function delete($id_usuario){

   // dd($id_usuario);
    $id_usuario = (int)$id_usuario;
    //dd($id);
    $user = usuarios_empleado::find($id_usuario);
    //dd($user);
    $user->delete();

    return redirect()->route('index');
   }



   public function home(){
    return view('home');
   }

   public function panel(){
    return view('panel');
   }

    public function User(){ //Metodo muestra la lista de usuarios en el panel
    // dd('goku');
      $User = User::all();
      return inertia::render('panel/Resenas',['user' => $User]);
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

            dd($request);
            $test2 = $request;
         //dd($test2);

        $data = User::all();

         return  inertia('panel/Panel',['test2' =>  $test2]);

        }


}
