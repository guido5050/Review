<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <main>
        <table>
            <thead>
                <tr>
                    <th>ID Reserva</th>
                    <th>ref cuenta</th>
                    <th>Fecha</th>
                    <th>fecha salida</th>
                    <th>Generar link</th>
                    <th>Enviar Correo</th>
                    <th>Programado</th>
                    <!-- Agrega aquí los demás campos que quieras mostrar -->
                </tr>
            </thead>
            <tbody>
                @foreach ($reservas as $reserva)
                    <tr>
                        <td>{{ $reserva['id_reservas'] }}</td>
                        <td>{{ $reserva['ref_id_cuenta'] }}</td>
                        <td>{{ $reserva['fecha'] }}</td>
                        <td>{{ $reserva['fecha_out_prev'] }}</td>
                        <td>
                            <a class="pointer-events-none"
                                href="{{ url('Mailable/Reservas/' . $reserva['id_reservas']) }}">Generar-link</a>
                        </td>
                        <th>
                            <a href="{{ route('enviarEmail', ['idreserva' => $reserva['id_reservas']]) }}">Enviar
                                Correo</a>
                        </th>
                        <th>
                            <a href="{{ route('programado') }}">Programado</a>
                        </th>
                        <!-- Agrega aquí los demás campos que quieras mostrar -->
                    </tr>
                @endforeach
            </tbody>
        </table>
    </main>
</body>

</html>
