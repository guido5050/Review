const mix = require('laravel-mix');

mix.enableReact()
    .js('resources/js/app.jsx', 'public/build/assets')
    .postCss('resources/css/app.css', 'public/build/assets')
    .version();
