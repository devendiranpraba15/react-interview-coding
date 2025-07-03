"use client";
import React, { useState, useRef } from "react";
import TodoTask from "./backlog-task";

type Task = {
  id: string;
  content: string;
};

type TodoTypes = {
  id: string;
  title: string;
  tasks: Task[];
};

const initialData: { [key: string]: TodoTypes } = {
  backlog: {
    id: "backlog",
    title: "Backlog",
    tasks: [
      { id: "task-1", content: "Set up project" },
      { id: "task-2", content: "Create UI structure" },
    ],
  },
  dev: {
    id: "dev",
    title: "Development",
    tasks: [{ id: "task-3", content: "Implement drag & drop" }],
  },
  done: {
    id: "done",
    title: "Done",
    tasks: [{ id: "task-4", content: "Initial commit" }],
  },
};

export default function TodoList() {
  const [list, setList] = useState(initialData);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [sourceColumnId, setSourceColumnId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = (): void => {
    if (inputRef.current === null) return;
    const value = inputRef.current.value.trim();
    setList((prev) => {
      return {
        ...prev,
        backlog: {
          ...prev.backlog,
          tasks: [
            ...prev.backlog.tasks,
            {
              id: crypto.randomUUID(),
              content: value,
            },
          ],
        },
      };
    });

    inputRef.current.value = "";
  };

  function handleDragValue(
    event: React.DragEvent<Element>,
    taskId: string
  ): void {
    setDraggedTaskId(taskId);

    const columnId = (event.currentTarget as HTMLElement).getAttribute(
      "data-column-id"
    );
    if (columnId) setSourceColumnId(columnId);
  }
  function ondrop(event: React.DragEvent<Element>): void {
    event.preventDefault();

    const destColumnId = (event.currentTarget as HTMLElement).getAttribute(
      "data-column-id"
    );
    if (!draggedTaskId || !sourceColumnId || !destColumnId) return;

    if (sourceColumnId === destColumnId) return;

    setList((prev) => {
      const sourceTasks = [...prev[sourceColumnId].tasks];
      const destTasks = [...prev[destColumnId].tasks];

      const taskIndex = sourceTasks.findIndex(
        (task) => task.id === draggedTaskId
      );
      if (taskIndex === -1) return prev;

      const [movedTask] = sourceTasks.splice(taskIndex, 1);
      destTasks.push(movedTask);

      return {
        ...prev,
        [sourceColumnId]: { ...prev[sourceColumnId], tasks: sourceTasks },
        [destColumnId]: { ...prev[destColumnId], tasks: destTasks },
      };
    });

    setDraggedTaskId(null);
    setSourceColumnId(null);
  }

  function ondragover(event: React.DragEvent<Element>): void {
    event.preventDefault();
  }

  return (
    <>
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <p className="mt-4 text-gray-600">Scrum Board</p>
        <label>create backlog</label>
        <input className="border-1 rounded ml-1" ref={inputRef} />
        <button
          className="bg-green-500 shadow-lg rounded p-0.5 ml-1"
          onClick={handleSubmit}
        >
          add
        </button>
        <div className="bg-gray-100 shadow-lg rounded-md mt-1">
          <div className="mx-auto py-16 px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(list).map(([itemId, item]) => {
                return (
                  <div key={itemId}>
                    <h1 className="text-lg font-semibold">{item.title}</h1>
                    <div className="space-y-4 mt-2">
                      {item.tasks?.map((task) => (
                        <TodoTask
                          key={task.id}
                          task={task}
                          onDrop={ondrop}
                          onDragOver={ondragover}
                          onDragStart={handleDragValue}
                          columnId={itemId}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
