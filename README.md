# Laravel 12 con Intertia 2 y React 19 + Typescript

Integración de Laravel 12 con Intertia 2, sin utilizar el Starter Kits para tener una instalación más limpia

### 1. Ejecutar docker compose

```sh
docker compose up --build -d
```

### 2. Ejecutar migraciones

```sh
php artisan migrate
```

### o 

```bash
docker exec -it peligro-laravel-app php artisan migrate
```  


### 2. Integración con intertia (si lo haces desde el contenedor que pasé usa docker exec -it peligro-laravel-app composer [tus comandos acá])

 


### instalar intertia

```bash
composer require inertiajs/inertia-laravel
```   

### instalar inertia para react

```bash
npm install @inertiajs/react
```

### instalar vite para react

```bash
npm install --save-dev @vitejs/plugin-react
```

### instalar react y react-dom

```bash
npm install react react-dom
```

### crear middleware para inertia

```bash
php artisan inertia:middleware
```

### Agregar nuevo middleware al archivo bootstrap/app.php

```php
use App\Http\Middleware\HandleInertiaRequests;

->withMiddleware(function (Middleware $middleware) {
    $middleware->web(append: [
        HandleInertiaRequests::class,
    ]);
})
```

### agregar react al proyecto vite en vite.config.js

```js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            refresh: true,
        }),
        react()
    ],
    
    server: {
        port: 5174,//opcional si quieres salir en otro puerto que no sea el 5173
      }
});

```

### se debe renombrar el archivo resources/js/app.js a resources/js/app.tsx y agregarle lo siguiente

```tsx
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });
    return pages[`./Pages/${name}.tsx`];
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
```

### se debe crear archivo tsconfig.json en la raíz

```json
{
    "compilerOptions": {
      "target": "ESNext",
      "module": "ESNext",
      "lib": ["DOM", "DOM.Iterable", "ESNext"],
      "esModuleInterop": true,
      "skipLibCheck": true,
      "outDir": "./dist",
      "rootDir": "./resources/js",
      "moduleResolution": "Node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react-jsx",
      "strict": true,
      "baseUrl": ".",
      "types": ["vite/client", "@inertiajs/react/types"]
    },
    "include": ["resources/js/**/*"]
  }
```
### se debe instalar los types necesarios para typescript

```bash
npm install --save-dev typescript @types/react @types/react-dom @vitejs/plugin-react-refresh
```


### se debe renombrar el archivo resources/views/welcome.blade.php a resources/views/app.blade.php y agregarle lo siguiente

```php
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    @viteReactRefresh
    @vite('resources/js/app.tsx')
    @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>
```

### se debe crear el primer controlador

```bash
php artisan make:controller HomeController
```

### y en el archivo routes/web.php agregar la ruta con inertia

```php

use App\Http\Controllers\HomeController;
Route::get('/', [HomeController::class, 'home_index'])->name('home_index');

```

### luego en el controlador app/Http/Controllers/HomeController.php agregar la ruta


```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
class HomeController extends Controller
{
    public function index(Request $request)
    {
         
        return Inertia::render('Home', []);
    }
}
```

### instalación de Ziggy para poder usar route en los enlaces

```bash
npm install ziggy-js
```

### instala tightenco/ziggy

```bash
composer require tightenco/ziggy
```


### Publica la configuración de Ziggy

```bash
php artisan vendor:publish --provider="Tighten\Ziggy\ZiggyServiceProvider"
```

### En tu archivo resources/views/app.blade.php, asegúrate de tener esto antes de cargar Vite/JS:

```php
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>@yield('title', 'Mi App')</title>
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    {{-- Aquí se inyectan todas las rutas nombradas --}}
    @routes
</head>
<body>
    <div id="app">
        {!! $page !!}
    </div>
</body>
</html>
```

### toast con toastr


```bash
npm install toastr --save
```