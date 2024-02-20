<!DOCTYPE html>
<html>

<head>
    <title>Evaluación del Hotel</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Dosis:wght@200..800&display=swap" rel="stylesheet">
    <style>
        /* ... tus otros estilos ... */
        body {
            font-family: 'Dosis', sans-serif;
            background-color: #f2f2f2;
            margin: 0 auto;
        }

        .text_content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            column-gap: 10px;
        }

        .main_content {
            width: 350px;
            text-align: center;
            border: #f2f2f2 1px solid;
        }

        .image-container img {
            margin: auto;
            display: block;
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            color: #fff;
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            text-align: center;
            transition: background-color 0.3s ease;
        }

        a {
            text-decoration: none;
            color: #fff;
        }

        h1 {
            font-size: 1.5em;

        }

        .button:hover {
            background-color: #0056b3;
        }

        .estrella {
            font-size: 2em;
        }
    </style>
</head>

<body>
    <table width="100%" height="100%" style="display: table; table-layout: fixed;">
        <tr>
            <td align="center" style="vertical-align: middle;">
                <table class="main_content">
                    <tr>
                        <td align="center">
                            <div class="image-container">
                                <img src="{{ asset($logo) }}" alt="Logo de la empresa" width="80px" height="80px">
                            </div>
                            <h1>{{ $titulo }} 😆</h1>
                            <h1 class="estrella">&#9733;&#9733;&#9733;&#9734;&#9734;</h1>
                            <h2>Estimado(a) {{ $nombre }}</h2>
                            <p>{{ $cuerpo }}</p>
                            <a href="{{ asset($url) }}" class="button">Empieza Aqui</a>

                        </td>
                    </tr>
                </table>
                <table width="100%" style="background-color: #333; color: #fff; text-align: center; padding: 20px;">
                    <tr>
                        <td>
                            <p>Síguenos en nuestras redes sociales:</p>
                            @foreach ($redesSociales as $redSocial)
                                <a href="{{ $redSocial['enlace'] }}"
                                    style="margin: 0 10px; color: #fff;">{{ $redSocial['nombre_redsocial'] }}</a>
                            @endforeach
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
