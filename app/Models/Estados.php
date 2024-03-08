<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estados extends Model
{
    use HasFactory;

    protected $table = 'estados';
    protected $primaryKey = 'id_estado';
    protected $fillable = ['estado','descripcion'];
}
