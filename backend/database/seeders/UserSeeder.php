<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Create roles
        $adminRole = Role::create([
            'name' => 'admin',
            'description' => 'Administrator role',
        ]);

        $superadminRole = Role::create([
            'name' => 'superadmin',
            'description' => 'Super Administrator role',
        ]);

        // Create users with roles
        User::create([
            'name' => 'Admin User',
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'), // Replace 'password' with your hashed password
            'role_id' => $adminRole->id,
        ]);

        User::create([
            'name' => 'Superadmin User',
            'username' => 'superadmin',
            'email' => 'superadmin@example.com',
            'password' => Hash::make('password'), // Replace 'password' with your hashed password
            'role_id' => $superadminRole->id,
        ]);

        // Add more users as needed

        // You can also use a factory to create additional users
        \App\Models\User::factory(10)->create();
    }
}
