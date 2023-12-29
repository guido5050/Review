<div class="text-center">
    <!-- Waste no more time arguing what a good man should be, be one. - Marcus Aurelius -->
    <h1>Limpieza</h1>

    <form action="{{ route('showpreguntas') }}" method="POST">
        @csrf
        <label for="text" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">puntuacion
            puntuacion😆:</label>
        <input id="puntuacion" type="number" name="puntuacion"
            class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400  py-2 focus:outline-none w-30% focus:border-blue-400"
            placeholder="Ingrese la puntuacion(TEST)" />
        <button type="submit"
            class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Probar</button>
        @csrf
    </form>
</div>
