<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Resena;

class UsuariosClientes extends Model
{
    use HasFactory;
    protected $table = 'usuarios_clientes';
    //protected $primarykey= 'id_preguntas';
    protected $primaryKey = 'id_cliente';


    public function Resena(): HasMany
    {
        return $this->hasMany(Resena::class, 'id_usuario', 'id_cliente');
     }
}


