<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order_Detail extends Model
{
    use HasFactory;
    protected $table = 'order_details';
    protected $fillable = [
        'order_id',
        'product_id',
        'product_name',
        'product_price',
        'qty',
        'total_price',
    ];

    public function order_id()
    {
        return $this->belongsTo(Order::class);
    }

    public function product_id()
    {
        return $this->belongsTo(Product::class);
    }
}
