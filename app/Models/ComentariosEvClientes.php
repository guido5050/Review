<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComentariosEvClientes extends Model
{
    use HasFactory;
    protected $table = 'comentarios_ev_clientes';
    protected $primaryKey = 'id';
    protected $fillable = [
        'comentario',
        'id_empleados',
        'Nombre_Admin',
        'id_evaluacion',
        'id_preguntas',
        'fecha',
     ];
}
