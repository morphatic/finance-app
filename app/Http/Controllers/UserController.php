<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{

    public function show (User $user) {
        return $user;
    }
    
    public function store (Request $request) {
        $User = User::create($request->all());
        return response()->json($User, 201);
    }
}
