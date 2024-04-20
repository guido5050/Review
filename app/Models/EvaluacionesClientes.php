<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EvaluacionesClientes extends Model
{
    use HasFactory;
    protected $table = 'evaluaciones_clientes';
    protected $primaryKey = 'id';
    protected $fillable = ['id_empresa', 'id_cliente', 'id_moderador', 'fecha','puntuacion_global', 'comentario'];

    public function UsuariosClientes()
    {
        return $this->belongsTo(UsuariosClientes::class, 'id_cliente', 'id_cliente');
    }

    public function usuarios_empleado()
    {
        return $this->belongsTo(usuarios_empleado::class, 'id_moderador', 'id_empleados');
    }


}

