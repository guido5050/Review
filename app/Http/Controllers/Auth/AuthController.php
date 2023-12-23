<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    //

    public function register()
    {
        return view('auth.login');
    }
    public function loginverify(Request $request)
    {


       // dd($request->only('email','contrasena'));

        $request->validate([
          'email'=> 'required',
          'contrasena' => 'required',

        ],[
          'email.required' => 'Email campo obligatiorio',
        'contrasena.required' => 'Password Requerido',
        ]);

        if(Auth::attempt(['email' => $request->email,'contrasena' => $request->contrasena])){
            return redirect()->route('welcome');
        }

        return back()->withErrors(['invalid_credentials' => 'error']);
    }
}
