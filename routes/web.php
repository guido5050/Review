<?php
use App\Models\User;
use Illuminate\Support\Facades\Route;
use  App\Http\Controllers\LoginController;
use App\Http\Controllers\Auth\AuthController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//dd(User::first()->toArray());

Route::get('/', function () {
    return view('welcome');
});

Route::view('login','login')->name('login');

//Rutas para Login
//Route::POST('login',[LoginController::class, 'login'])->name('login');
//Route::POST('logout',[LoginController::class, 'logout'])->name('logout');

//Auth

Route::prefix('auth')->group(function(){

//Auth Register
Route::get('register',[AuthController::class, 'register'])->name('LoginAuth');
Route::post('register',[AuthController::class, 'loginverify'])->name('loginverify');

});

//Protegidas
Route::middleware('auth')->group(function(){
 Route::get('dashboard',function(){
  return 'Estas logueado :V';
 });
});
