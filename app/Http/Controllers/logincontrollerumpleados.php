<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use DB;
use Auth;
use Illuminate\Validation\Rule;
use App\Events\NewMessageNotification;
use App\Clases\auto_close_turn;
use App\Models\usuarios_empleado;


class logincontrollerumpleados extends Controller
{
    public function show() {

        //dd('entro');
        if ( auth::guard('empleados')->guest() ) {

            return view('auth.login');
        }
        else if ( auth()->guard('empleados')->user()->cambiar_contraseña == 1 ) {
            return redirect()->route('cambiar_contrasena');
        }
        else {

            return redirect()->route('index');
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

    public function register(request $data) {
        //phone_number
        $rules = [
            'nombre_completo' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:usuarios_empleados,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'usuario' => ['unique:usuarios_empleados,usuario'],
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
            'password.required'    => 'Por Favor Ingrese Llene El Campo "Contraseña" ',
            'password.string'    => 'Formato Inválido En El Campo "Contraseña" ',
            'password.min'    => 'Campo "Contraseña" Tiene Que Ser Mayor de 8 Dígitos',
            'password.confirmed'    => 'Las Contraseñas No Coinciden',
        ];

        //$validatedData = $data->validate($rules, $customMessages);

        $data['usuario'] = $data['email'];
        $data['contrasena'] = $data['password'];
        $data['contrasena'] = bcrypt($data['contrasena']);
        $usuario = usuarios_empleado::create($data->all());
        //$usuario = usuarios_cliente::create($data->all());
        auth::guard('empleados')->logout();
        $username = $data['usuario'];

        return view('login');

        //'password' => Hash::make($data['password']),
        /* $data['activo'] = 1;
        if (is_null($data['usuario']) || $data['usuario'] == '') {
            dd("GOOOOKUUUU AAAAAh");
            $data['usuario'] = $data['email'];
            $data['contrasena'] = $data['password'];
            $data['contrasena'] = bcrypt($data['contrasena']);
            $usuario = usuarios_empleado::create($data->all());
            auth::guard('empleados')->logout();
            return redirect()->route('login')->with('username',$data['email']);

        }
        else {
            dd('pedrito');
        }
 */

    }

    public function aut_user(request $data) {

        //dd();
        $rules = [
            'username' => 'required',
            'password' => 'required',
        ];
        $customMessages = [
            'username.required'    => 'Usuario Es Obligatorio',
            'password.required'    => 'Contraseña Es Obligatorio',
        ];

        $validatedData = $data->validate($rules, $customMessages);
        $credentials = $data->only('username', 'password');
        //$usuario_estado_valid = usuarios_empleado::where('usuario','=',$data['username'])->pluck('activo')->first();
		//dd($usuario_estado_valid);

        $xyz = auth::guard('empleados')->attempt(['usuario' => $data->username, 'password' => $data->password],$data->remember);
		//dd($xyz);
        if ($xyz) {
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
                $ruta='index';
                if ( $c_c == 1) {
                    $ruta = 'cambiar_contrasena';
                } //$review_turns =
                //$review_turns = new auto_close_turn(); $review_turns = $review_turns->invoke();
                //return $review_turns;
                return redirect()->route($ruta)->withSuccess('Ha Iniciado Sessión !');
            }
		}
      	else {
            return back()->withErrors(['password'=>'Usuario y/o Contraseña Inválido']);
        }
    }

    public function logout() {
        auth::guard('empleados')->logout();

        return redirect()->route('login');
    }

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
