<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Review;
use App\Models\Resena;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //Mostrar vista de review
        $data =User::all();

        //dd($data);

       return view('pages.resena', compact('data'));

    }

    public function saveresena(int $id){

       $user =  User::where('id_usuario', $id)
       ->first();
       //dd($data);

       $resenaData =['id_usuario' =>$user->id_usuario,];
       //dd($resenaData);
       Resena::create($resenaData);

       //Aqui solo faltaria programae lo de generar el link 

       return back(); //



    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    //mostrando datos de resena
    public function showresena(){ //Metodo de prueba para debuguear cualquier cosa..
       //$data = Resena::all();

       //$data =Resena::with('User')->get();
       //dd($data);



       return redirect()->route('resena');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //Validate

        //dd($request->only('nombre','email'));

        $data = $request->validate([
        'nombre' => 'required',
         'email' => 'required',
       ]);
        //Insert Method...
       $user= User::Create($data);



        return redirect()->route('resena');
    }


    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
