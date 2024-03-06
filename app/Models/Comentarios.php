<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comentarios extends Model
{
    use HasFactory;
    protected $table = 'comentarios';
    protected $primaryKey = 'id_comentario';
    protected $fillable = ['id_comentario','id_resena','id_empleados','id_preguntas','comentario','Nombre_Admin','fecha','created_at','updated_at'];
}
