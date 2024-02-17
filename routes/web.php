<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PanelController;
use App\Http\Controllers\config_company;
use App\Http\Controllers\logincontrollerumpleados;
use App\Http\Controllers\MailController;

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
Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');
//Route::get('/datos_empresas',[config_company::class,'datos_empresas'])->middleware('auth:empleados');

//Route::get('/roles',[PanelController::class,'roles'])->middleware('auth:empleados');

//Route::get('/panela',[PanelController::class,'index'])->name('index')->middleware('auth:empleados');
Route::get('/',[PanelController::class,'resenas'])->middleware('auth');
Route::get('/panela/clientes',[PanelController::class,'clientes'])->name('clientes')->middleware('auth:empleados'); //Mostrar clientes
Route::get('/panela/usuarios',[PanelController::class,'usuarios'])->name('usuarios')->middleware('auth:empleados');//Mostrar Usuarios
Route::get('/panela/resenas',[PanelController::class,'resenas'])->name('resenas');//Lista de Usuarops

Route::post('/panela/usuarios/update',[PanelController::class,'update'])->name('update');
Route::post('/panela/usuarios/roles/create',[PanelController::class,'create_roles'])->name('update_roles')->middleware('auth:empleados');
Route::post('/panela/usuarios/roles/update',[PanelController::class,'update_roles'])->name('update_roles')->middleware('auth:empleados');
Route::delete('/panela/usuarios/{id_usuario}',[PanelController::class,'delete'])->name('delete')->middleware('auth:empleados');//Elimina usuarios




//Mail
Route::middleware('auth')->group(function () {
    Route::get('/panela/mail/{clienteId}', [PanelController::class, 'mail'])->name('mail');
    //Route::get('/panela/mail', [PanelController::class, 'mail_get'])->name('mail');
    Route::get('/preview.email/mail/{clienteId}', [PanelController::class, 'previewEmail_jsx'])->name('preview-email');
    //Route::get('/preview.email',[PanelController::class,'previewEmail_jsx'])->name('preview-email-jsx');
});


//empresa
Route::get('/panela/empresa',[config_company::class,'show_main_view'])->name('empresa')->middleware('auth:empleados');
Route::post('/panela/empresa_actualizar',[config_company::class,'store_data'])->name('store_data')->middleware('auth:empleados');

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
