<?php

namespace App\Services;

use App\Models\Todo;

class TodoService
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
        $todos = Todo::all();
        if ($todos) {
            return $todos;
        } else throw new \Exception("todos not found");
    }
    public function store(array $data)
    {
        $todo = Todo::create($data);
        return $todo;
    }
    public function update(array $data, Todo $todo)
    {
        $todo->update($data);
        return $todo;
    }
    public function destroy(Todo $todo)
    {
        $todo->delete();
        return $todo;
    }
}
