<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="csrf_token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    @viteReactRefresh
    @vite(['resources/js/app.jsx','resources/css/app.css'])
    @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>