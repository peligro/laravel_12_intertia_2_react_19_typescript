<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
class NosotrosController extends Controller
{
    public function nosotros_index(Request $request)
    {
        sleep(2);return Inertia::render('nosotros/Index', []);
    }
}
