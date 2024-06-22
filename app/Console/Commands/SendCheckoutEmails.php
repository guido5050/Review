<?php

namespace App\Console\Commands;
use Illuminate\Console\Command;
use App\Models\UsuariosClientes;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use App\Mail\OrisonContactMailable;
use App\Models\Resena;
use App\Models\Correo;

class SendCheckoutEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-emails';

    /**
     * The console command description.
     *
     * @var string
     */
      protected $description = 'Comando que Envia correos a los clientes tomando en cuenta la fecha de salida';

    /**
     * Execute the console command.
     */
    public function handle()
    {
     $Resenas = Resena::whereDate('fecha',now())->with('UsuariosClientes')->get();

     foreach ($Resenas as $Resena)
     {
       $nombre=$Resena->UsuariosClientes->nombre_completo;
       $idEmpresa=$Resena->UsuariosClientes->id_empresa;
         $correo=$Resena->UsuariosClientes->email;
       $currentCorreos = Correo::where('id_empresa',$idEmpresa)->get();

       foreach($currentCorreos as $currentCorreo){
      if($correo  ){
        try{
            Mail::to($Resena->UsuariosClientes->email)->send(new OrisonContactMailable(
               $Resena->UsuariosClientes->nombre_completo,
               $currentCorreo->titulo,
               $currentCorreo->cuerpo,
               $URLS = 'https://www.orison.com.mx/',
               'logo',
               [], //Redes sociales es un Array
               $currentCorreo->asunto
           ));
          }catch(\Exception $e){
              dd($e);
          }
      }

    }

     }
    }
}
