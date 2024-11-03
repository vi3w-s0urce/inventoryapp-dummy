<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Customer;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Supplier;
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
            'name' => 'Visitor',
            'email' => 'visitor@example.com',
            'roles' => 'admin',
            'password' => 'visitor',
        ]);

        // ProductCategory::create([
        //     'name' => 'Makanan',
        //     'description' => $faker->sentence(),
        //     'color' => $faker->randomElement(['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Cyan']),
        // ]);

        // Product::create([

        // ]);

        for ($i=0; $i < 200; $i++) { 
            // Product Category
            // ProductCategory::create([
            //     'name' => $faker->unique()->word,
            //     'description' => $faker->sentence(),
            //     'color' => $faker->randomElement(['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Cyan']),
            // ]);
            // //Supplier
            // Supplier::create([
            //     'name' => $faker->domainName(),
            //     'address' => $faker->address(),
            //     'email' => $faker->email(),
            //     'number_phone' => $faker->phoneNumber(),
            // ]);
            // // Customer
            // Customer::create([
            //     'name' => $faker->domainName(),
            //     'address' => $faker->address(),
            //     'email' => $faker->email(),
            //     'number_phone' => $faker->phoneNumber(),
            // ]);
        }
    }
}
