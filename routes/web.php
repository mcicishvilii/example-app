<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/blog', [PostController::class, 'index'])->name('blog.index');
Route::get('/blog/{post}', [PostController::class, 'show'])->name('blog.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';