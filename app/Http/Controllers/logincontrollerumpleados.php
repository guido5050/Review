<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use DB;
use Auth;
use Illuminate\Validation\Rule;
use App\Models\Empresas;
use App\Events\NewMessageNotification;
use App\Clases\auto_close_turn;
use App\Models\usuarios_empleado;
use App\Models\parametro;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;
use App\Models\Acceso;
use App\Models\Roles;




class logincontrollerumpleados extends Controller
{

        /**
         * TODO: Metodo que muestra la vista de login
         */
        public function show() {

            //dd('entro');
            if ( auth::guard('empleados')->guest() ) {

                $empresas = parametro::all(); // Obtén todas las empresas


                return view('auth.login', ['empresas' => $empresas]); // Pasa las empresas a la vista
            }
            else if ( auth()->guard('empleados')->user()->cambiar_contraseña == 1 ) {
                return redirect()->route('cambiar_contrasena');
            }
            else {
                return redirect()->route('resenas');
            }
        }

     public function show_register() {
        if ( auth::guard('empleados')->guest() ) {
           return redirect()->route('login');
        }
        else {
            $cargo = auth()->guard('empleados')->user()->cargo;
            if ($cargo <= 2) {
                return redirect()->route('login');
            }
            else if ($cargo > 2) {
                $roles = \App\role::all();
                return view('auth.register')->with('cargos',$roles);
            }
        }
    }

    public function register(request $data) { //TODO: Metodo que registra un nuevo usuario(EMPLEADO)
        //

      // dd($data->toArray());
        $empresa=Session::get('empresa');
        $empresas = $data->get('empresas');
         //dd($empresas);
    $dataEmpleado =[
        'nombre_completo' =>  $nombre_completo = $data['empleado']['nombre_completo'],
        'email' =>   $email = $data['empleado']['email'],
        'usuario'=>    $usuario = $data['empleado']['usuario'],
        'contrasena' =>  bcrypt($data['empleado']['password']),
        'num_identificacion'=>   $num_identificacion = $data['empleado']['num_identificacion'],
        'num_telefono'=>  $num_telefono = $data['empleado']['num_telefono'],
        'cargo'=>  $cargo = $data['empleado']['cargo'],
        'activo' =>   $activo = $data['activo'] === 'si' ? 1 : 0,
    ];

        //  $cargo = Roles::find($dataEmpleado['cargo']);
        //  $vistas = $cargo->accesos;
        //  dd($vistas->toArray());

         //dd($dataEmpleado);
         $usuario = usuarios_empleado::create($dataEmpleado);
        /**
         * -Sacar el id del usuario ya creado
         * -Saca la consulta de las vistas que estan disponibles para el usuario por el cargo
         */
        $cargo = Roles::find($dataEmpleado['cargo']);
        $vistas = $cargo->accesos;
       // dd($vistas->toArray());

       foreach ($empresas as $empresa){
            foreach ($vistas as $vista) {
            $usuario->accesos()->attach($vista->id, ['id_parametro' => $empresa['id']]);
        }
    }

        foreach($empresas as $empresa){
            $usuario->parametros()->attach($empresa['id']);
        }


        return to_route('usuarios');


    }

    /**
     * TODO: Metodo que ejecuta la autenticación del usuario es decir... el boton de login
     */

