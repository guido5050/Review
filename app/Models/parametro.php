<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class parametro extends Model
{
    //protected $table = 'parametro';//
  	protected $primaryKey = 'id';
  	protected $fillable = [
      'id',
      'razon_social',
      'ruc',
      'ruta_logo',
      'direccion_local',
      'telefono',
      'correo',
      'fecha',
      'impuesto',
      'venta_dolar',
      'compra_dolar',
      'capacidad',
      'checkin',
      'checkout',
      'moneda_principal',
      'moneda_secundaria',
      'simbolo_m1',
      'simbolo_m2',
      'manual',
      'item_source',
      'almacen',
      'moneda_item_source',
      'titulo_machote',
      'cuerpo_machote',

  	];

}
