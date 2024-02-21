<!DOCTYPE html>
<html>

<head>
    <title>Evaluación del Hotel</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Dosis:wght@200..800&display=swap" rel="stylesheet">
</head>

<body style="font-family: 'Dosis', sans-serif; background-color: #f2f2f2; margin: 0 auto;">
    <table width="100%" height="100%" style="display: table; table-layout: fixed;">
        <tr>
            <td align="center" style="vertical-align: middle; padding: 12px;">
                <table style="width: 350px; text-align: center; margin-bottom: 20px;">
                    <tr>
                        <td align="center">
                            <div style="margin: auto; display: block;">
                                <img src="{{ asset($logo) }}" alt="Logo de la empresa" width="80px" height="80px">
                            </div>
                            <h1 style="font-size: 1em;">{{ $titulo }} 😆</h1>
                            <h1 style="font-size: 3em;">&#9733;&#9733;&#9733;&#9734;&#9734;</h1>
                            <h2 style="font-size: 1em;">Estimado(a) {{ $nombre }}</h2>
                            <p style="font-size: 1em;  margin-bottom: 20px;">{{ $cuerpo }}</p>
                            <a href="{{ asset($url) }}"
                                style="margin-top: 20px;  text-align: center;
                                border-radius: 5px;
                                color: #ffffff; text-decoration: none;  background-color: #eb1a1a; padding: 10px 50px;
                                ">GO</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
                <table width="100%" style="background-color: #333; color: #fff; text-align: center; padding: 20px;">
                    <tr>
                        <td>
                            <p>Síguenos en nuestras redes sociales:</p>
                            @foreach ($redesSociales as $redSocial)
                                <a href="{{ isset($redSocial['enlace']) ? $redSocial['enlace'] : 'enlace_por_defecto' }}"
                                    style="margin: 0 10px; color: #fff;">{{ isset($redSocial['nombre_redsocial']) ? $redSocial['nombre_redsocial'] : 'nombre_redsocial_por_defecto' }}</a>
                            @endforeach
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
