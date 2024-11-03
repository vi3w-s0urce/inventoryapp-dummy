<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'order_name',
        'customer_id',
        'status',
        'total_product',
        'total_stock',
        'total_price',
    ];

    public function customer_id()
    {
        return $this->belongsTo(Customer::class);
    }
}
