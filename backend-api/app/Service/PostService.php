<?php

namespace App\Service;

use App\Models\Post;

class PostService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }
    public function index()
    {
        $posts = Post::all();
        return $posts;
    }
    public function store(array $data)
    {
        $post = Post::create($data);
        return $post;
    }
}
