<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Luthfi Tampan',
            'email' => 'admin@admin.com',
            'roles' => 'admin',
            'password' => 'admin',
        ]);

        User::create([
            'name' => 'Alfi Tampan',
            'email' => 'employee@employee.com',
            'roles' => 'employee',
            'password' => 'employee',
        ]);
    }
}
