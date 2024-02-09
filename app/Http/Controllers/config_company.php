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
public function store_data(Request $data)
{

    if ($data->has('logo')) {
        $logoData = $data->input('logo');

        // Separa el "data:image/png;base64," de los datos de la imagen
        list($type, $logoData) = explode(';', $logoData);
        list(, $logoData)      = explode(',', $logoData);

        // Decodifica la cadena Base64
        $logoFile = base64_decode($logoData);

        // Obtiene la extensión de la imagen a partir del tipo
        list(, $extension) = explode('/', $type);
        $extension = $extension == 'jpeg' ? 'jpg' : $extension;

        // Genera un nombre de archivo único
        $nombrearchivo = uniqid() . '.' . $extension;

        // Guarda el archivo en el disco
        Storage::disk('images')->put('' . $nombrearchivo, $logoFile);

        // Actualiza la ruta del logo en el request
        $data['ruta_logo'] = '/images/logos/' . $nombrearchivo;
    }

    // ...
     else {
            // El archivo de logo no es válido
            // Realiza las acciones necesarias en caso de archivo inválido
            return redirect()->back()->withErrors(['logo' => 'El archivo de logo no es válido.']);
        }
      // Actualiza los datos en la base de datos
     // dd(session('empresa'));
      $id = session('empresa');
    //  dd($data);
    $data = $data->toArray();
    //dd($data);
     parametro::find($id)->update($data);

    return redirect()->back()->withSuccess('Se Actualizó la Información De La Compañia Exitosamente');
}//final del metodo





	public function actualizar_machote_cierre_turno(request $data)
	{

        $config_new = \App\parametro::find(1);

		$config_new->titulo_machote = $data['titulo_machote'];

		$config_new->cuerpo_machote = $data['cuerpo_machote'];

		$config_new->save();

		return redirect()->back()->withSuccess('Se Actualizaron los Datos!');
	}



}
