<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
    Inertia::share([
     'empresa_global' => function () {
        return session('empresa');
     },
    'logo' => function () {
        return session('logo_ruta');
    },
    'razon_social' => function () {
        return session('razon_social');
    },
    'AppName' => function () {
        return config('app.name');
    },
    'empresas' => function() {
        return session('empresas');
    }
]);
    }
}
