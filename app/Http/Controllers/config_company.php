<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use DB;
use Response;
use Inertia\Inertia;
use App\Models\parametro;
use Illuminate\Support\Facades\Storage;
use App\Models\usuarios_empleado;
class config_company extends Controller {

public function datos_empresas(){
    $datos = DB::table('parametros')->where('id', 1)->get();
    return Response::json($datos);

}

	public function show_main_view()
	{
        $empresa = session('empresa');

		$config_current = \App\Models\parametro::where('id','=',$empresa)->first();
        $redes_sociales = \App\Models\RedesSociales::where('id_empresa','=',$empresa)->get();
       // dd($redes_sociales->toArray());
		// return view('config_company')->with('config',$config_current);
        return inertia::render('panel/Parametros_de_Empresa', ['config' => $config_current, 'redes_sociales' => $redes_sociales]);
           // dd($config_current->toArray());
	}




    /**
     * TODO: Metodo que actualiza la información de la empresa
     */
/**
 * Store the company data in the database and handle the logo upload.
 *
 * @param  \Illuminate\Http\Request  $data
 * @return \Illuminate\Http\RedirectResponse
 */
public function store_data(Request $data)
{
    //dd("entro------");
    // Get the company id from the session
    //dd($data->toArray());
    // $redes_sociales = json_decode($data->redes_sociales, true);
    // dd($redes_sociales);

    $id = session('empresa');

    //Datos de redes sociales
    $redes_sociales = [
        'facebook' => $data->facebook,
        'instagram' => $data->instagram,
        'web' => $data->web
    ];

    // dd($redes_sociales);

    $currenEmpresa =  \App\Models\RedesSociales::where('id_empresa',$id)->get();

    foreach ($currenEmpresa as $redSocial) {
        // Verifica si la red social actual existe en el array $redes_sociales
        if (array_key_exists($redSocial->nombre_redsocial, $redes_sociales)) {
            // Actualiza el enlace de la red social en la base de datos
            $redSocial->enlace = $redes_sociales[$redSocial->nombre_redsocial];
            $redSocial->save();
        }
    }

    // Get the company
    $company = parametro::find($id);

    if ($data->has('logo') && $data->input('logo') !== "undefined") {
        $logoData = $data->input('logo');

        // Separa el "data:image/png;base64," de los datos de la imagen
        list($type, $logoData) = explode(';', $logoData);
        list(, $logoData)      = explode(',', $logoData);

        // Decodifica la cadena Base64
        $logoFile = base64_decode($logoData);

        // Obtiene la extensión de la imagen a partir del tipo
        list(, $extension) = explode('/', $type);
        $extension = $extension == 'jpeg' ? 'jpg' : $extension;

        // Si la compañía ya tiene un logo, lo elimina
        if ($company->ruta_logo) {
            Storage::disk('images')->delete(ltrim($company->ruta_logo, '/images/logos/'));
        }

        // Genera un nombre de archivo único
        $nombrearchivo = uniqid() . '.' . $extension;

        // Guarda el archivo en el disco
        Storage::disk('images')->put('' . $nombrearchivo, $logoFile);

        // Actualiza la ruta del logo en el request
        $data['ruta_logo'] = '/images/logos/' . $nombrearchivo;
    }

    // Convert the request to an array
    $data = $data->toArray();

    // Update the company data
    if (array_key_exists('ruta_logo', $data)) {
        session(['logo_ruta' => $data['ruta_logo']]);
    }
    session(['razon_social' => $data['razon_social']]);

    $company->update($data);

    // If the logo was not valid, add an error message to the session
    if (!array_key_exists('logo', $data)) {
        return redirect()->back()->withErrors(['logo' => 'El archivo de logo no es válido.']);
    }

    // Redirect back with a success message
    return redirect()->back()->withSuccess('Se Actualizó la Información De La Compañia Exitosamente');
}

    public function create_empresa(Request $request)
    {
        // Decodificar la imagen
        $imagen = $request->ruta_logo;
        $imagen = str_replace('data:image/jpeg;base64,', '', $imagen);
        $imagen = str_replace(' ', '+', $imagen);
        $imagenDecodificada = base64_decode($imagen);

        // Generar un nombre único para la imagen
        $nombreImagen = time() . '.png';

        // Guardar la imagen en el directorio 'public/images/logos'
        Storage::disk('images')->put('' . $nombreImagen, $imagenDecodificada);

        // Crear un nuevo array de datos con la ruta de la imagen
        $data = $request->all();
        $data['ruta_logo'] = '/images/logos/' . $nombreImagen;

        $redes_sociales = [
            'facebook' => $request->facebook,
            'instagram' => $request->instagram,
            'web' => $request->web
        ];

       // dd($redes_sociales);

        // Crear la empresa
        // Crear la empresa
        $empresa = parametro::create($data);

        // Obtener el ID de la empresa recién creada
        $id_empresa = $empresa->id;

        // Ahora puedes usar $id_empresa para crear las redes sociales
        foreach ($redes_sociales as $nombre => $enlace) {
            \App\Models\RedesSociales::create([
                'id_empresa' => $id_empresa,
                'nombre_redsocial' => $nombre,
                'enlace' => $enlace,
                'plantilla' => 0,
                // 'url_icono' => ... // Asegúrate de establecer esto si es necesario
            ]);
        }

        //Asignacion de roles y Accesos

        $admin =usuarios_empleado::where('nombre_completo','Admin')->first();

        $Accesos = \App\Models\Acceso::all();

        if($admin){

            $admin->parametros()->attach($id_empresa);

            foreach ($Accesos as $acceso) {

                $admin->accesos()->attach($acceso->id, ['id_parametro' => $id_empresa]);
            }

        }







        // Crear las redes sociales


        return redirect()->back()->withSuccess('Se Creó la Empresa Exitosamente');
    }



}
