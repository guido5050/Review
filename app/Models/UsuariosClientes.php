<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Resena;

class UsuariosClientes extends Model
{
    use HasFactory;
    protected $table = 'usuarios_clientes';
    //protected $primarykey= 'id_preguntas';
    protected $primaryKey = 'id_cliente';

    protected $fillable = [
        'id_empresa',
        'nombre_completo',
        'nacionalidad',
        'ciudad',
        'email',
        'num_telefono1',
        'num_identificacion',
    ];

    public function Resena()
    {
        return $this->hasMany(Resena::class, 'id_usuario', 'id_cliente');
     }

     public function EvaluacionesClientes()
     {
         return $this->hasMany(EvaluacionesClientes::class, 'id_cliente', 'id_cliente');
     }
}


