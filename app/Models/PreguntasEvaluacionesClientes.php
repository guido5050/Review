<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PreguntasEvaluacionesClientes extends Model
{

    use HasFactory;

    protected $table = 'preguntas_evaluaciones_clientes';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id_empresa',
        'titulo',
        'created_at',
        'updated_at',
    ];


 public function posiblesRespuestasEvaluacionesClientes(): HasMany
{
    return $this->hasMany(PosiblesRespuestasEvaluacionesClientes::class, 'id_preguntas_evaluacion');
}
}
