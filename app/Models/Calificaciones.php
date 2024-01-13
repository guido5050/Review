<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calificaciones extends Model
{
    use HasFactory;

    protected $table = "calificaciones";

    protected $fillable =[
        "id_resena",
        "id_preguntas",
        "puntuacion",
    ];


}
