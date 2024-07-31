<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Resena;

class ResenaApiController extends Controller
{
    //

    public function index(Request $request)
    {
        $empresa = $request->input('cp', 1); // El segundo parámetro es un valor predeterminado en caso de que 'cp' no esté presente en la URL

        return Resena::with(['UsuariosClientes' => function ($query) {
            $query->select('id_cliente', 'nombre_completo');
        }])->select(
        'id_resena',
        'id_usuario',
         'Puntuacion_global',
         'comentario',
         'fecha',
         'publicado')
         ->where('id_empresa', $empresa)
         ->where('publicado', 1)->get();
    }
}
