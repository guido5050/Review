<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\usuarios_empleado;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

use App\Mail\PasswordChangedMailable;

class PasswordChangedController extends Controller
{
    //
    public function passwordchanged(Request $request){
       // dd($request->toArray());
        $userId = $request->get('userId');
        $password = $request->password;
        $user = $request->user;
        $UserData = usuarios_empleado::find($userId);
        $UserData->contrasena = Hash::make($request->password);
        $UserData->save();

        Mail::to($UserData->email)->send(new PasswordChangedMailable($user,$password));
    }
}
