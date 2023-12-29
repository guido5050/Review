<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prespuesta extends Model
{
    use HasFactory;

    //Creamos la configuracion del modelo
    protected $table = 'posiblesrespuestas';
    protected $primary= 'id_posiblesRespuestas';


}
