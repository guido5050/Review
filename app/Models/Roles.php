<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\usuarios_empleado;
use App\Models\Acceso;

class Roles extends Model
{
    use HasFactory;
    protected $table = 'roles';
    protected $primaryKey = 'id';
    protected $fillable = [
        'nombre',
        'descripcion',
    ];

    // public function usuarios_empleado()
    // {
    //     return $this->hasMany(usuarios_empleado::class, 'cargo');
    // }
    public function empleados(){
        return $this->belongsTomany(usuarios_empleado::class, 'empleados_roles', 'role_id', 'id_empleados');
     }
     
    public function accesos(){
        return $this->belongsToMany(Acceso::class, 'accesos_roles', 'id_rol', 'id_vista');
    }
}
