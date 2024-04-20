<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\UsuariosClientes;
use App\Models\Usuarios_empleado;

class Resena extends Model
{
    use HasFactory;

    protected $table = "resenas";
    protected $primaryKey = 'id_resena';  //Nombre de la tabla en la Base de Dattos
    //Haciendo la relacion
   protected $fillable =  [
    'id_empresa',
    'id_resena',
    'id_reserva',
    'id_usuario',
    'comentario',
    'id_moderador',
    'fecha',
    'estado',
    'publicado',
    'Puntuacion_global',
   ];
/**
 * Para hacer las relaciones en laravel cuando se usa el metodo convencional(explicado en la documentacion) no
 * se espesifican las llaves id de las tablas en este caso si... puesto que las tablas no han sido creadas por migraciones
 * por ejemplo si usaramos la tipica de tabla de larvel User y siguiendo la nomenclatura de laravel el entenderia que el id de la tabla user es 'id'
 *
 *`'id_usuario'`  : Especifica que la clave foránea en la tabla `resenas` es `id_usuario`.
 * `'id_cliente'` : Indica que la clave primaria en la tabla `usuarios` es también `id_usuario`.
 */

 //Aqui hacemos el motodo de user usando el tipado decimos que devuelve BelongTo
 //Estamos en el modelo Resena hacemos la relacion que tiene la tabla resenas con usuarios es decir una resena pertenece a un usuario
 public function UsuariosClientes(): BelongsTo
 {
     return $this->belongsTo(UsuariosClientes::class, 'id_usuario', 'id_cliente');
 }

 public function UsuarioModerador(): BelongsTo
 {
     return $this->belongsTo(Usuarios_empleado::class, 'id_moderador', 'id_empleados');
 }
}
