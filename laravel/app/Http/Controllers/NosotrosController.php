<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
class NosotrosController extends Controller
{
    public function nosotros_index(Request $request)
    {
        return Inertia::render('nosotros/Index', []);
    }
}
