<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Correo extends Model
{
    use HasFactory;
    protected $table = 'correo';
    protected $primaryKey = 'id_correo';
    protected $fillable = ['titulo', 'cuerpo', 'asunto', 'nombre_plantilla', 'id_empresa'];

}
