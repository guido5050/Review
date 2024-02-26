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
        //dd($plantillas->toArray());
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
        $id_empresa = $request->id_empresa;
        $resenaData = [
            'id_empresa' => $id_empresa,
            'id_reserva' => $request->id_reserva,
            'id_usuario' => $user->id_cliente,
            'estado' => 0
        ];
        Resena::create($resenaData);
        $id_resena = Resena::where('id_usuario', $request->id_usuario)->max('id_resena');
       // dd($id_resena);
        return to_route('showStars',['id_resena' => $id_resena, 'empresa' => $id_empresa]); //['id_resena' => $id_resena, 'empresa' => $id_empresa]
    }

    public function mail($clienteId,$plantilla) // TODO: metodo que envia el correo
    {
       // dd($clienteId, $plantilla);
        try {
            $cliente = UsuariosClientes::where('id_cliente', $clienteId)->select('nombre_completo', 'email')->first();
            $correo_current = Correo::where('id_correo', $plantilla)->select('titulo', 'cuerpo', 'asunto')->first();
             $asunto = $correo_current->asunto;
            $url = "generarResena?id_reserva=122&id_usuario={$clienteId}&id_empresa=".session('empresa');
            $logo = session('logo_ruta');
            $titulo = $correo_current->titulo;
            $cuerpo = $correo_current->cuerpo;
            $data = RedesSociales::where('id_empresa', session('empresa'))->get()->toArray();
           Mail::to('fel123rodriguez@gmail.com')->send(new OrisonContactMailable($cliente->nombre_completo, $url, $titulo, $cuerpo, $logo, $data,$asunto));
        } catch (\Exception $e) {
            \Log::error('Error al enviar correo: ' . $e->getMessage());
        }
        return to_route('clientes'); //para retornar usando inertia
    }


    public function previewEmail_jsx($clienteId ,$plantilla)// TODO: muestra un preview del correo que se enviará(NO ENVIA)
    {
         //dd($clienteId, $plantilla);
        $cliente = UsuariosClientes::where('id_cliente', $clienteId)->select('nombre_completo', 'email')->first(); //TODo:Obtiene el cliente actual

        $correo_current = Correo::where('id_correo', $plantilla)->select('titulo', 'cuerpo')->first();//TODO:Obtiene la plantilla de correo actual

        //dd($correo_current, $cliente->toArray());

        $titulo = $correo_current->titulo;
        $cuerpo = $correo_current->cuerpo;
        $logo = session('logo_ruta');
        $nombre = $cliente->nombre_completo;
        $url = '#';
        $redesSociales = RedesSociales::where('id_empresa', session('empresa'))->get()->toArray();
        
        $data = [
            'titulo' => $titulo,
            'cuerpo' => $cuerpo,
            'logo' => $logo,
            'nombre' => $nombre,
            "url" => $url,
            'redesSociales' => $redesSociales,
        ];
        $html = view('Mail.Plantilla_orison', $data)->render();
        return inertia::render('panel/Preview_Mail', ['html' => $html , 'clienteId' => $clienteId, 'plantilla'=> $plantilla]);
    }
    //TODO: Configuracion de Plantillas de correo
    public function configmail(){
        $empresa = session('empresa');
      //  dd($empresa);
        $plantillas=Correo::where('id_empresa', $empresa)->get();

        return inertia::render('panel/ConfigPlantilla', ['plantillas' => $plantillas]);
    }

    public function create_mail(Request $request) //TODO: Crear plantilla de correo
    {
       //dd("SOY UN MAE  TUANI");
        $data = $request->all();
       //  dd($data);
        $id_empresa = session('empresa');
        $nombre_plantilla = $data['nombre_plantilla'];
        $titulo = $data['titulo'];
        $cuerpo = $data['cuerpo'];
        $asunto = $data['asunto'];
        $plantillaModel = Correo::create([
            'id_empresa' => $id_empresa,
            'nombre_plantilla' => $nombre_plantilla,
            'titulo' => $titulo,
            'cuerpo' => $cuerpo,
            'asunto' => $asunto,
        ]);

        return to_route('config.mail');
    }

    public function update_mail(Request $request) //TODO: Actualizar plantilla de correo
    {
        $data = $request->all();
        //dd($data);
        $idPlantilla = $data['id_correo'];
        $nombre_plantilla = $data['nombre_plantilla'];
        $titulo = $data['titulo'];
        $cuerpo = $data['cuerpo'];
        $asunto = $data['asunto'];
        $plantillaModel = Correo::find($idPlantilla);
        if ($plantillaModel) {
            $plantillaModel->update([
                'titulo' => $titulo,
                'cuerpo' => $cuerpo,
                'asunto' => $asunto,
                'nombre_plantilla' => $nombre_plantilla,
            ]);
        }
        return redirect()->route('config.mail');
    }
}
