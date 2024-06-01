<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Acceso;

class AccesosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        /**
         * Aqui se hace un truncate de la tabla accesos para resetear la tabla
         */

        Acceso::truncate(); 

        $nombres_vistas = [
            'Evaluaciones a Empresa',
            'Evaluaciones a Clientes',
            'Lista de Clientes',
            'configuracion de empresas',
        ];

        foreach ($nombres_vistas as $nombre_vista) {
            Acceso::create([
                'nombre_vista' => $nombre_vista,
            ]);
        }
    }
}
