<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Prespuesta extends Model
{
    use HasFactory;

    //Creamos la configuracion del modelo
    protected $table = 'posiblesrespuestas';
    protected $primary= 'id_posiblesRespuestas';

    public function pregunta()
    {
        return $this->belongsTo(Preguntas::class, 'id_preguntas');
    }


}
