<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Post extends Model
{
    protected $fillable = [
        'title',
        'content',
        'slug',
        'status',
        'published_at',
        'category_id',
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

    // Relationships
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    // Search scope
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('content', 'like', "%{$search}%")
              ->orWhereHas('category', function ($categoryQuery) use ($search) {
                  $categoryQuery->where('name', 'like', "%{$search}%");
              })
              ->orWhereHas('tags', function ($tagQuery) use ($search) {
                  $tagQuery->where('name', 'like', "%{$search}%");
              });
        });
    }
}