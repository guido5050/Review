<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use DB;
use Response;
use Inertia\Inertia;
use App\Models\parametro;
use Illuminate\Support\Facades\Storage;

class config_company extends Controller {

public function datos_empresas(){
    $datos = DB::table('parametros')->where('id', 1)->get();
    return Response::json($datos);

}

	public function show_main_view()
	{
        $empresa = session('empresa');

		$config_current = \App\Models\parametro::where('id','=',$empresa)->first();
		// return view('config_company')->with('config',$config_current);
        return inertia::render('panel/Parametros_de_Empresa', ['config' => $config_current]);
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
    dd("entro------");
    // Get the company id from the session
    $id = session('empresa');

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
        dd($request->toArray());

        return redirect()->back()->withSuccess('Se Creó la Empresa Exitosamente');
    }



}
