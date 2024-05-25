<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;
use App\Models\Acceso;
use App\Models\usuarios_empleado;


class AccesoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($usuario_id)
    {
        /**
         * Metodo que se encarga de mostrar la vista de acceso
         * en la configuracion de la empresa
         */

        $empleado =usuarios_empleado::find($usuario_id);
        $Accesos = $empleado->accesos;

        return Inertia::render('panel/Accesos',
        [
            'accesos' => $Accesos,
            'empleado' => $empleado
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
