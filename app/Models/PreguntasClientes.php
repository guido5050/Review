<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PreguntasClientes extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_preguntas',
        'puntuacion',
        'pregunta',
        'id_posiblesRespuestas',
        'NombrePregunta',
        // ... otros campos que puedas tener
    ];
        protected $table = 'preguntas_clientes';
        //protected $primarykey= 'id_preguntas';
        protected $primaryKey = 'id_pregunta_clientes';

}
