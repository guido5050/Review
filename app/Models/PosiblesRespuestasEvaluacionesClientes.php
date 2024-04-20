<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class PosiblesRespuestasEvaluacionesClientes extends Model
{
    use HasFactory;
    protected $table = 'posiblesrespuestas_evaluaciones_clientes';
    protected $primaryKey = 'id';


 public function preguntasEvaluacionesClientes(): BelongsTo
{
    return $this->belongsTo(PreguntasEvaluacionesClientes::class,'id_preguntas_evaluacion');
}
}
