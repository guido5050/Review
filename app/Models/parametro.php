<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class parametro extends Model
{
    //protected $table = 'parametro';//
  	protected $primaryKey = 'id';
      protected $fillable = ['ruta_logo', 'correo', 'razon_social', 'ruc', 'telefono', 'direccion_local', 'item_source', 'moneda_item_source'];

}
