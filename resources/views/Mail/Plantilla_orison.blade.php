<!DOCTYPE html>
<html>

<head>
    <title>Evaluación del Hotel</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Dosis:wght@200..800&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: "Dosis", sans-serif;
            padding-left: 300px;
            padding-right: 300px;
            padding-top: 50px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
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

        @media only screen and (max-width: 600px) {
            body {
                padding: 50px;
                display: flex;
                flex: column;
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

        /* Media query for tablets */
        @media only screen and (min-width: 601px) and (max-width: 900px) {
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

        .estrella {
            font-size: 50px;

        }
    </style>
</head>

<body>
    <div class="">
        <img src="http://127.0.0.1:8000/images/orison.png" alt="Logo del Hotel" width="80px" height="80px">
    </div>
    <h1>Cuenta tu experencia 😆</h1>
    <h1 class="estrella">&#9733;&#9733;&#9733;&#9734;&#9734;</h1>

    <h2>Estimado(a) Pedrito</h2>

    <p>Gracias por hospedarse en nuestro hotel, esperamos que su estadia haya sido de su agrado.</p>

    <a href="{{ $url }}" class="survey-button">Empieza Aqui</a>
</body>

</html>
