<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Resena;
use App\Models\CuentasClientesEncabezados;

class ReservasEncabezado extends Model
{
    use HasFactory;
    protected $table = 'reservas_encabezado';
    protected $primaryKey = 'id_reservas';

    protected $fillable = [
       'evaluacion',
    ];

    public function cuentasclientes(){


        return $this->hasOne(CuentasClientesEncabezados::class,'id_cuentas', 'ref_id_cuenta');

        //'ref_id_cuenta es la llave foreanea dentro de este modelo de las reservas'\
        /**
         * El segundo argumento siempre es la llave foranea dentro
         * del modelo donde construimos la relacion de hasOne
         *
         * 'id_cuentas' es la llave primaria de la tabla 'cuentas_clientes_encabezados'
         * que sera siempre el primer argumento es decir el primer argumento es la llave primaria
         * del modelo que estamos instanciando en la relacion que en este caso es:
         *  'CuentasClientesEncabezados::class'
         * estos dos argumentos son opcionales si en las tablas las llaves primarias en todas las
         * tablas se llamaran simplemente id
         */
    }

}
