<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title',
        'content',
        'slug',
        'status',
        'published_at',
        // Add any other fields you have in your posts table
    ];
    
    protected $casts = [
        'published_at' => 'datetime',
    ];
    
    // Route model binding by slug (if you have one) or ID
    public function getRouteKeyName()
    {
        return 'id'; // Change to 'slug' if you have a slug field
    }
    
    // Scope for published posts
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }
}