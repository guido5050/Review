<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\ReservasEncabezado;

use App\Models\CuentasClientesEncabezados;
use App\Models\UsuariosClientes;
use App\Models\parametro;
use App\Models\Correo;
use App\Models\RedesSociales;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrisonContactMailable;


class SendEmailController extends Controller
{
    //
    public function index(){
        $reservas = ReservasEncabezado::all();





        return view('ModuloPms.reservas',['reservas' => $reservas]);
    }

    public function programado(){

        $fechaActual = Carbon::now()->subDays(2)->format('Y-m-d');

        $reserva = ReservasEncabezado::select('fecha_out_prev','id_reservas','ref_id_cuenta','evaluacion')->where('fecha_out_prev',$fechaActual)
            ->with([
                'cuentasclientes' => function ($query) {
                    $query->select('id_cuentas', 'evaluacion', 'ref_id_cliente');
                },
                'cuentasclientes.clientes' => function($query){
                    $query->select('id_cliente','email','nombre_completo','id_empresa');
                }
            ])->get()->toArray();

         //dd($reserva);


        foreach($reserva as $reserva){

            if($fechaActual === $reserva['fecha_out_prev']  && $reserva['evaluacion'] === 0 && $reserva['cuentasclientes']['evaluacion'] === 0
            && $reserva['cuentasclientes']['clientes']['email'] != null){

                dump(
                    $reserva['fecha_out_prev'],
                     $reserva['id_reservas'] ,
                     $reserva['ref_id_cuenta'],
                     $reserva['evaluacion'],
                      $reserva['cuentasclientes']['evaluacion'],
                      $reserva['cuentasclientes']['clientes']['email']
                    );
            }


        }

        dd($fechaActual);

        $compare=Carbon::create($reserva->fecha_out_prev)->format('Y-m-d');


        //fUNCION QUE COMPARA LAS FECHAS DE LAS RESERVAS DE HACE DOS DIAS Y DEVUELVE LAS RESERVAS QUE COINCIDEN
        //dd( $FechaActual);

        $reservas = ReservasEncabezado::where('fecha_out_prev',$FechaCompare)->get();

        if($cliente->email && $fechaActual === $compare){

            // dd('tiene correo y la fecha coicide', $fechaActual,$compare);

          }else{

           //dd('no ti ene');
          }
         // dd($oneDay);

    }


    public function generarLink($idreserva){
        //dd($idreserva);
        $reserva = ReservasEncabezado::find($idreserva);
        //dd($fechaActual,$compare);
        $cliente = $reserva->cuentasclientes->clientes; //Buscamos el cliente de la reserva->cuentasclientes->clientes
       // dd($cliente);
        $nombre = $cliente->nombre_completo; //Obtenemos el nombre del cliente

        $idEmpresa = $cliente->id_empresa; //Obtenemos el id de la empresa del cliente

        $clienteId = $cliente->id_cliente; //Obtenemos el id del cliente
        //dd($idreserva,$clienteId,$idEmpresa, $nombre);

        //Datos del correo(consulta);
        $plantilla = Correo::where('id_empresa',$idEmpresa)->first();

       // dd($plantilla);
        $S_evlauacion = "https://satars.orisonhostels.com/";
        $url = $S_evlauacion."generarResena?id_reserva={$idreserva}&id_usuario={$clienteId}&id_empresa={$idEmpresa}";
        //dd($url);

        return view('ModuloPms.GenearaLink',['url' => $url]);
       // return inertia::render('Mailable/Mailable');
    }

    public function enviarEmail($idreserva){
       // dd($idreserva);
        $reserva = ReservasEncabezado::find($idreserva);

        $cliente = $reserva->cuentasclientes->clientes;

        $nombre = $cliente->nombre_completo;

        $idEmpresa = $cliente->id_empresa;

        $clienteId = $cliente->id_cliente;

        $email = $cliente->email;

        $url = "generarResena?id_reserva={$idreserva}&id_usuario={$clienteId}&id_empresa={$idEmpresa}";

        $correo_current = Correo::where('id_empresa', $idEmpresa)->select('titulo', 'cuerpo', 'asunto')->first();

        $logo = parametro::where('id', $idEmpresa)->select('ruta_logo')->first();

        $data = RedesSociales::where('id_empresa', $idEmpresa)->get()->toArray();



        //dd($reserva->evaluacion);
        try {
            //code...
            Mail::to($email)->send(new OrisonContactMailable(
                $nombre,
                $url,
                $correo_current->titulo,
                $correo_current->cuerpo,
                $logo->ruta_logo,
                $data,
                $correo_current->asunto));
                $reserva->evaluacion = true;
                $reserva->cuentasclientes->evaluacion = true;

                $reserva->cuentasclientes->save();
                $reserva->save();

        } catch (\Exception $e) {
            \Log::error('Error al enviar correo: ' . $e->getMessage());
        }

        return back();

    }


}
