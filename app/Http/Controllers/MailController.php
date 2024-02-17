<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Correo;
class MailController extends Controller
{
    //
    public function mail_get(){
        $correo = Correo::all();
        return response()->json($correo);
    }

    public function get(){
        return view('Mail.Plantilla_orison');
    }

}
