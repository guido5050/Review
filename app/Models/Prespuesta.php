<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Prespuesta extends Model
{
    use HasFactory;
    //Tabla que guarda las posibles respuestas a las preguntas
    protected $table = 'posiblesrespuestas';
    protected $primaryKey = 'id_posiblesRespuestas';

    protected $fillable = [
        // Add your fillable attributes here
        'id_preguntas',
        'titulo_respuesta',
        'puntuacion',
        'estado',
        'id_empresa',
     ];




    public function pregunta()
    {
        return $this->belongsTo(Preguntas::class, 'id_preguntas');
    }
}
