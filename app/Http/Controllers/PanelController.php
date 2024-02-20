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
use App\Models\RedesSociales;

class PanelController extends Controller
{
    public function datos()//Test
    {
        $empresa = session('empresa');
        $data = RedesSociales::where('id_empresa', $empresa)->get();
        dd($data->toArray());
    }

    public function clientes()
    {
        $empresa = session('empresa');
        $clientes = UsuariosClientes::where('id_empresa', $empresa)->orderBy('id_cliente', 'desc')->paginate(10);
        $plantillas=Correo::where('id_empresa', $empresa)->get();
        return inertia::render('panel/Clientes', ['client' => $clientes , 'plantillas'=>$plantillas]);
    }

    public function usuarios()
    {
        $cargo = Roles::all();
        $currentCargo = Auth::user()->cargo;
        if ($currentCargo < 3) {
            return inertia::render('panel/Resenas');
        } else {
            $users = usuarios_empleado::all();
            return inertia::render('panel/Usuarios', [
                'users' => $users,
                'cargo' => $cargo,
            ]);
        }
    }

    public function update(Request $request)
    {
        $data = $request->all();
        foreach ($data as $empleadoData) {
            $idEmpleado = $empleadoData['id_empleados'];
            $nombreCompleto = $empleadoData['nombre_completo'];
            $email = $empleadoData['email'];
            $telefono = $empleadoData['num_telefono'];
            $activo = $empleadoData['activo'];
            $cargo = $empleadoData['cargo'];
            $identificacion = $empleadoData['num_identificacion'];
            $empleadoModel = usuarios_empleado::find($idEmpleado);
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
    }

    public function create_roles(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string',
            'descripcion' => 'required|string',
        ]);
        $parametro = Roles::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
        ]);
        return back();
    }

    public function update_roles(Request $request)
    {
        $data = $request->all();
        foreach ($data as $rolesData) {
            $idRoles = $rolesData['id'];
            $nombre = $rolesData['nombre'];
            $descripcion = $rolesData['descripcion'];
            $rolesModel = Roles::find($idRoles);
            if ($rolesModel) {
                $rolesModel->update([
                    'nombre' => $nombre,
                    'descripcion' => $descripcion,
                ]);
            }
        }
        return back();
    }

    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string',
            'email' => 'required|email',
            'telefono' => 'required|string',
        ]);
        $parametro = new Parametro;
        $parametro->nombre = $request->nombre;
        $parametro->email = $request->email;
        $parametro->telefono = $request->telefono;
        $parametro->save();
    }

    public function delete($id_usuario)
    {
        $id_usuario = (int) $id_usuario;
        $user = usuarios_empleado::find($id_usuario);
        $user->delete();
        return redirect()->back();
    }

    // public function home()
    // {
    //     return view('home');
    // }

    // public function panel()
    // {
    //     return view('panel');
    // }

    public function resenas()
    {
        $id_empresa = session('empresa');
        $resenas = Resena::where('id_empresa', $id_empresa)->paginate(10);
        return inertia::render('panel/Resenas', ['resenas' => $resenas]);
    }

    public function generarResena(Request $request)
    {
        $nombreDominio = $request->getHost();
        $user = UsuariosClientes::where('id_cliente', $request->id_usuario)->first();
        $id_empresa = intval(session('empresa'));
        $resenaData = [
            'id_empresa' => $id_empresa,
            'id_reserva' => $request->id_reserva,
            'id_usuario' => $user->id_cliente,
            'estado' => 0
        ];
        Resena::create($resenaData);
        $id_resena = Resena::where('id_usuario', $request->id_usuario)->max('id_resena');
        return redirect()->route('showStars', ['id_resena' => $id_resena]);
    }

    public function mail($clienteId)
    {
        try {
            $cliente = UsuariosClientes::where('id_cliente', $clienteId)->select('nombre_completo', 'email')->first();
            $correo_current = Correo::where('id_empresa', session('empresa'))->select('titulo', 'cuerpo')->first();
            $url = "generarResena?id_reserva=122&id_usuario={$clienteId}";
            $logo = session('logo_ruta');
            $titulo = $correo_current->titulo;
            $cuerpo = $correo_current->cuerpo;
            $data = RedesSociales::where('id_empresa', session('empresa'))->get()->toArray();
            Mail::to('fel123rodriguez@gmail.com')->send(new OrisonContactMailable($cliente->nombre_completo, $url, $titulo, $cuerpo, $logo, $data));
        } catch (\Exception $e) {
            \Log::error('Error al enviar correo: ' . $e->getMessage());
        }
    }

    public function previewEmail_jsx($clienteId ,$plantilla)// TODO: muestra un preview del correo que se enviará
    {
        dd($clienteId, $plantilla);
        $cliente = UsuariosClientes::where('id_cliente', $clienteId)->select('nombre_completo', 'email')->first();
        $correo_current = Correo::where('id_empresa', session('empresa'))->select('titulo', 'cuerpo')->first();
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

}
