<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Entry;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('users', 'UserController@show');
Route::post('users', 'UserController@store');

Route::get('entries', 'EntryController@index');
Route::post('entries', 'EntryController@store');
Route::put('entries/{entry}', 'EntryController@update');
Route::delete('entries/{entry}', 'EntryController@delete');
