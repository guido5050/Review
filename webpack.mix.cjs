const mix = require('laravel-mix');

mix.react('resources/js/app.jsx', 'public/build/assets')
   .postCss('resources/css/app.css', 'public/build/assets')
   .version();
