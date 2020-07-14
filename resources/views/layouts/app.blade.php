<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="{{ asset('images/logo.svg') }}">
    <title>{{ env('APP_NAME', 'Fynapse') }}</title>
    <script src="{{ asset('js/app.js') }}" defer></script>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but Fynapse doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
