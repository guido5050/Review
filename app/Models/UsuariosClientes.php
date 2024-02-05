<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsuariosClientes extends Model
{
    use HasFactory;
    protected $table = 'usuarios_clientes';
    //protected $primarykey= 'id_preguntas';
    protected $primaryKey = 'id_cliente';
}
