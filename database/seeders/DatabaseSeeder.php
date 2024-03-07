<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $faker = Factory::create();

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

        // ProductCategory::create([
        //     'name' => 'Makanan',
        //     'description' => $faker->sentence(),
        //     'color' => $faker->randomElement(['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Cyan']),
        // ]);

        // Product::create([

        // ]);

        for ($i=0; $i < 200; $i++) { 
            ProductCategory::create([
                'name' => $faker->unique()->word,
                'description' => $faker->sentence(),
                'color' => $faker->randomElement(['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Cyan']),
            ]);
        }
    }
}
