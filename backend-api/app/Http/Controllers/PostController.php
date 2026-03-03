<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Service\PostService;



class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private $postservice;
    public function __construct(PostService $postservice)
    {
        $this->postservice = $postservice;
    }
    public function index()
    {
        try {
            $posts = $this->postservice->index();
            $result = PostResource::collection($posts);
            return ResponseHelper::SuccessResponse($result);
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse(null, $e->getMessage());
        }
    }


    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        try {

            $post = $this->postservice->store($request->validated());
            return ResponseHelper::SuccessResponse($post, 'Post created successfully');
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse(null, $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
