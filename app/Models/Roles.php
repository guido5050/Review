<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\usuarios_empleado;

class Roles extends Model
{
    use HasFactory;
    protected $table = 'roles';
    protected $primaryKey = 'id_roles';
    protected $fillable = [
        'nombre',
        'descripcion',
    ];

    // public function usuarios_empleado()
    // {
    //     return $this->hasMany(usuarios_empleado::class, 'cargo');
    // }
}
