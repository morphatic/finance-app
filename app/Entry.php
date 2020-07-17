<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    public function user() {
        return $this->belongsTo('App\User');
    }

    protected $fillable = [
        'label',
        'date',
        'value',
        'user_id',
    ];
}
