import { Check, Trash2 } from "lucide-react";
import { Todo } from "~/types/todo";

export function TodoItems({
  todos,
  onToggle,
  onDelete,
}: {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
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
            {todo.todo}
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
