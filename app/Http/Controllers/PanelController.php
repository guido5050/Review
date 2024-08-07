<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Models\Resena;
use App\Models\usuarios_empleado;
use App\Models\UsuariosClientes;
use App\Models\Empresas;
use App\Models\parametro;
use App\Models\Roles;
use Inertia\Inertia;
use App\Mail\OrisonContactMailable;
use App\Models\Correo;
use App\Models\RedesSociales;
use App\Models\PreguntasClientes;
use App\Models\Comentarios;
use App\Models\Estados;
use App\Models\Preguntas;
use App\Models\Prespuesta;
use App\Models\PosiblesRespuestasEvaluacionesClientes;
use App\Models\PreguntasEvaluacionesClientes;
use App\Models\Acceso;
use Carbon\Carbon;
use DB;
use Illuminate\Support\Facades\Session;


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
    public function clientes(Request $request)
    //TODO: Metodo que retorna la vista de clientes
    {
        $empresa = session('empresa');
        $busqueda = $request->query('busqueda');
        $busquedaPor = $request->query('busquedaPor');

        $query = UsuariosClientes::where('id_empresa', $empresa);

        if ($busquedaPor === 'correo') {
            $query->whereNotNull('email');
        } else if ($busquedaPor === 'sinCorreo') {
            $query->whereNull('email');
        }

        if ($busqueda) {
            $query->where(function ($query) use ($busqueda) {
                $query->where('nombre_completo', 'like', '%' . $busqueda . '%')
                    ->orWhere('email', 'like', '%' . $busqueda . '%');
            });
        }

        $clientes = $query->orderBy('id_cliente', 'desc')->paginate(10);

        $plantillas = Correo::where('id_empresa', $empresa)->get();

        $existePregunta = Preguntas::where('id_empresa', $empresa)->exists();

        //dd($existePregunta);

        $existePreguntaSinRespuesta = Preguntas::where('id_empresa', $empresa)
            ->where(function ($query) {
                foreach (range(1, 5) as $puntuacion) {
                    $query->orWhereDoesntHave('posiblesRespuestas', function ($query) use ($puntuacion) {
                        $query->where('puntuacion', $puntuacion);
                    });
                }
            })
            ->exists();

        $existePreguntaConRespuesta = !$existePreguntaSinRespuesta;


        //dd($existePreguntaSinRespuesta,$existePregunta);
        return inertia::render('panel/Clientes',
            ['client' => $clientes ,
            'plantillas'=>$plantillas,
            'empresaId' => $empresa,
            'encuesta' => $existePreguntaConRespuesta,
            'estadoPreguntas'=>$existePregunta
            ]);
    }


    public function clientes_search(Request $request)
    {
        $busqueda = $request->query('busqueda');
        $empresaActual = session('empresa'); // Obtén la empresa actual de la sesión

        $clientes = UsuariosClientes::where('id_empresa', $empresaActual)
            ->where(function ($query) use ($busqueda) {
                $query->where('nombre_completo', 'like', '%' . $busqueda . '%')
                    ->orWhere('email', 'like', '%' . $busqueda . '%');
            })
            ->get();

       // dd($clientes->toArray());

    return inertia::render('panel/Clientes', ['client' => $clientes]);
    }

    public function Session(Request $request){
       // dd($request->toArray());

        $user = Auth::user();
        $empresaId = $request->empresa['id'];
        $razon_social = $request->empresa['razon_social'];
        $logo = $request->empresa['ruta_logo'];
        $accesos = $user->accesos()->wherePivot('id_parametro',$request->empresa['id'])->get();

        Session::put('Accesos', $accesos);
        Session::put('empresa', $empresaId);
        Session::put('logo_ruta',$logo);
        Session::put('razon_social', $razon_social);

        // $VerAccesos = Session::get('Accesos');
        //  dd($VerAccesos->toArray());
        return back();
    }


    public function create_clientes(Request $request){

        $empresa = session('empresa');
        $data = $request->all();

        //dd($data);

        $rules = [
            'nombre_completo' => 'required|string',
            'email' => 'required|email',
            'num_telefono' => 'required|string',
            'nacionalidad' => 'required|string',
            'num_identificacion' => 'required|string',
        ];

        $cliente = UsuariosClientes::create([
            'id_empresa' => $empresa,
            'nombre_completo' => $request->nombre_completo,
            'nacionalidad'=> $request->nacionalidad,
            'ciudad' => $request->ciudad,
            'email' => $request->email,
            'num_telefono1' => $request->num_telefono,
            'num_identificacion' => $request->num_identificacion,
        ]);
        return redirect()->back();
    }

    public function resenas(Request $request)
    {
       // $busqueda = $request->query('busqueda');
       $fechaActual = Carbon::now()->format('Y-m-d');
       //dd($fechaActual);
        $StartDate =$request->query('startDate') ;
        $EndDate =  $request->query('endDate') ;
        $Searchyear = $request->query('year');
        $SearchMonth = $request->query('month');
        $promedioporAño = null;
        $promedioporMes = null;
        $promeYear=null;

        $id_empresa = session('empresa');

      //  dd($id_empresa);

        if($StartDate != null && $EndDate != null){ //TODO filtrar por rango de fechas

            $StartDate = Carbon::parse($StartDate)->format('Y-m-d');
            $EndDate = Carbon::parse($EndDate)->format('Y-m-d');

            $resenas = Resena::with('UsuariosClientes')
            ->where('id_empresa', $id_empresa)
            ->whereBetween('fecha', [$StartDate, $EndDate])
            ->orderBy('id_resena', 'desc')
            ->paginate(10);

            $promeYear = Resena::select(
                DB::raw('YEAR(fecha) as Ano'),
                DB::raw('ROUND(AVG(Puntuacion_global), 1) as promedio')
            )
            ->where('id_empresa', $id_empresa)
            ->whereYear('fecha', $fechaActual)
            ->groupBy(DB::raw('YEAR(fecha)'))
            ->first();

            //dd($promeYear->toArray());

            $promedioporAño = Resena::select(
                DB::raw('MONTH(fecha) as MesNumerico'),
                DB::raw('DATE_FORMAT(fecha, "%M") as Mes'),
                DB::raw('ROUND(AVG(Puntuacion_global), 1) as promedio')
            )
                ->where('id_empresa', $id_empresa)
                ->whereBetween('fecha', [$StartDate, $EndDate])
                ->groupBy(DB::raw('MONTH(fecha)'), DB::raw('DATE_FORMAT(fecha, "%M")'))
                ->orderBy('MesNumerico', 'asc')
                ->get();

                //dd($promedioporAño);

                $promedioporMes = Resena::select(
                    DB::raw('DATE(fecha) as Dia'),
                    DB::raw('ROUND(AVG(Puntuacion_global), 1) as promedio')
                )
                ->where('id_empresa', $id_empresa)
                ->whereMonth('fecha', 7)
                ->groupBy(DB::raw('DATE(fecha)'))
                ->get();



             //dd($promedioporMes->toArray());
        }else{
            $resenas = Resena::with('UsuariosClientes')
            ->where('id_empresa', $id_empresa)
            ->orderBy('id_resena', 'desc')
            ->paginate(10);

            $year = Carbon::parse($Searchyear)->format('Y');

            $promedioporAño = Resena::select(
                DB::raw('MONTH(fecha) as MesNumerico'),
                DB::raw('DATE_FORMAT(fecha, "%M") as Mes'),
                DB::raw('ROUND(AVG(Puntuacion_global), 1) as promedio')
            )
                ->where('id_empresa', $id_empresa)
                ->whereYear('fecha', $year)
                ->groupBy(DB::raw('MONTH(fecha)'), DB::raw('DATE_FORMAT(fecha, "%M")'))
                ->orderBy('MesNumerico', 'asc')
                ->get();

                $promedioporMes = Resena::select(
                    DB::raw('DATE(fecha) as Dia'),
                    DB::raw('ROUND(AVG(Puntuacion_global), 1) as promedio')
                )
                ->where('id_empresa', $id_empresa)
                ->whereYear('fecha', $year)
                ->whereMonth('fecha', 7)
                ->groupBy(DB::raw('DATE(fecha)'))
                ->get();
                $promeYear = Resena::select(
                    DB::raw('YEAR(fecha) as Ano'),
                    DB::raw('ROUND(AVG(Puntuacion_global), 1) as promedio')
                )
                ->where('id_empresa', $id_empresa)
                ->whereYear('fecha', $fechaActual)
                ->groupBy(DB::raw('YEAR(fecha)'))
                ->first();

               // dd($promeYear->toArray());
        }

        if($Searchyear != null) //TODO:Cuando se busca por año
        {
            $year = Carbon::parse($Searchyear)->format('Y');
            $promedioporAño = Resena::select(
                DB::raw('MONTH(fecha) as MesNumerico'),
                DB::raw('DATE_FORMAT(fecha, "%M") as Mes'),
                DB::raw('ROUND(AVG(Puntuacion_global), 1) as promedio')
            )
                ->where('id_empresa', $id_empresa)
                ->whereYear('fecha', $year)
                ->groupBy(DB::raw('MONTH(fecha)'), DB::raw('DATE_FORMAT(fecha, "%M")'))
                ->orderBy('MesNumerico', 'asc')
                ->get();

            $resenas = Resena::with('UsuariosClientes')
            ->where('id_empresa', $id_empresa)
            ->whereYear('fecha', $year)
            ->orderBy('id_resena', 'desc')
            ->paginate(10);
            $promeYear = Resena::select(
                DB::raw('YEAR(fecha) as Ano'),
                DB::raw('ROUND(AVG(Puntuacion_global), 1) as promedio')
            )
            ->where('id_empresa', $id_empresa)
            ->whereYear('fecha', $year)
            ->groupBy(DB::raw('YEAR(fecha)'))
            ->first();

           // dd($promeYear->toArray());
            }

        if($SearchMonth != null){ //TODO: Cuando se Busca por Mes
            $month = Carbon::parse($SearchMonth);
            $year = $month->year;
            $month = $month->month;


            $promedioporMes = Resena::select(
                DB::raw('DATE(fecha) as Dia'),
                DB::raw('ROUND(AVG(Puntuacion_global), 1) as promedio')
            )
            ->where('id_empresa', $id_empresa)
            ->whereYear('fecha', $year) //en el año
            ->whereMonth('fecha', $month)//en el mes

            ->groupBy(DB::raw('DATE(fecha)'))
            ->get();

           /// dd($promedioporMes->toArray());

           $promedioporAño = Resena::select(
            DB::raw('MONTH(fecha) as MesNumerico'),
            DB::raw('DATE_FORMAT(fecha, "%M") as Mes'),
            DB::raw('ROUND(AVG(Puntuacion_global), 1) as promedio')
        )
            ->where('id_empresa', $id_empresa)
            ->whereYear('fecha', $year)
            ->groupBy(DB::raw('MONTH(fecha)'), DB::raw('DATE_FORMAT(fecha, "%M")'))
            ->orderBy('MesNumerico', 'asc')
            ->get();



            $resenas = Resena::with('UsuariosClientes')
            ->where('id_empresa', $id_empresa)
            ->whereMonth('fecha', $month)
            ->whereYear('fecha', $year)
            ->orderBy('id_resena', 'desc')
            ->paginate(10);
           // dd($resenas->toArray());

           $promeYear = Resena::select(
            DB::raw('YEAR(fecha) as Ano'),
            DB::raw('ROUND(AVG(Puntuacion_global), 1) as promedio')
        )
        ->where('id_empresa', $id_empresa)
        ->whereYear('fecha', $year)
        ->groupBy(DB::raw('YEAR(fecha)'))
        ->first();

       //dd($promeYear->toArray());
        }

        $estados = Estados::all()->groupBy('id_estado');

        return inertia::render('panel/Resenas', [
            'resenas' => $resenas,
             'estados' => $estados,
              'promedioAño' => $promedioporAño,
              'promedioMes' => $promedioporMes,
              'promeYear' => $promeYear,
              ]);
    }

    public function usuarios() //TODO: Metodo que retorna la vista de configuracion de usuarios
    {
        /**
         * Esta vista es la de configuracion de usuarios
         */
        $cargo = Roles::all();
        $empresas = session()->get('empresas');

        $currentEmpresa = parametro::find(session('empresa'));
         // ...

        if (Auth::user()->nombre_completo == 'Admin') {

            $UsuarioDeEmpresa = usuarios_empleado::orderBy('id_empleados', 'desc')->get();

        } else {
            $UsuarioDeEmpresa = $currentEmpresa->usuarios()->orderBy('id_empleados', 'desc')->get();
        }

      //  dd($UsuarioDeEmpresa->toArray());

         $Accesos = Acceso::all();
        // dd($Accesos->toArray());


            return inertia::render('panel/Usuarios', [
                'users' => $UsuarioDeEmpresa,
                'cargo' => $cargo,
                'empresas' => $empresas,
                'AccesosT' => $Accesos,
            ]);

    }

    public function encuesta()
    //TODO: Metodo que retorna la vista de la encuesta(GESNTIONAR ENCUESTA para evaluar a la empresa donde configuramos preguntas y posiblesRespuestas)
    {
        $empresa = session('empresa');
        $preguntas = Preguntas::where('id_empresa', $empresa)
            ->with('posiblesRespuestas')
            ->get();

        /**
         * Verifica si existe alguna pregunta sin respuesta para una empresa específica.
         *
         * @param int $empresa El ID de la empresa.
         * @return bool Retorna true si existe alguna pregunta sin respuesta, de lo contrario retorna false.
         */
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
         //dd($existePreguntaConRespuesta);
        return inertia::render('panel/ConfigEncuesta',['preguntas' => $preguntas,'estadoEncuesta' => $existePreguntaConRespuesta]);
    }

    public function encuesta_clientes()
    {
         //TODO: Metodo que retorna la vista de la encuesta a clientes(donde podemos configurar la encuesta a clientes, preguntas y respuestas)
         $empresa = session('empresa');
         $preguntas = PreguntasEvaluacionesClientes::where('id_empresa', $empresa)
         ->with('posiblesRespuestasEvaluacionesClientes')
         ->get();
         //dd($preguntas->toArray());
        return inertia::render('Evaluacionesclientes/ConfigEncuesta_Clientes',['preguntas' => $preguntas]);
    }

    public function updateRazon(Request $request)
    //TODO: este metodo se encarga de actualizar las posibles razones en evaluaciones a la empresa
    {
    // dd($request->toArray());

        $Razon = Prespuesta::find($request->id_posiblesRespuestas);

    //dd($request->posible_razon);
        $Razon->update([
            'titulo_respuesta' => $request->posible_razon
        ]);

       /// dd($Razon->toArray());

        return back();
    }

    public function crearpreguntaCliente(Request $request)  //TODO: Metodo que crea las preguntas en la vista de encuesta a clientes
    {
        //dd($request->toArray());
        $empresa = session('empresa');
        $pregunta = PreguntasEvaluacionesClientes::create([
            'id_empresa' => $empresa,
            'titulo' => $request->titulo,
        ]);
    }

    public function crear_posiblerazon_cliente(Request $request)
    {   //PosiblesRespuestasEvaluacionesClientes
        //dd($request->toArray());
        $empresa = session('empresa');
        $preguntaId=$request->preguntaId;
        $puntuacion=$request->puntuacion;
        $titulo=$request->titulo;
        $pregunta = PosiblesRespuestasEvaluacionesClientes::create([
            'id_preguntas_evaluacion' => $preguntaId,
            'titulo_respuesta' => $titulo,
            'puntuacion' => $puntuacion,
            'estado' =>1,
            'id_empresa' => $empresa,

        ]);
    }

    public function updateRazon_cliente(Request $request){

        //TODO: Metodo que actualiza las posibles razones en la vista de encuesta a clientes
       // dd($request->toArray());
        $Razon = PosiblesRespuestasEvaluacionesClientes::find($request->id);
        //dd($Razon->toArray());
        $Razon->update([
            'titulo_respuesta' => $request->titulo_respuesta,
        ]);
        return back();
    }

    public function estado_pregunta_cliente($idposiblerespuesta, $estado)
    //TODO:metodo que cambia el estado de las preguntas en la vista de encuesta a cliente
    {

    //dd($idposiblerespuesta, $estado);

        $respuesta = PosiblesRespuestasEvaluacionesClientes::find($idposiblerespuesta);

        // dd($respuesta->toArray());

        if ($respuesta) {
            $respuesta->update(['estado' => $estado]);
        } else {
            // Manejar el caso en que la respuesta no se encuentra
        }
        return back();
    }

    public function crear_posiblerazon(Request $request) //TODO: Metodo que crea posibles razones en la encuesta (VISTA DE ADMIN) evaluacion a  empresa
    {

       // dd($request->toArray());
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

    public function crear_pregunta(Request $request) //TODO: Metodo que crea preguntas en vista Admin de encuesta a empresa
    {
       //dd($request->toArray());
        $empresa = session('empresa');

        $pregunta = Preguntas::create([
            'id_empresa' => $empresa,
            'titulo' => $request->titulo,
        ]);

        return to_route('encuesta');
    }


    public function Estado_preguntas($idposiblerespuesta, $estado)
    //TODO:metodo que cambia el estado de las preguntas en la vista de encuesta a empresa
    {

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
            $usuario = $empleadoData['usuario'];
            $telefono = $empleadoData['num_telefono'];
            $activo = intval($empleadoData['activo']) == 1 ? 1 : 0;
            $cargo = $empleadoData['cargo'];
            $identificacion = $empleadoData['num_identificacion'];

            $empleadoModel = usuarios_empleado::find($idEmpleado);

            // Guarda el cargo antiguo
            $cargoAntiguo = $empleadoModel->cargo;

            // Asigna el nuevo cargo
            $empleadoModel->cargo = $cargo;

            // Verifica si el cargo ha cambiado
            if ($cargoAntiguo != $cargo) {
                $empleadoModel->accesos()->detach();
                $Cargo = Roles::find($cargo);
                $Acceso  = $Cargo->accesos()->get();

                $Empresas = $empleadoModel->parametros()->get();
                foreach ($Empresas as $empresa){
                    foreach ($Acceso as $vista) {
                        $empleadoModel->accesos()->attach($vista->id, ['id_parametro' => $empresa['id']]);
                    }
                }
            }

            $empleadoModel->update([
                'nombre_completo' => $nombreCompleto,
                'email' => $email,
                'usuario' => $usuario,
                'num_telefono' => $telefono,
                'activo' => $activo,
                'cargo' => $cargo,
                'num_identificacion' => $identificacion,
            ]);
        }
        return redirect()->route('usuarios');
    }
    public function create_roles(Request $request)
    {
        //dd( $request->toArray());
        $role = $request->get('role');
        $accesos = $request->get('Accesos');

        //dd($request->toArray());

        $RoleTable = Roles::create([
            'nombre' => $role['nombre'],
            'descripcion' => $role['descripcion'],
        ]);

        $rolModel = Roles::find($RoleTable->id);


        foreach ($accesos as $acceso) {
            $rolModel->accesos()->attach($acceso);
        }

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

    // public function create(Request $request)
    // {
    //     dd($request->toArray());
    //     $validatedData = $request->validate([
    //         'nombre' => 'required|string',
    //         'email' => 'required|email',
    //         'telefono' => 'required|string',
    //     ]);
    //     $parametro = new Parametro;
    //     $parametro->nombre = $request->nombre;
    //     $parametro->email = $request->email;
    //     $parametro->telefono = $request->telefono;
    //     $parametro->save();
    // }

    public function delete($id_usuario)
    {
        $id_usuario = (int) $id_usuario;
        $user = usuarios_empleado::find($id_usuario);
        $user->delete();
        return redirect()->back();
    }



    public function gestionar($userClienteId,$Idresena) //TODO Metodo de la vista de resena por id de usuario /muestra comentarios
    {
       // dd($userClienteId, $Idresena);
        // Obtén la reseña para este userClienteId

        $resena = Resena::with(['UsuariosClientes', 'UsuarioModerador'])
            ->where('id_usuario', $userClienteId)
            ->where('id_resena', $Idresena)
            ->first();
        // dd($resena->toArray());
        $Comentarios = Comentarios::where('id_resena', $Idresena)->get()->groupBy('id_preguntas');

       /// dd($Comentarios->toArray());
         $nombre=$resena->UsuariosClientes->nombre_completo;
         $comentario = $resena->comentario;
         $puntuacion= $resena->Puntuacion_global;
         $id_resena = $resena->id_resena;
         $reserva = $resena->id_reserva;
         $fecha = $resena->fecha;
         $moderador = $resena->id_moderador ? $resena->UsuarioModerador->nombre_completo:0;
        // dd($moderador);
        // Si no se encontró ninguna reseña, redirige de vuelta con un mensaje de error
        if (!$resena) {
            return redirect()->back()->with('error', 'No se encontró ninguna reseña para este usuario');
        }

        // Obtén todas las PreguntasClientes para este id_resena
        $preguntasClientes = PreguntasClientes::with('pregunta')
                            ->where('id_resena', $resena->id_resena)
                            ->get()
                            ->groupBy('id_preguntas');


       //dd($preguntasClientes->toArray());

        // Ahora puedes pasar estas preguntas y la reseña a tu vista
        return Inertia::render('panel/GestionarResenas',
        [
        'nombre'     =>  $nombre,
        'comentario' =>  $comentario,
        'puntuacion' =>  $puntuacion,
        'respuestas'  =>  $preguntasClientes,
        'idresena' =>   $Idresena,
        'userid' => $userClienteId,
        'comentarios' => $Comentarios,
        'reserva' => $reserva,
        'fecha' => $fecha,
        'moderador' => $moderador,
        ]);
    }

    public function publicar_resena(Request $request)
    {
        //TODO: Metodo de aprobar resena para publicar en la vista ADMIN de resenas a empresa
        //idresena
        //estado
        //dd($request->toArray());
        $userId = Auth::id();
        $id_resena = $request->idresena;
        $estado = $request->estado;
        // Encuentra la reseña por su id
        $resena = Resena::find($id_resena);
       //dd($resena->toArray());
        if ($resena){
        $resena->publicado = $estado;
        $resena->id_moderador = $userId;
        $resena->save();
       // Obtén una nueva instancia del modelo desde la base de datos
        $resena = $resena->fresh();
       // Volcar los datos de la reseña
        //dd($resena->toArray());
    }

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
        $resena = Resena::create($resenaData);

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
            $email= $cliente->email;
            //dd($email);
           //TODO: Metodo que se encarga de enviar el correo
            Mail::to($email)->send(new OrisonContactMailable(
                $cliente->nombre_completo,
                 $url,
                 $titulo,
                 $cuerpo,
                 $logo,
                 $data,
                 $asunto
                ));

        } catch (\Exception $e) {
            \Log::error('Error al enviar correo: ' . $e->getMessage());
        }
        return to_route('clientes');
        //para retornar usando inertia
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
        return inertia::render('panel/Preview_Mail', ['html' => $html , 'clienteId' => $clienteId, 'plantilla'=> $plantilla, 'ClienteNombre' => $nombre]);
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
       // dd($request->toArray());
            $Idpregunta= $request->id_preguntas;
            $Idresena= $request->id_resena;
           // dd($Idresena);
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
