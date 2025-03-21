"use client";

import { TodoItems } from "~/components/todo/TodoItem";
import { useMemo, useState } from "react";
import { Todo } from "~/types/todo";
import { useLoaderData, useMatches } from "@remix-run/react";
import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { todoNetwork } from "~/libs/network";
import AddTodo from "~/components/todo/AddTodo";

const getTodos = async () => {
  return await todoNetwork.get("/").catch((error) => {
    console.error("error => ", error);
    throw Error(error);
  });
};

export const handle = {
  its: "all yours",
};

export const meta: MetaFunction = ({ error }) => {
  console.log("Meta Err: ", error);
  return [{ title: error ? "oops!" : "Todo List" }];
};

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  console.log("action trigger at server => ", body);
  return null;
}

export async function loader() {
  return (await getTodos()).data;
}

export default function TodoList() {
  const matchs = useMatches();
  console.log({ matchs });
  const todoData = useLoaderData<typeof loader>();
  const [todos, setTodos] = useState<Todo[]>(todoData.todos);
  const [activeTab, setActiveTab] = useState("all");

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const { activeTodos, completedTodos } = useMemo(
    () =>
      todos.reduce(
        (
          store: { activeTodos: Todo[]; completedTodos: Todo[] },
          todo: Todo
        ) => {
          if (todo.completed) {
            store.activeTodos.push(todo);
          } else {
            store.completedTodos.push(todo);
          }
          return store;
        },
        { activeTodos: [], completedTodos: [] }
      ),
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
          <AddTodo setTodos={setTodos} todos={todos} />

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
