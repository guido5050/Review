<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class usuarios_empleado extends Authenticatable
{
  use Notifiable;
  protected $guard = 'empleados';
  protected $primaryKey = 'id_empleados';
  protected $fillable = [
    'id_empleados',
    'nombre_completo',
    'num_identificacion',
    'num_telefono',
    'email',
    'cargo',
    'usuario',
    'contrasena',
    'cambiar_contraseña',
    'remitente_correo',
    'autoriza',
    'aprueba',
    'activo'
  ];
  protected $hidden = [
        'contrasena', 'remember_token',
    ];
  public function getAuthPassword() {
    return $this->contrasena;
  }
  public function evaluaciones_clientes(): HasMany
  {
    return $this->hasMany(EvaluacionesClientes::class, 'id_moderador', 'id_empleado');
  }

    public function resenasAprobadas(): HasMany
    {
        return $this->hasMany(Resena::class, 'id_moderador', 'id_empleado');
    }
}

