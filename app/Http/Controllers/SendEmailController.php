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



    public function programado_Evaluaciona_automaticas()
    {
        $fechaActual = Carbon::now()->subDays(2)->format('Y-m-d'); //Resto dos dias a la fecha actual

        $reservas = ReservasEncabezado::select('fecha_out_prev','id_reservas','ref_id_cuenta','evaluacion')->where('fecha_out_prev',$fechaActual)
            ->with([
                'cuentasclientes' => function ($query) {
                    $query->select('id_cuentas', 'evaluacion', 'ref_id_cliente');
                },
                'cuentasclientes.clientes' => function($query){
                    $query->select('id_cliente','email','nombre_completo','id_empresa');
                }
            ])->get();

        //dd($reservas->toArray());


        foreach($reservas as $reserva){

            if($fechaActual === $reserva->fecha_out_prev  && $reserva->evaluacion === null && $reserva->cuentasclientes->evaluacion === null
             && $reserva->cuentasclientes->clientes->email != null) {

                $correo_current = Correo::where('id_empresa', $reserva->cuentasclientes->clientes->id_empresa)
                ->select('titulo', 'cuerpo', 'asunto')->first();

                $nombre = $reserva->cuentasclientes->clientes->nombre_completo;
                $url = "generarResena?id_reserva={$reserva->id_reservas}&id_usuario={$reserva->cuentasclientes->clientes->id_cliente}&id_empresa={$reserva->cuentasclientes->clientes->id_empresa}";
                $titulo = $correo_current->titulo;
                $cuerpo = $correo_current->cuerpo;
                $asunto = $correo_current->asunto;
                $logo = parametro::where('id', $reserva->cuentasclientes->clientes->id_empresa)->select('ruta_logo')->first();
                $data = RedesSociales::where('id_empresa', $reserva->cuentasclientes->clientes->id_empresa)->get()->toArray();


                //$reserva->cuentasclientes->clientes->email
                try {
                    Mail::to('wgarcia6508@gmail.com')->send(new OrisonContactMailable(
                        $nombre,
                        $url,
                        $titulo,
                        $cuerpo,
                        $logo->ruta_logo,
                        $data,
                        $asunto
                    ));

                    $reserva->evaluacion = 1; //Actualizo el campo evaluacion de la tabla 'reservas_encabezado'
                    $reserva->cuentasclientes->evaluacion = 1; // Actualizo el campo evaluacion de la tabla 'cuentas_clientes_encabezado'

                    $reserva->cuentasclientes->save();
                    $reserva->save();

                } catch (\Exception $e) {
                    \Log::error('Error al enviar correo: ' . $e->getMessage());
                }
            }
        }


       Return back();

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

       // dd($reserva->evaluacion);
        try {
            //code...
            Mail::to('wgarcia6508@gmail.com')->send(new OrisonContactMailable(
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

       // dd($fechaActual);
        return back();

    }


}
