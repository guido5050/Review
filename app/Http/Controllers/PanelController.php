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
use App\Models\PreguntasClientes;
use App\Models\Comentarios;
use App\Models\Estados;
use App\Models\Preguntas;
use App\Models\Prespuesta;

class PanelController extends Controller

{
    public function datos()//Test
    {
        $empresa = session('empresa');
        $data = RedesSociales::where('id_empresa', $empresa)->get();

        dd($data->toArray());
    }

    /**
     * Retorna la vista de clientes con los datos necesarios.
     *
     * @return \Inertia\Response
     */
    public function clientes()
    {
        $empresa = session('empresa');
        $clientes = UsuariosClientes::where('id_empresa', $empresa)->orderBy('id_cliente', 'desc')->paginate(10);
        $plantillas=Correo::where('id_empresa', $empresa)->get();
        $existePreguntaSinRespuesta = Preguntas::where('id_empresa', $empresa)
        ->where(function ($query) {
            foreach (range(1, 5) as $puntuacion) {
                $query->orWhereDoesntHave('posiblesRespuestas', function ($query) use ($puntuacion) {
                    $query->where('puntuacion', $puntuacion);
                });
            }
        })
        ->exists(); //TODO como observacion esta consulta podria ir justo despues de iniciar sesion

        $existePreguntaConRespuesta = !$existePreguntaSinRespuesta;

        // Guardar $existePreguntaConRespuesta en una variable de sesión

         return inertia::render('panel/Clientes',
        ['client' => $clientes ,
        'plantillas'=>$plantillas,
        'empresaId' => $empresa,
        'encuesta' => $existePreguntaConRespuesta,
        ]);
    }

    public function resenas()
    {
        $id_empresa = session('empresa');
        $resenas = Resena::with('UsuariosClientes')->where('id_empresa', $id_empresa)->paginate(10);

        $estados=Estados::all()->groupBy('id_estado');



        return inertia::render('panel/Resenas', ['resenas' => $resenas, 'estados' => $estados]);
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

    public function encuesta()//TODO: Metodo que retorna la vista de la encuesta(GESNTIONAR ENCUESTA)
    {
        $empresa = session('empresa');
        $preguntas = Preguntas::where('id_empresa', $empresa)
            ->with('posiblesRespuestas')
            ->get();

           // dd($preguntas);

         $existePreguntaSinRespuesta = Preguntas::where('id_empresa', $empresa)
        ->where(function ($query) {
            foreach (range(1, 5) as $puntuacion) {
                $query->orWhereDoesntHave('posiblesRespuestas', function ($query) use ($puntuacion) {
                    $query->where('puntuacion', $puntuacion);
                });
            }
        })
        ->exists(); //TODO como observacion esta consulta podria ir justo despues de iniciar sesion

        /**
         *
         *
         */

        $existePreguntaConRespuesta = !$existePreguntaSinRespuesta;
         //dd($existePreguntaConRespuesta);
        return inertia::render('panel/ConfigEncuesta',['preguntas' => $preguntas,'estadoEncuesta' => $existePreguntaConRespuesta]);
    }



    public function crear_posiblerazon(Request $request) //TODO: Metodo que crea posibles razones
    {
     //dd($request->toArray());
        $preguntaId=$request->preguntaId;
        $puntuacion=$request->puntuacion;
        $titulo=$request->titulo;
        $empresa = session('empresa');
        //dd($preguntaId, $puntuacion, $empresa,$titulo);

        $pregunta = Prespuesta::create([
            'id_preguntas' => $preguntaId,
            'id_empresa' => $empresa,
            'titulo_respuesta' => $titulo,
            'puntuacion' => $puntuacion,
            'estado' => true,
        ]);
        return to_route('encuesta');

    }

    public function crear_pregunta(Request $request) //TODO: Metodo que crea preguntas
    {
        $empresa = session('empresa');
      /// dd($request->toArray(), $empresa);

        $pregunta = Preguntas::create([
            'id_empresa' => $empresa,
            'titulo' => $request->titulo,
        ]);
        return to_route('encuesta');
    }


    public function Estado_preguntas($idposiblerespuesta, $estado){

        // dd($idposiblerespuesta, $estado);

        $respuesta = Prespuesta::find($idposiblerespuesta);

       // dd($respuesta->toArray());

        if ($respuesta) {
            $respuesta->update(['estado' => $estado]);
        } else {
            // Manejar el caso en que la respuesta no se encuentra
        }
        return back();
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



    public function gestionar($userClienteId,$Idresena) //TODO Metodo de la vista de resena por id de usuario
    {
       // dd($userClienteId, $Idresena);
        // Obtén la reseña para este userClienteId
        $resena = Resena::with('UsuariosClientes')->where('id_usuario', $userClienteId)->first();

        $Comentarios = Comentarios::where('id_resena', $Idresena) ->get()->groupBy('id_preguntas');

        // dd($Comentarios->toArray());
         $nombre=$resena->UsuariosClientes->nombre_completo;
         $comentario = $resena->comentario;
        $puntuacion= $resena->Puntuacion_global;
        $id_resena = $resena->id_resena;
        $reserva = $resena->id_reserva;
        //dd($id_resena);
        // Si no se encontró ninguna reseña, redirige de vuelta con un mensaje de error
        if (!$resena) {
            return redirect()->back()->with('error', 'No se encontró ninguna reseña para este usuario');
        }

        // Obtén todas las PreguntasClientes para este id_resena
        $preguntasClientes = PreguntasClientes::with('pregunta')
                            ->where('id_resena', $resena->id_resena)
                            ->get()
                            ->groupBy('id_preguntas');


        //dd($nombre, $comentario,$puntuacion, $preguntasClientes->toArray());

        // Ahora puedes pasar estas preguntas y la reseña a tu vista
        return Inertia::render('panel/GestionarResenas',
        [
        'nombre'     =>  $nombre,
        'comentario' =>  $comentario,
        'puntuacion' =>  $puntuacion,
        'respuestas'  =>  $preguntasClientes,
        'idresena' =>   $id_resena,
        'comentarios' => $Comentarios,
        'reserva' => $reserva,
        ]);
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
            'estado' => 1 // TODO: Pendiente
        ];

        // Intenta encontrar una Resena existente con el id_usuario dado, si no existe, crea una nueva$
        $resena = Resena::firstOrCreate(
            ['id_usuario' => $request->id_usuario],
            $resenaData
        );

        return to_route('showStars',['id_resena' => $resena->id_resena, 'empresa' => $id_empresa]);
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
            //'waltdmda15@gmail.com

           //TODO: Metodo que se encarga de enviar el correo
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

    public function comentarios_admin(Request $request) //TODO: Metodo que guarda los comentarios de los administradores
    {
        //dd($request->toArray());
            $Idpregunta= $request->id_preguntas;
            $Idresena= $request->id_resena;
            //dd($nombreadmin, $request->comentario, $idUserAdmin, $Idpregunta, $Idresena);
        Comentarios::create([
                'id_resena' => $Idresena,
                'id_empleados' => $request->id_empleados,
                'id_preguntas' => $Idpregunta,
                'Nombre_Admin' =>$request->Nombre_Admin,
                'comentario' => $request->comentario,
                'fecha' => date('Y-m-d'),
            ]);


            return back();
    }
}
