<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'price',
        'stock',
        'supplier_id',
        'product_category_id',
        'description',
        'image',
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function product_category()
    {
        return $this->belongsTo(ProductCategory::class);
    }
}
