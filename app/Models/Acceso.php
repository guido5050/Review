<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\usuarios_empleado;
use App\Models\Roles;
class Acceso extends Model
{
    use HasFactory;
    protected $table = 'accesos';
    protected $primaryKey = 'id';

    public function usuariosEmpleados()
    {
        return $this->belongsToMany(usuarios_empleado::class, 'user_accesos', 'id_vista', 'id_empleado')
                    ->withPivot('id_parametro');
    }

    public function roles()
    {
        return $this->belongsToMany(Roles::class, 'accesos_roles', 'id_vista', 'id_rol');
    }

}
