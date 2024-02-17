<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Correo extends Model
{
    use HasFactory;
    protected $table = 'correo';
    protected $primaryKey = 'id_correo';
    protected $fillable = [
        'id_empresa',
        'nombre_plantilla',
        'titulo',
        'cuerpo'
    ];
}
