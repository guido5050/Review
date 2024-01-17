{{--
<link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css" />

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-300 ">
    <div
        class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md animate-fade-down">
        <div class="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Reseñas</div>

        <div class="relative mt-10 h-px bg-gray-300">
            <div class="absolute left-0 top-0 flex justify-center w-full -mt-2">
                <span class="bg-white px-4 text-xs text-gray-500 uppercase">ingresa nombre y correo</span>
            </div>
        </div>
        <div class="mt-10 ">
            <form action="{{ route('generarReseña') }}" method="POST">
                @csrf
                <div class="flex flex-col mb-6">
                    <label for="email" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail
                        Address:</label>
                    <div class="relative">


                        <input id="email" type="email" name="email"
                            class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                            placeholder="E-Mail Address" />

                        <div class="mt-3">
                            @error('email')
                                <p>{{ $message }}</p>
                            @enderror
                        </div>

                    </div>
                </div>
                <div class="flex flex-col mb-6">
                    <label for="nombre_completo" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Nombre
                        Completo:</label>
                    <div class="relative">
                        <div
                            class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">

                        </div>

                        <input id="nombre" type="text" name="nombre"
                            class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                        placeholder="Nombre Completo" />

                        <div class="mt-3">
                            @error('nombre')
                                <p>{{ $message }}</p>
                            @enderror
                        </div>

                    </div>
                </div>

                <div class="flex items-center mb-6 -mt-4">
                    <div class="flex ml-auto">

                    </div>
                </div>

                <div class="flex w-full">
                    <button type="submit"
                        class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                        <span class="mr-2 uppercase">Empezar Reseña</span>

                    </button>
                </div>
                @csrf
            </form>
        </div>

    </div>
</div> --}}

@extends('panel');
@section('cuerpo')
    <form class="form-inline" action="http://testreview.test/" method="GET">
        <div class="row">
            <div class="col-3">
                <div class="form-group mx-sm-3 mb-2">
                    <label for="fecha_entrada">Fecha de entrada:</label>
                    <input type="date" class="form-control" id="fecha_entrada" name="fecha_entrada">
                </div>
            </div>
            <div class="col-3">
                <div class="form-group mx-sm-3 mb-2">
                    <label for="fecha_salida">Fecha de salida:</label>
                    <input type="date" class="form-control" id="fecha_salida" name="fecha_salida">
                </div>
            </div>
            <div class="col-3">
                <div class="form-group mx-sm-3 mb-2 mr-2">
                    <label for="adultos">Número de adultos:</label>
                    <input type="number" class="form-control" id="adultos" name="adultos" value="">
                </div>
            </div>
            <div class="col-3">
                <br>
                <button type="submit" class="btn btn-success btn-large mb-2">
                    <b>Ver Disponibilidad de Habitación</b>
                </button>
            </div>
        </div>
    </form>
@endsection
