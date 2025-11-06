<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Taluka extends Model
{
    use HasFactory;

    protected $fillable = [
        'district',
        'taluka_name',
        'regional_name',
        'status',
    ];
}
