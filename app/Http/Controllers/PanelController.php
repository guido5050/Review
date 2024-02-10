<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Resena;
use App\Models\usuarios_empleado;
use App\Models\UsuariosClientes;
use App\Models\Empresas;
use App\Models\Roles;
use Inertia\Inertia;
use App\Mail\OrisonContactMailable;
use Illuminate\Support\Facades\Mail;


class PanelController extends Controller
{
    //

    // public function roles(){
    //     $roles =Roles::with('usuarios_empleado')->get();
    //     return response()->json($roles);
    // }

//     public function index(){
//         $id_empresa = session('empresa');
//         $resenas = Resena::where('id_empresa', $id_empresa)->paginate(10);
//         return inertia::render('panel/Resenas',['resenas' => $resenas]);//Vista principal del panelA
//    }


public function clientes(){
    $empresa = session('empresa');
    //dd($empresa);
    $clientes = UsuariosClientes::where('id_empresa', $empresa)->orderBy('id_cliente', 'desc')->paginate(10);
    return inertia::render('panel/Clientes',['client' => $clientes ]);
}



public function usuarios(){

    $cargo =Roles::all();
    ///dd($cargo->toArray());
    $currentCargo = Auth::user()->cargo;
    if($currentCargo < 3){
        return inertia::render('panel/Resenas');
        //return redirect()->route('resenas') alternativa
    }else{
        $users = usuarios_empleado::all();
        return inertia::render('panel/Usuarios',
            [
            'users' => $users,
            'cargo' => $cargo,
            ]);
    }


    // $users = usuarios_empleado::all();

    // return Inertia::render('panel/Usuarios', [
    //     'users' => $users
    // ]);
}

public function update(Request $request){
    //Metodo para actualizar usuarios
    dd($request->toArray());
    $data = $request->all();

    foreach ($data as $empleadoData) {
        // Comprueba si las claves existen antes de acceder a ellas
        if (!isset($empleadoData['id_empleados'], $empleadoData['nombre_completo'], $empleadoData['email'])) {
            continue;
        }

        $idEmpleado = $empleadoData['id_empleados'];
        $nombreCompleto = $empleadoData['nombre_completo'];
        $email = $empleadoData['email'];
        $telefono = $empleadoData['num_telefono'];
        $activo = $empleadoData['activo'];

        // Encuentra el modelo del empleado por su ID
        $empleadoModel = usuarios_empleado::find($idEmpleado);

        // Si el empleado existe, actualiza los datos
        if ($empleadoModel) {
            $empleadoModel->update([
                'nombre_completo' => $nombreCompleto,
                'email' => $email,
                'num_telefono' => $telefono,
                'activo' => $activo,

            ]);
        }
    }

    // Redirige o devuelve una respuesta según sea necesario
}



   public function delete($id_usuario){

   // dd($id_usuario);
    $id_usuario = (int)$id_usuario;
    //dd($id);
    $user = usuarios_empleado::find($id_usuario);
    //dd($user);
    $user->delete();

    return redirect()->back();
   }



   public function home(){
    return view('home');
   }

   public function panel(){
    return view('panel');
   }

    /**
     * Retrieve and display the reviews for the current company.
     *
     * @return \Inertia\Response
     */
    public function resenas(){
        $id_empresa = session('empresa'); // Current company
        $resenas = Resena::where('id_empresa', $id_empresa)->paginate(10);
        return inertia::render('panel/Resenas',['resenas' => $resenas]);
    }



    public function generarResena(Request $request)
    {
        $nombreDominio = $request->getHost();
        //dd($nombreCompleto);
        // Obtener el usuario
        $user = UsuariosClientes::where('id_cliente', $request->id_usuario)->first();

        $id_empresa = intval(session('empresa'));
        //dd($id_empresa);
        // Crear la reseña
        $resenaData = [
            'id_empresa' => $id_empresa,
            'id_reserva' => $request->id_reserva,
            'id_usuario' => $user->id_cliente,
            'estado' => 0
            // Estado cero para no revisado.
        ];
        Resena::create($resenaData);

        // Obtener el ID de la reseña más reciente del usuario
        $id_resena = Resena::where('id_usuario', $request->id_usuario)->max('id_resena');

        // Redirigir a la ruta de UserController@showStars
        return redirect()->route('showStars', ['id_resena' => $id_resena]);
    }


    /**
     * TODO:Configuracion del Correo
     * importante para que este metodo funcione
     * use App\Mail\OrisonContactMailable;
     * use Illuminate\Support\Facades\Mail;
     */
    public function mail($clienteId){
        $cliente = UsuariosClientes::where('id_cliente', $clienteId)->first();
        //dd($cliente->nombre_completo);
        $url = "http://testreview.test/generarResena?id_reserva=122&id_usuario={$clienteId}";

       Mail::to('fel123rodriguez@gmail.com')
       ->send(new OrisonContactMailable($cliente->nombre_completo, $url));
       //return 'Mensaje enviado';
    }


        public function test1(Request $request){

            dd($request);
            $test2 = $request;
         //dd($test2);

        $data = User::all();

         return  inertia('panel/Panel',['test2' =>  $test2]);

        }


}
