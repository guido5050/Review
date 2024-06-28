<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\parametro;
use App\Models\Correo;
use App\Models\usuarios_empleado;
use App\Models\Acceso;
use App\Models\Preguntas;
use App\Models\Prespuesta;
class OrisonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

      $orison =  parametro::create([
            'razon_social' => 'Orison ManaguaS4',
            'ruc'=> 'news@cratingexpress.com',
            'ruta_logo' => null,
            'direccion_local' => 'De Rotonda El Periodista, 3c al norte, 1c al este, 1/2c al norte Casa color beige con terraza, 12093',
            'telefono' => '123456789',
            'correo' => 'test@test.com',
            'facebook' => 'https://www.facebook.com/OrisonHostels',
            'instagram' => 'https://www.instagram.com/orison_hostels/',
            'web'=> 'https://es.orisonhostels.com/',
            'item_source' => 3,
            'moneda_item_source' => 1,
        ]);

        Correo::create([
            'nombre_plantilla' => 'Bienvenido a Orison',
            'titulo' => 'Bienvenido a Orison',
            'cuerpo' => 'Agradecemos sinceramente tu confianza en nosotros y
            estamos emocionados de
             tenerte como nuestro valioso cliente. Esperamos que disfrutes de las nuevas comodidades
              y mejoras en tu próxima estancia.
            Saludos cordiale.',
            'asunto' => 'Bienvenido a Orison',
            'id_empresa' => $orison->id,
        ]);

        $admin = usuarios_empleado::where('nombre_completo','Admin')->first();

        if($admin)
        {
            $admin->parametros()->attach($orison->id);
            $Accesos =Acceso::all();
            foreach($Accesos as $acceso)
            {
                $admin->accesos()->attach($acceso->id, ['id_parametro' => $orison->id]);
            }
        }
       $preguntas = [
            ['titulo' => '¿Que tal la Limpieza?'],
            ['titulo' => '¿Que te parecio la Ubicacion?'],
            ['titulo' => '¿Que tal el Precio?'],
            ['titulo' => '¿Como estuvo la Comunicacion?'],
            ['titulo' => '¿Que tal el Checkin?'],
        ];

        foreach($preguntas as $pregunta)
        {
         $preguntas =  Preguntas::create([
                'titulo' => $pregunta['titulo'],
                'id_empresa' => $orison->id,
            ]);

        }
    }

     }
