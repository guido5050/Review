<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\respuestas_ev_clientes;

class PreguntasClientes extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_preguntas',
        'id_resena',
        'pregunta',
        'id_posiblesRespuestas',
        'NombreRespuesta',
        'puntuacion',
        // ... otros campos que puedas tener
    ];
        protected $table = 'preguntas_clientes';
        //protected $primarykey= 'id_preguntas';
        protected $primaryKey = 'id_pregunta_clientes';

          // Aquí está la relación
    public function pregunta()
    {
        return $this->belongsTo(Preguntas::class, 'id_preguntas');
    }
    
    public function respuestaEvClientes(): HasMany
    {
        return $this->hasMany(respuestas_ev_clientes::class, 'id_preguntas');
    }

}
