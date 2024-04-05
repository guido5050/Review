<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;


class Evaluaciones_Clientes extends Controller
{
    //
    public function Evaluacion_clientes(){
        return inertia::render('Evaluacionesclientes/EvaluacionesClientes');
    }
}
