<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\Todo;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Http\Resources\TodoResource;
use App\Services\TodoService;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private $todoService;
    public function __construct(TodoService $todoService)
    {
        $this->todoService = $todoService;
    }
    public function index()
    {
        try {
            $todos = $this->todoService->index();
            $result = TodoResource::collection($todos);
            return ResponseHelper::SuccessResponse($result, 'todos retrieved successfully');
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse(null, $e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTodoRequest $request)
    {
        try {
            $todo = $this->todoService->store($request->validated());
            return ResponseHelper::SuccessResponse($todo, 'Todo created successfully');
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse(null, $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        $result = TodoResource::make($todo);
        return ResponseHelper::SuccessResponse($result);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodoRequest $request, Todo $todo)
    {
        try {
            $todo = $this->todoService->update($request->validated(), $todo);
            return ResponseHelper::SuccessResponse($todo, 'Todo updated successfully');
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse(null, $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        try {
            $todo = $this->todoService->destroy($todo);
            return ResponseHelper::SuccessResponse($todo, 'Todo deleted successfully');
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse(null, $e->getMessage());
        }
    }
}
