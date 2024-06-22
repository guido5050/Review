<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\UsuariosClientes;

class CuentasClientesEncabezados extends Model
{
    use HasFactory;
    protected $table = 'cuentas_clientes_encabezado';
    protected $primaryKey = 'id_cuentas';

    protected $fillable = [
        'evaluacion',
    ];

    public function clientes(){

        return $this->hasOne(UsuariosClientes::class,'id_cliente','ref_id_cliente'); //Relacion de uno a uno
    }


}
