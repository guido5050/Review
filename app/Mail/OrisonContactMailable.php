<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrisonContactMailable extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    // En OrisonContactMailable.php

    public $nombre;
    public $url;
    public $titulo;
    public $cuerpo;
    public $logo;
    public $data;
    public $asunto;

    public function __construct($nombre, $url, $titulo, $cuerpo, $logo, array $data, $asunto)
    {
        //dd($nombre, $url, $titulo, $cuerpo, $logo);

        $this->nombre = $nombre;
        $this->url = $url;
        $this->titulo = $titulo;
        $this->cuerpo = $cuerpo;
        $this->logo = $logo;
        $this->data = $data;
        $this->asunto = $asunto;
    }

    /**
     * Get the message envelope.
     */
    /**
     * TODO:Configuracion del Correo
     * subject: Asunto del correo
     * om: Origen del correo
     *
     */
    public function envelope(): Envelope
    {
        //var_dump($this->asunto); // Agrega esta línea

       $email = session('email_empresa'); // Asegúrate de que 'email_empresa' es la clave correcta para el correo electrónico de la empresa en tu sesión

    return new Envelope(
        from: New Address($email, session('razon_social')), // Utiliza el correo electrónico de la empresa
        subject: $this->asunto, //Asunto dinamico
    );
    }

    /**
     * Get the message content definition.
     */
    /**
     * TODO:Configuracion de la plantilla del correo
     * la funcion content() retorna la vista
     * que se va a enviar
     */
    public function build()
    {
       // dd($this->nombre, $this->url, $this->titulo, $this->cuerpo, $this->logo);

        $empresa = session('empresa');

        $view = 'Mail.Plantilla_Orison';
        return $this->view($view)
                    ->with([
                        'nombre' => $this->nombre,
                        'url' => $this->url,
                        'titulo' => $this->titulo,
                        'cuerpo' => $this->cuerpo,
                        'logo' => $this->logo,
                        'redesSociales' => $this->data, // Cambia 'data' a 'redesSociales'
                    ]);
    }
    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
