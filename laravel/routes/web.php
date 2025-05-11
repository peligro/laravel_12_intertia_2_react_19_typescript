<?php

use Illuminate\Support\Facades\Route;
 
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NosotrosController;
Route::get('/', [HomeController::class, 'home_index'])->name('home_index');

Route::get('/nosotros', [NosotrosController::class, 'nosotros_index'])->name('nosotros_index');