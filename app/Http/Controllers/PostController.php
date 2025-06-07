<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::where('status', 'published')
            ->orderBy('created_at', 'desc')
            ->paginate(10);
            
        return Inertia::render('blog/index', [
            'posts' => $posts
        ]);
        
    }
    
    public function show(Post $post)
    {
        // Only show published posts
        if ($post->status !== 'published') {
            abort(404);
        }
        
        return Inertia::render('blog/show', [
            'post' => $post
        ]);
    }
}