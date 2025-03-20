"use client";

import { useMemo, useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "Learn React", completed: true },
    { id: "2", text: "Build a todo app", completed: false },
    { id: "3", text: "Deploy to production", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const { activeTodos, completedTodos } = useMemo(
    () => ({
      activeTodos: todos.filter((todo) => !todo.completed),
      completedTodos: todos.filter((todo) => todo.completed),
    }),
    [todos]
  );

  // Determine which todos to display based on active tab
  const displayedTodos =
    activeTab === "active"
      ? activeTodos
      : activeTab === "completed"
      ? completedTodos
      : todos;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white shadow-md">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800">Todo List</h2>
          <p className="text-sm text-gray-500">Manage your tasks efficiently</p>
        </div>

        <div className="px-6 py-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTodo();
                }
              }}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={addTodo}
              className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-3 gap-1 rounded-md bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab("all")}
                className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                  activeTab === "all"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                All ({todos.length})
              </button>
              <button
                onClick={() => setActiveTab("active")}
                className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                  activeTab === "active"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Active ({activeTodos.length})
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                  activeTab === "completed"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Completed ({completedTodos.length})
              </button>
            </div>

            <div className="mt-4">
              <TodoItems
                todos={displayedTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-3 text-sm text-gray-500">
          {activeTodos.length} items left to do
        </div>
      </div>
    </div>
  );
}

function TodoItems({
  todos,
  onToggle,
  onDelete,
}: {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  if (todos.length === 0) {
    return <p className="py-4 text-center text-gray-500">No tasks found</p>;
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center gap-2 rounded-md border border-gray-200 p-3 shadow-sm"
        >
          <button
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
              todo.completed
                ? "bg-blue-600 text-white"
                : "border border-gray-300 bg-white hover:bg-gray-50"
            }`}
            onClick={() => onToggle(todo.id)}
          >
            {todo.completed && <Check className="h-4 w-4" />}
          </button>
          <span
            className={`flex-1 ${
              todo.completed ? "text-gray-400 line-through" : "text-gray-700"
            }`}
          >
            {todo.text}
          </span>
          <button
            className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-red-500"
            onClick={() => onDelete(todo.id)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}
