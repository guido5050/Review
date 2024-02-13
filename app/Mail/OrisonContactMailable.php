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

    public function __construct($nombre, $url)
    {
        $this->nombre = $nombre;
        $this->url = $url;

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

       $email = session('email_empresa'); // Asegúrate de que 'email_empresa' es la clave correcta para el correo electrónico de la empresa en tu sesión

    return new Envelope(
        from: New Address($email, session('razon_social')), // Utiliza el correo electrónico de la empresa
        subject: 'Dejanos tu Evaluacion ⭐⭐⭐⭐⭐ 📑',
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
        $empresa = session('empresa');

        // if ($empresa == 1) {
        //     $view = 'Mail.Plantilla_Orison';
        // } else if ($empresa == 2) {
        //     $view = 'Mail.Plantilla_Creating';
        // }
        $view = 'Mail.Plantilla_Orison';
        return $this->view($view)
                    ->with([
                        'nombre' => $this->nombre,
                        'url' => $this->url
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
