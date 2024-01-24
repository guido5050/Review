<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PanelController;
use App\Http\Controllers\logincontrollerumpleados;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/panela',[PanelController::class,'index'])->name('index')->middleware('auth:empleados');
Route::get('/panela/resenas',[PanelController::class,'User'])->name('User');//Lista de Usuarops
Route::get('/',[PanelController::class,'index'])->middleware('auth'); //Este metodo trae los usuarios_empleados
Route::post('/panela/update',[PanelController::class,'update'])->name('update');
Route::delete('/panela/{id_usuario}',[PanelController::class,'delete'])->name('delete')->middleware('auth:empleados');//Elimina usuarios







// Route::post('/test2',[PanelController::class,'test1'])->name('test1');//ruta test
 Route::get('encuesta',[UserController::class,'showStars'])->name('showStars');//Test









    Route::get('/login', [logincontrollerumpleados::class,'show'])->name('login');

	Route::post('/logine',[logincontrollerumpleados::class,'aut_user'])->name('in_log');

	Route::get('/logout',[logincontrollerumpleados::class,'logout'])->name('logout');

	Route::get('/register',[logincontrollerumpleados::class,'_register'])->name('register_show')->middleware('auth:empleados');

	Route::post('/register.store',[logincontrollerumpleados::class,'register'])->name('register');//Crea usuarios

    //Route::post('/register.update','logincontrollerumpleados@update')->name('update_register');



















Route::get('formulario',[PanelController::class,'Index']);
Route::get('generarResena',[PanelController::class,'generarResena'])->name('generarResena');


Route::post('/show',[UserController::class,'showpreguntas'])->name('show');


Route::post('StorePreguntas',[UserController::class,'StorePreguntas'])->name('StorePreguntas');
//Route::post('/',[UserController::class,'Preguntas'])->name('preguntas');
Route::post('storecomments',[UserController::class,'storecomments'])->name('storecomments');
//require __DIR__.'/auth.php';
