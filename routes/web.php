<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;

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

Route::get('/',[UserController::class,'showStars'])->name('showStars');
Route::post('/show',[UserController::class,'showpreguntas'])->name('show');
Route::post('store',[UserController::class,'StorePreguntas'])->name('store');
Route::get('/{id}',[UserController::class,'Preguntas'])->name('preguntas');

require __DIR__.'/auth.php';
