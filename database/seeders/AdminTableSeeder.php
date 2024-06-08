<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\usuarios_empleado;
use App\Models\Roles;
use App\Models\parametro;

class AdminTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    //TODO: 3
    public function run(): void
    {
        $cargo = Roles::where('nombre','Admin')->first();
        $Accesos = $cargo->accesos()->get();
        $empresas = parametro::pluck('id')->toArray();

        if($cargo){
          $admin=usuarios_empleado::firstOrCreate([
                'nombre_completo' => 'Admin',
                'num_identificacion' => '1234567890',
                'num_telefono' => '1234567890',
                'email' => 'admin@admin.com',
                'cargo' => $cargo->id,
                'usuario' => 'admin@admin.com',
                'contrasena' => bcrypt('password'), // Asegúrate de encriptar la contraseña
                'cambiar_contraseña' => 0,
                'remitente_correo' => 0,
                'autoriza' => 1,
                'aprueba' => 1,
                'activo' => 1,
            ]);

            foreach ($empresas as $empresa) {
                 $admin->parametros()->syncWithoutDetaching($empresa);
                 foreach ($Accesos as $acceso) {
                    $admin->accesos()->attach($acceso->id, ['id_parametro' => $empresa]);
                 };
            }

            // foreach ($empresas as $empresa) {
            //     $admin->parametros()->syncWithoutDetaching($empresa);
            // }


        }
    }
}
