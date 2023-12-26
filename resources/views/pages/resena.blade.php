    @extends('app')

    @section('resena')
        <h1 class="text-[80px] text-center animate-fade-down">Bienvenido pagina de resena!(TEST) 😆</h1>
        <div class="relative overflow-x-auto animate-fade-down animate-duration-1000 animate-delay-[800ms] ">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Nombre completo
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Comentario(Resena)
                        </th>
                        <th scope="col" class="px-6 py-3">
                            fecha
                        </th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($data as $data)
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">



                            <th scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ $data->User ? $data->User->nombre : 'Usuario no disponible' }}
                            </th>
                            <td class="px-6 py-4">
                                {{ $data->User ? $data->User->email : 'Email no disponible aun' }}
                            </td>
                            <td class="px-6 py-4">
                                {{ $data->comentario }}
                            </td>
                            <td class="px-6 py-4">
                                {{ $data->fecha }}
                            </td>
                        </tr>
                    @endforeach




                    </tr>
                </tbody>
            </table>
        </div>
    @endsection
