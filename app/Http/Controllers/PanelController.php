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
use App\Models\parametro;
use App\Models\Roles;
use Inertia\Inertia;
use App\Mail\OrisonContactMailable;
use Illuminate\Support\Facades\Mail;
use App\Models\Correo;


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



public function usuarios(){ //TODO: Vista principal del panelA/Usuarios

    $cargo =Roles::all();
    ///dd($cargo->toArray());
    $currentCargo = Auth::user()->cargo; //Numero de cargo
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

public function update(Request $request){  //TODO: update usuarios
    //Metodo para actualizar usuarios
    //dd($request->toArray());
    $data = $request->all();

    foreach ($data as $empleadoData) {
        $idEmpleado = $empleadoData['id_empleados'];
        $nombreCompleto = $empleadoData['nombre_completo'];
        $email = $empleadoData['email'];
        $telefono = $empleadoData['num_telefono'];
        $activo = $empleadoData['activo'];
        $cargo = $empleadoData['cargo'];
        $identificacion = $empleadoData['num_identificacion'];
        // Encuentra el modelo del empleado por su ID
        $empleadoModel = usuarios_empleado::find($idEmpleado);

        // Si el empleado existe, actualiza los datos
        if ($empleadoModel) {
            $empleadoModel->update([
                'nombre_completo' => $nombreCompleto,
                'email' => $email,
                'num_telefono' => $telefono,
                'activo' => $activo,
                'cargo' => $cargo,
                'num_identificacion' => $identificacion,

            ]);
        }
    }

    return redirect()->route('usuarios');
    // Redirige o devuelve una respuesta según sea necesario
}

public function create_roles(Request $request)
{
    // Validar los datos del formulario
    $validatedData = $request->validate([
        'nombre' => 'required|string',
        'descripcion' => 'required|string',
        // Agregar más validaciones según tus necesidades
    ]);

    // Crear un nuevo registro con el modelo Parametro
    $parametro = Roles::create([
        'nombre' => $request->nombre,
        'descripcion' => $request->descripcion,
        // Asignar más valores según tus necesidades
    ]);

    // Redirigir o devolver una respuesta según sea necesario
    return back();
}

public function update_roles(Request $request)
{
   //dd($request->toArray());
    // Validar los datos del formulario
    $data = $request->all();


    foreach ($data as $rolesData) {
        $idRoles = $rolesData['id'];
        $nombre = $rolesData['nombre'];
        $descripcion = $rolesData['descripcion'];
    // Encuentra el modelo del empleado por su ID
        $rolesModel = Roles::find($idRoles);

        // Si el empleado existe, actualiza los datos
        if ($rolesModel) {
            $rolesModel->update([
                'nombre' => $nombre,
                'descripcion' => $descripcion,
            ]);
        }
    }
  // Redirigir o devolver una respuesta según sea necesario
    return back();
}


public function create(Request $request)//TODO:
{
    // Validar los datos del formulario
    $validatedData = $request->validate([
        'nombre' => 'required|string',
        'email' => 'required|email',
        'telefono' => 'required|string',
        // Agregar más validaciones según tus necesidades
    ]);

    // Crear un nuevo registro con el modelo Parámetro
    $parametro = new Parametro;
    $parametro->nombre = $request->nombre;
    $parametro->email = $request->email;
    $parametro->telefono = $request->telefono;
    // Asignar más valores según tus necesidades

    // Guardar el nuevo registro en la base de datos
    $parametro->save();

    // Redirigir o devolver una respuesta según sea necesario
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
        try {
            $cliente = UsuariosClientes::where('id_cliente', $clienteId)->select('nombre_completo','email')->first();

            $correo_current = Correo::where('id_empresa', session('empresa'))->select('titulo', 'cuerpo')->first();

            $url = "generarResena?id_reserva=122&id_usuario={$clienteId}";
            $logo = session('logo_ruta');
            $titulo = $correo_current->titulo;
            $cuerpo = $correo_current->cuerpo;

            Mail::to('fel123rodriguez@gmail.com')
                ->send(new OrisonContactMailable($cliente->nombre_completo, $url,$titulo,$cuerpo,$logo));

            //return 'Mensaje enviado';
        } catch (\Exception $e) {
            // Aquí puedes manejar la excepción, por ejemplo, registrándola en los logs
            \Log::error('Error al enviar correo: ' . $e->getMessage());
        }
    }

    public function previewEmail_jsx($clienteId)
    {
        //dd($clienteId);

        $cliente = UsuariosClientes::where('id_cliente', $clienteId)->select('nombre_completo','email')->first();

        $correo_current = Correo::where('id_empresa', session('empresa'))->select('titulo', 'cuerpo')->first();

        //dd($cliente, $correo_current);

        $titulo = $correo_current->titulo;
        $cuerpo = $correo_current->cuerpo;
        $logo = session('logo_ruta');
        $nombre = $cliente->nombre_completo;
        $url = '#';
        $data = [
            'titulo' => $titulo,
            'cuerpo' => $cuerpo,
            'logo' => $logo,
            'nombre' => $nombre,
            "url" => $url,
        ];

        $html = view('Mail.Plantilla_orison', $data)->render();

        return inertia::render('panel/Preview_Mail', ['html' => $html]);
    }


    // public function previewEmail_jsx()
    // {
    //     return inertia::render('panel/Preview_Mail');
    // }

    public function mail_get()
   {
        $correo = Correo::all();
        return response()->json($correo);
    }


        public function test1(Request $request){

            dd($request);
            $test2 = $request;
         //dd($test2);

        $data = User::all();

         return  inertia('panel/Panel',['test2' =>  $test2]);

        }


}
