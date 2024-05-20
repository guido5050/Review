<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\usuarios_empleado;


class parametro extends Model
{
    //protected $table = 'parametro';//
  	protected $primaryKey = 'id';
      protected $fillable = ['ruta_logo', 'correo', 'razon_social', 'ruc', 'telefono', 'direccion_local', 'item_source', 'moneda_item_source'];

      public function usuarios() {
        return $this-> belongsToMany(usuarios_empleado::class,'empleados_parametros','parametro_id','id_empleado');
      }

}

