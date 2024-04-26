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
use App\Http\Controllers\Evaluaciones_Clientes;

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
Route::post('/panela/clientes/crear',[PanelController::class,'create_clientes'])->name('create_clientes')->middleware('auth:empleados'); //TODO Crear clientes
Route::get('/panela/clientes/search',[PanelController::class,'clientes_search'])->name('search')->middleware('auth:empleados'); //TODO:Busqueda de clientes
Route::get('/panela/usuarios',[PanelController::class,'usuarios'])->name('usuarios')->middleware('auth:empleados');//Mostrar Usuarios
Route::get('/panela/resenas',[PanelController::class,'resenas'])->name('resenas');//Lista de Usuarops


//TODO: Vista de Encuesta
Route::group(['middleware' => 'auth:empleados'], function () {
    Route::get('/panela/encuesta/', [PanelController::class, 'encuesta'])->name('encuesta'); // Encuesta
    Route::post('/panela/encuesta/{idposiblerespuesta}/{estado}', [PanelController::class, 'Estado_preguntas'])->name('estado.preguntas'); // TODO: Estado de preguntas
    Route::post('/panela/encuesta/crear', [PanelController::class, 'crear_posiblerazon'])->name('crear_preguntas'); // TODO: Crear Posible Razon
    Route::post('/panela/encuesta/pregunta', [PanelController::class, 'crear_pregunta'])->name('crear.pregunta'); // TODO: Crear Respuesta
});


//TODO:Rutas de Encuesta a Clientes
Route::group([ 'middleware' => 'auth:empleados'], function () {
  Route::get('/panela/encuestaclientes/', [PanelController::class, 'encuesta_clientes'])->name('encuesta.clientes'); // Vista de Encuesta Clientes
  Route::post('/panela/encuestaclientes/save', [PanelController::class, 'crearpreguntaCliente'])->name('encuesta.clientes.save'); //save
  Route::post('/panela/encuestaclientes/crearrazon', [PanelController::class, 'crear_posiblerazon_cliente'])->name('crear_preguntas.clientes'); // TODO: Crear Posible Razon
  Route::post('/panela/encuestaclientes/{idposiblerespuesta}/{estado}', [PanelController::class, 'estado_pregunta_cliente'])->name('estado.pregunta.clientes'); // TODO:estado de pregunta
});



Route::prefix('panela/resenas/')->group(function () {
    Route::get('{userClienteId}/{Idresena}', [PanelController::class,'gestionar']);
    Route::post('comentario', [PanelController::class,'comentarios_admin']); //ComentariosGuardados por el admin de resenas
    Route::post('publicar', [PanelController::class,'publicar_resena'])->name('publicar.resena'); //Publicar resena
});


Route::post('/panela/usuarios/update',[PanelController::class,'update'])->name('update');
Route::post('/panela/usuarios/roles/create',[PanelController::class,'create_roles'])->name('create_role')->middleware('auth:empleados');
Route::post('/panela/usuarios/roles/update',[PanelController::class,'update_roles'])->name('update_roles')->middleware('auth:empleados');
Route::delete('/panela/usuarios/{id_usuario}',[PanelController::class,'delete'])->name('delete')->middleware('auth:empleados');//Elimina usuarios

//TODO:Rutas de Evaluaciones_a?clientes(estrellas)
Route::middleware('auth:empleados')->group(function () {
    Route::get('/panela/evaluaciones_clientes/show', [Evaluaciones_Clientes::class, 'Evaluacion_clientes'])->name('evaluacion.clientes');//vista de la tabla
    Route::get('/panela/evaluaciones_clientes/{id}', [Evaluaciones_Clientes::class, 'Evaluacion_clientes_show'])->name('evaluacion.clientes.id');
    //estrellas
    Route::post('/panela/estrellasCliente/', [Evaluaciones_Clientes::class, 'showposiblesrespuestas'])->name('showposiblesrespuestas');
    Route::post('/panela/estrellasCliente/save',[Evaluaciones_Clientes::class,'saveposiblesrespuestas'])->name('saveposiblesrespuestas');
});







//TODO:Mail(Rutas de Email)
Route::middleware('auth:empleados')->group(function () {
    Route::get('/panela/mail/{clienteId}/{plantilla}', [PanelController::class, 'mail'])->name('mail');
    Route::get('/preview.email/mail/{clienteId}/{plantilla}', [PanelController::class, 'previewEmail_jsx'])->name('preview-email');
    Route::get('/panela/datos',[PanelController::class,'datos'])->name('datos');
    Route::get('/panela/config.mail',[PanelController::class,'configmail'])->name('config.mail');
    Route::post('/panela/config.mail/update',[PanelController::class,'update_mail'])->name('update_mail');
    Route::post('/panela/config.mail/create',[PanelController::class,'create_mail'])->name('create_mail');

});


// TODO:empresa____
Route::middleware('auth:empleados')->group(function () {
    Route::get('/panela/empresa', [config_company::class, 'show_main_view'])->name('empresa'); //Mostrar empresa(view)
    Route::post('/panela/empresa_actualizar', [config_company::class, 'store_data'])->name('store_data'); //Actualizar empresa
    Route::post('/panela/empresa/crear',[config_company::class, 'create_empresa'])->name('create_empresa'); //Crear empresa
});

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


Route::post('/show',[UserController::class,'showpreguntas'])->name('show'); //TODO:Mostrar preguntas(REVISAR)


Route::post('StorePreguntas',[UserController::class,'StorePreguntas'])->name('StorePreguntas');
//Route::post('/',[UserController::class,'Preguntas'])->name('preguntas');
Route::post('storecomments',[UserController::class,'storecomments'])->name('storecomments');
//require __DIR__.'/auth.php';