    public function aut_user(request $data) {

        /**
         * Este metodo se encarga de hacer login y de guardar las variables de sesion
         */
        //dd($data->toArray());

        $rules = [
            'username' => 'required',
            'password' => 'required',
        ];

        $customMessages = [
            'username.required'    => 'Usuario Es Obligatorio',
            'password.required'    => 'Contraseña Es Obligatorio',
        ];

        $validatedData = $data->validate($rules, $customMessages);
         //$usuario_estado_valid = usuarios_empleado::where('usuario','=',$data['username'])->pluck('activo')->first();
		//dd($usuario_estado_valid);
        //dd($data->toArray());
        $xyz = auth::guard('empleados')->attempt(['usuario' => $data->username, 'password' => $data->password],$data->remember);
		//dd($xyz);
        if ($xyz) {


            $empleado = usuarios_empleado::with('parametros')->where('usuario','=',$data['username'])->first();

            if ($empleado->parametros->isEmpty()) {
                auth::guard('empleados')->logout();

                return back()->withErrors(['empresa'=>' Este Usuario No Tiene Ninguna Empresa Asignada,
                Por Favor Ponerse en Contacto con el Administrador o Proveedor del Servicio ']);

            }else{
                $parametroIds = $empleado->parametros->map(function ($parametro) {
                    return [
                        'id' => $parametro->id,
                        'razon_social' => $parametro->razon_social,
                        'ruta_logo' => $parametro->ruta_logo,
                    ];
                })->toArray();

                Session::put('empresas', $parametroIds);
                $empresas = Session::get('empresas');
                Session::put('empresa', $empresas[0]['id']); //$data->empresa); antes venia de la vista
                $empresa = Session::get('empresa');

                $parametros = parametro::where('id', Session::get('empresa'))->select('ruta_logo', 'razon_social','correo')->first();
                $Accesos = $empleado->accesos()->wherePivot('id_parametro', $empresa)->get();
                Session::put('logo_ruta', $parametros->ruta_logo);
                Session::put('razon_social', $parametros->razon_social);
                Session::put('email_empresa', $parametros->correo);
                Session::put('Accesos', $Accesos);
                //$Accesos = Session::get('Accesos');

                // dd($Accesos->toArray());
                Session::save();  // dd($empresa);

                $logo = Session::get('logo_ruta');
                $razon_social = Session::get('razon_social');
            }




            $usuario_estado_valid = usuarios_empleado::where('usuario','=',$data['username'])->pluck('activo')->first();

            if ($usuario_estado_valid == 0 || is_null($usuario_estado_valid) || $usuario_estado_valid == ' ' || $usuario_estado_valid != 1) {
                auth::guard('empleados')->logout();

                 return back()->withErrors(['password'=>' Este Usuario Se Encuentra Desactivado, Por Favor Ponerse en Contacto con el Administrador o Proveedor del Servicio ']);
            }
            else if ($usuario_estado_valid == 1) {
                //dd('entro');
                $id_empleados = auth()->guard('empleados')->user()->id_empleados;
                $usuario_empleado = usuarios_empleado::where('id_empleados','=',$id_empleados)->first();
                $usuario_empleado->chat_estatus == 1;
                $usuario_empleado->save();

                $c_c = auth()->guard('empleados')->user()->cambiar_contraseña;
                $ruta='resenas';
                if ( $c_c == 1) {
                    $ruta = 'cambiar_contrasena';
                }
                return redirect()->route($ruta)->withSuccess('Ha Iniciado Sessión !');
            }
		}
      	else {
            return back()->withErrors(['password'=>'Usuario y/o Contraseña Inválido']);
        }
    }

    /**
     * TODO: cerrar la sesión del usuario
     */
    public function logout() {
        auth::guard('empleados')->logout();
        Session::forget('empresa');
       return redirect()->route('login');
    }

     /**
     * TODO: uodate usuario
     */
    public function update(request $data) {
        $empleado = usuarios_empleado::where('id_empleados','=',$data->get('id_empleados'))->first();
        $rules = [
            'nombre_completo' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255',Rule::unique('usuarios_empleados','email')->ignore($empleado->id_empleados, 'id_empleados')],
            'usuario' => [Rule::unique('usuarios_empleados','usuario')->ignore($empleado->id_empleados, 'id_empleados')],
            'num_identificacion' => ['required','max:50'],
            'num_telefono' => ['required'],
            'cargo' => ['required','max:2'],
        ];
        $customMessages = [
            'nombre_completo.required'    => 'Por Favor Ingrese Llene El Campo "Nombre Completo" ',
            'nombre_completo.string'    => 'Formato Inválido En El Campo "Nombre Completo" ',
            'nombre_completo.max'    => 'Formato Inválido En El Campo "Nombre Completo" ',
            'email.required'    => 'Por Favor Ingrese Llene El Campo "Email" ',
            'email.string'    => 'Formato Inválido En El Campo "Email" ',
            'email.email'    => 'Formato Inválido En El Campo "Email" ',
            'email.max'    => 'Formato Inválido En El Campo "Email" ',
            'email.unique'    => 'Este Email Ya Pertenece a Una Cuenta',
            'usuario.unique'    => 'Este Usuario Ya Pertenece a Una Cuenta',
            'num_identificacion.required'    => 'Por Favor Ingrese Llene El Campo "No-Identificación" ',
            'num_identificacion.max'    => 'Formato Inválido En El Campo "No-Identificación" ',
            'num_telefono.required'    => 'Por Favor Ingrese Llene El Campo "Número Teléfono" ',
            'cargo.required'    => 'Por Favor Ingrese Llene El Campo "Cargo" ',
            'cargo.max'    => 'Formato Inválido En El Campo "Cargo" ',
        ];

        $validatedData = $data->validate($rules, $customMessages);
        if (is_null($data['usuario']) || $data['usuario'] == '') {
            $data['usuario'] = $data['email'];
        }
        else {
            $data['usuario'] = $data['email'];
        }
        $user_update = usuarios_empleado::where('id_empleados','=',$data['id_empleados'])->update($data->except('_token'));
        if ($user_update) {
            if ( $data['cambiar_contraseña'] == 1) {
                return $this->logout();
            }
            else {
                return redirect()->back()->withSuccess('Se Actualizaron Los Datos Del Usuario !');
            }
        }
        else {
            return redirect()->route('Hubo un Problemma al Actualizar Los Datos Del Usuario !');
        }
    }

}
