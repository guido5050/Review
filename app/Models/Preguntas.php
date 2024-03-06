<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\PreguntasClientes;
class Preguntas extends Model
{
    use HasFactory;

    protected $table = 'preguntas';
    protected $primaryKey = 'id_preguntas';

    // Aquí está la relación
    public function preguntasClientes()
    {
        return $this->hasMany(PreguntasClientes::class, 'id_preguntas');
    }
}
