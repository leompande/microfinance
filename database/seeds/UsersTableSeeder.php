<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'first_name' => str_random(10),
            'middle_name' => str_random(10),
            'last_name' => str_random(10),
            'gender' => str_random(4),
            'birth_date' => str_random(10),
            'phone' => str_random(10),
            'postal_address' => str_random(10),
            'role' => str_random(10),
            'status' => str_random(10),
            'password' => str_random(10),
            'created_by' => str_random(10),
            'password' => str_random(10),
            'email' => str_random(10).'@gmail.com',
            'password' => bcrypt('secret'),
        ]);
    }
}
