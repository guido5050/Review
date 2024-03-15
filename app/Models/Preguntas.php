<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Preguntas extends Model
{
    use HasFactory;

    protected $table = 'preguntas';
    protected $primaryKey = 'id_preguntas';

    protected $fillable = [
        'titulo',
        'id_empresa',
    ];

    public function preguntasClientes()
    {
        return $this->hasMany(PreguntasClientes::class, 'id_preguntas');
    }

    public function posiblesRespuestas()
    {
        return $this->hasMany(Prespuesta::class, 'id_preguntas');
    }
}
