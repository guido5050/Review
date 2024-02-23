<!DOCTYPE html>
<html>

<head>
    <title>Evaluación del Hotel</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>

<body style="font-family: 'Dosis', sans-serif;  margin: 0 auto;">
    <table width="100%" height="100%" style="display: table; table-layout: fixed;  margin: 0; padding: ">
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
    <table style="width: 100%; margin: 0; padding: 0; background-color: #333; color: #fff; text-align: center;">
        <tr>
            <td style="padding: 50px; text-align: center;">
                @foreach ($redesSociales as $redSocial)
                    <table style="display: inline-table;">
                        <tr>
                            <td style="text-align: center;">
                                <a href="{{ isset($redSocial['enlace']) ? $redSocial['enlace'] : 'enlace_por_defecto' }}"
                                    style="margin: 0 10px; color: #fff; display: inline-block;">
                                    @if ($redSocial['nombre_redsocial'] == 'Facebook')
                                        <img src="{{ asset('images/SocialMedia/icons8-facebook-24.png') }}" alt="Facebook"
                                            width="24" height="24" style="max-width: 100%;">
                                    @elseif($redSocial['nombre_redsocial'] == 'Instagram')
                                        <img src="{{ asset('images/SocialMedia/icons8-instagram-50.png') }}" alt="Instagram"
                                            width="24" height="24" style="max-width: 100%;">
                                    @elseif($redSocial['nombre_redsocial'] == 'Pagina web')
                                        <img src="{{ asset('images/SocialMedia/icons8-website-64.png') }}" alt="Web"
                                            width="24" height="24" style="max-width: 100%;">
                                    @endif
                                </a>
                            </td>
                        </tr>
                    </table>
                @endforeach
            </td>
        </tr>
    </table>
    </td>
    </tr>
    </table>
</body>

</html>
