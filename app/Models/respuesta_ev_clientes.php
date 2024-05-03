<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class respuesta_ev_clientes extends Model
{
    use HasFactory;
    protected $table = 'respuestas_ev_clientes';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id_evaluacion',
        'pregunta',
        'id_posiblesRespuestas',
        'nombre_respuesta',
         'id_preguntas',
         'puntuacion',
        ];

    public function preguntasEvaluacionesClientes(): BelongsTo
    {
        return $this->belongsTo(PreguntasEvaluacionesClientes::class, 'id_preguntas');
    }

}
