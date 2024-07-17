<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserAccountsSeeder extends Seeder
{
    public function run()
    {
        // Retrieve or create roles
        $adminRole = Role::updateOrCreate(
            ['name' => 'admin'],
        );

        $superadminRole = Role::updateOrCreate(
            ['name' => 'superadmin'],
        );

        // Create admin user if not exists
        User::updateOrCreate(
            ['username' => 'admin'],
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => null, // or you can generate a remember_token if needed
                'created_at' => now(),
                'updated_at' => now(),
                'role_id' => 1, // Assuming 'admin' role ID is 1
            ]
        );

        // Create superadmin user if not exists
        User::updateOrCreate(
            ['username' => 'superadmin'],
            [
                'name' => 'Superadmin User',
                'email' => 'superadmin@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => null, // or generate a remember_token if needed
                'created_at' => now(),
                'updated_at' => now(),
                'role_id' => 2, // Assuming 'superadmin' role ID is 2
            ]
        );

        // Add more users as needed
    }
}
