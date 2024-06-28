<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Roles;
use App\Models\parametro;
use App\Models\Acceso;

class usuarios_empleado extends Authenticatable
{
  use Notifiable;
  protected $table = 'usuarios_empleados';
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
    'activo',
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
    //Arregla la relacion que sea de uno a muchos
    //Un usuario puede tener un solo rol como máximo
    // public function roles()
    // {
    //     return $this->belongsToMany(Roles::class, 'empleados_roles', 'id_empleados', 'role_id');
    // }


    public function parametros()
    {
        return $this->belongsToMany(parametro::class, 'empleados_parametros', 'id_empleado', 'parametro_id');
    }
    
    public function accesos()
    {
        return $this->belongsToMany(Acceso::class, 'user_accesos', 'id_empleado', 'id_vista')
                    ->withPivot('id_parametro');
    }
}

