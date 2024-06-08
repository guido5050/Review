<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Roles;
use App\Models\Acceso;
use Illuminate\Support\Facades\DB;

class RoleAdminTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

public function run(): void
{
    //TODO:2
    DB::transaction(function () {
        $rol = Roles::firstOrCreate([
            'nombre' => 'Admin',
            'descripcion' => 'Administrador del sistema',
        ]);

        $accesos = Acceso::all();

        foreach ($accesos as $acceso) {
            $rol->accesos()->syncWithoutDetaching($acceso->id);
        }
    });
}

}
