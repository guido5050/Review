


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <main>
        <a href="{{ $url }}" id="generateLink">Copiar Link</a>
        <input type="text" value="" id="myInput">

        <script>
            document.getElementById('generateLink').addEventListener('click', function(event) {
                event.preventDefault();
                var url = this.href;
                document.getElementById('myInput').value = url;
                navigator.clipboard.writeText(url);
               });
        </script>
    </main>
</body>

</html>
