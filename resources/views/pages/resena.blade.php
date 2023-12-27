    @extends('app')

    @section('resena')
        <h1 class="text-[80px] text-center animate-fade-down">Bienvenido pagina de resena!(TEST) 😆</h1>
        <div class="p-6 animate-fade-down animate-duration-1000 animate-delay-[800ms] ">
            <table class="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Nombre completo
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Generar Reseña
                        </th>

                    </tr>
                </thead>
                <tbody>
                    @foreach ($data as $data)
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ $data ? $data->nombre : 'Usuario no disponible' }}
                            </th>
                            <td class="px-6 py-4">
                                {{ $data ? $data->email : 'Email no disponible aun' }}
                            </td>
                            <td class="px-6 py-4">
                                <a href="{{ route('save_resena', ['id' => $data->id_usuario]) }}"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Enviar
                                    Reseña
                                    📑</a>
                            </td>

                        </tr>
                    @endforeach




                    </tr>
                </tbody>
            </table>
        </div>
    @endsection
