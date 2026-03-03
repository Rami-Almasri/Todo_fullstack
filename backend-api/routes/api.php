<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('posts')->controller(PostController::class)->group(function () {

    Route::get('/index', "index");
    Route::post('/store', "store");
    Route::get('/show', "show");
    Route::post('/update/{posy}', "update");
    Route::get('/destroy/{post}', "destroy");
});
Route::controller(TodoController::class)->prefix('todos')->group(function () {
    Route::get('/index', "index");
    Route::post('/store', "store");
    Route::get('/edit/{edit}', "edit");
    Route::post('/update/{todo}', "update");
    Route::get('/destroy/{todo}', "destroy");
});
