<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Molly Green',
            'avatar' => 'avatar.png',
            'email' => 'molly.green@example.com',
            'password' => Hash::make('letmein'),
        ]);
    }
}
