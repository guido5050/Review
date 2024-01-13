<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Resena;

class PanelController extends Controller
{
    //
    public function index(){
      return view('home');
    }


    public function generarResena(Request $request){

        // dd($request->toArray());
        // $validator = Validator::make($request->all(), [
        //     'id_usuario' => 'required|date',
        //     'id_reserva' => 'required|date',
        // ]);
        // if ($validator->fails()) {
        //     return $redirect;
        // }

        $user =User::where('id_usuario', $request->id_usuario)->first();
        //dd($user->id_usuario, $request->id_reserva);
       // $id_reserva =(int)$request->id_reserva;

        $resenaData = [
        'id_reserva' => $request->id_reserva,
        'id_usuario' =>$user->id_usuario,
        'estado' => 0]; //Estado cero para no revisado.

        Resena::create($resenaData);

        return redirect()->route('showStars')->with('resenaData', $resenaData);






 }


}
