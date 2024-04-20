<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalificacionesEva_clientes extends Model
{
    use HasFactory;

   // public $timestamps = false;


    protected $table = 'calificaciones_evaluaciones_clientes';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id_evaluacion',
        'id_pregunta_ev',
        'puntuacion',
        'id_empresa',
    ];
}
