<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;
use App\Models\Acceso;
use App\Models\usuarios_empleado;
use Illuminate\Support\Facades\DB;




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

        $empresa = session()->get('empresa');



        $empleado = usuarios_empleado::find($usuario_id);

        $accesos = $empleado->accesos;

        $EmpresasAs = $empleado->parametros;

      //  dd($EmpresasAs->toArray());

       // dd($accesos->toArray());
        // Filtrar los accesos por la empresa actual
        // $accesos = $empleado->accesos->filter(function ($acceso) use ($empresa) {
        //     return $acceso->pivot->id_parametro === $empresa;
        // });
       // dd($accesos->toArray());

        $asignaAccesos = Acceso::all();

        return Inertia::render('panel/Accesos', [

            'accesos' => $accesos,
            'empleado' => $empleado,
            'EmpleadoId' => $usuario_id,
            'asignaAccesos' => $asignaAccesos,
            'EmpleadoId' => $usuario_id,
            'EmpresasAs' => $EmpresasAs,

        ]);
    }

    public function asignar_accesos(Request $request, $usuario_id){

        //dd($request->toArray());
        $idAcceso = $request->get('idAcceso');
        $idEmpleado = $usuario_id; // Ahora obtenemos el id del empleado directamente de la ruta
        $Estadocheckbox = $request->get('Checked');
        $empresa = $request->get('empresa');

        //dd($idAcceso, $idEmpleado, $Estadocheckbox, $empresa);

        $empleado = usuarios_empleado::find($idEmpleado);

        if($Estadocheckbox == 'true'){
            $empleado->accesos()->attach($idAcceso, ['id_parametro' => $empresa]);
        }else{
            $empleado->accesos()->detach($idAcceso, ['id_parametro' =>$empresa]);
        }

    }

    public function asignar_empresa(Request $request, $usuario_id){
        // dd($request->toArray());
         $idEmpresa = $request->empresa;
        $empleado = usuarios_empleado::find($usuario_id);
        $empleado->parametros()->attach($idEmpresa);
        
        //dd($idEmpresa,  $usuario_id, $empleado->toArray());
    }


    public function eliminar_accesos(Request $request, $usuario_id){

      //dd($request->toArray());

        $checked = $request->get('Checked');
      //  dd($checked);
        $idEmpleado = $usuario_id; // Ahora obtenemos el id del empleado directamente de la ruta
        $empresa = $request->get('empresa');

        if($checked == false ){

            $empleado = usuarios_empleado::find($usuario_id);

            $accesosIds = $empleado->accesos()->where('id_parametro', $empresa)->pluck('id_vista')->toArray();

           //  dd($accesosIds);

             $empleado->accesos()->wherePivot('id_parametro', $empresa)->detach($accesosIds);

             $empleado->parametros()->detach($empresa);

             return back();


        }else{
            dd('trueee');
        }


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
