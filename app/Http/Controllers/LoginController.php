<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class LoginController extends Controller
{
    //


    public function login(Request $request){

     $credenciales = $request->only('email','contrasena');

    //dd($credenciales);
    
      if(Auth::attempt($credenciales)){
            return redirect()->intended('login')->with('status', 'login');
      }else {


          return redirect('/');
      }


    }

    public function logout(){

    }
}
