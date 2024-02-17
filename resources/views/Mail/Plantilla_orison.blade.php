<!DOCTYPE html>
<html>

<head>
    <title>Evaluación del Hotel</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Dosis:wght@200..800&display=swap" rel="stylesheet">
    <style>
        .main_content {
            padding: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            column-gap: 12px;
            height: 100vh;
        }

        @media only screen and (max-width: 600px) {
            .main_content {
                padding: 20px;
            }

            body {
                padding: 50px;
                display: flex;
                flex-direction: column;
                column-gap: 12px;
            }

            h1 {
                font-size: 20px;
            }

            h2 {
                font-size: 15px;
            }

            .name {
                font-family: "Dosis", sans-serif;
                font-weight: 400;
            }
        }

        @media only screen and (min-width: 601px) and (max-width: 900px) {
            .main_content {
                column-gap: 20px;
            }

            body {
                padding-left: 100px;
                padding-right: 100px;
            }

            h1 {
                font-size: 30px;
            }

            h2 {
                font-size: 25px;
            }
        }

        .header {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
        }

        .survey-button {
            background-color: red;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
        }

        .estrella {
            font-size: 50px;
        }
    </style>
</head>

<body>
    <div class="main_content">
        <div class="">
            <img src="{{ asset($logo) }}" alt="Logo de la empresa" width="80px" height="80px">
        </div>
        <h1>{{ $titulo }} 😆</h1>
        <h1 class="estrella">&#9733;&#9733;&#9733;&#9734;&#9734;</h1>

        <h2>Estimado(a) {{ $nombre }}</h2>

        <p>{{ $cuerpo }}</p>


        <a href="{{ asset($url) }}" class="survey-button">Empieza Aqui</a>

    </div>

</body>

</html>
