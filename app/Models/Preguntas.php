<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preguntas extends Model
{
    use HasFactory;
        //Creamos la configuracion del modelo
        protected $table = 'preguntas';
        //protected $primarykey= 'id_preguntas';
        protected $primaryKey = 'id_preguntas';





}
