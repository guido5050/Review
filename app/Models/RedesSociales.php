<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RedesSociales extends Model
{
    use HasFactory;
    protected $table = 'redes_sociales';
    protected $primaryKey = 'id_redsocial';
    protected $fillable = ['id_empresa','nombre_redsocial','enlace','url_icono', 'plantilla'];
}

