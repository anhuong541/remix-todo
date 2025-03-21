import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { BIG_RANDOM_NUM } from "~/constants";
import { Todo } from "~/types/todo";

type Props = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

export default function AddTodo({ setTodos, todos }: Props) {
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const todo: Todo = {
      id: Math.floor(Math.random() * BIG_RANDOM_NUM),
      todo: newTodo,
      completed: false,
      userId: Math.floor(Math.random() * BIG_RANDOM_NUM),
    };

    setTodos([...todos, todo]);
    setNewTodo("");
  };
  return (
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
  );
}
