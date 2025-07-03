"use client"

import React, { useState } from "react";

type ToDo = {
  id: string;
  title: string;
  status: "backlog" | "active" | "completed";
};

const TodoList = () => {
  const [lists, setLists] = useState<ToDo[]>([]);
  const [title, setTitle] = useState<string>("");

  const handleChangetitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeTodo = (
    newStatus: "backlog" | "active" | "completed",
    id: string
  ) => {
    setLists((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setLists((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleAddClick = () => {
    if (title.trim()) {
      const newTodo: ToDo = {
        id: `${Date.now()}`,
        title: title.trim(),
        status: "backlog",
      };
      setLists((prev) => [...prev, newTodo]);
      setTitle("");
    } else {
      alert("Please add a title");
    }
  };

  const renderColumn = (title: string, status: ToDo["status"]) => {
    const filtered = lists.filter((todo) => todo.status === status);

    return (
      <div
        style={{
          flex: 1,
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          margin: "0 0.5rem",
          minHeight: "300px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>{title}</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filtered.map((todo) => (
            <li
              key={todo.id}
              style={{
                marginBottom: "1rem",
                padding: "0.5rem",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            >
              <div>{todo.title}</div>
              <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
                {todo.status === "backlog" && (
                  <button onClick={() => handleChangeTodo("active", todo.id)}>
                    Start
                  </button>
                )}
                {todo.status === "active" && (
                  <>
                    <button onClick={() => handleChangeTodo("completed", todo.id)}>
                      Done
                    </button>
                    <button onClick={() => handleChangeTodo("backlog", todo.id)}>
                      Backlog
                    </button>
                  </>
                )}
                {todo.status === "completed" && (
                  <button onClick={() => handleChangeTodo("active", todo.id)}>
                    Reopen
                  </button>
                )}
                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="title">Task:</label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={handleChangetitle}
          autoComplete="off"
          style={{ display: "inline-block", marginLeft: "0.5rem" }}
        />
        <button onClick={handleAddClick} style={{ marginLeft: "0.5rem" }}>
          Add
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection:'row',
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {renderColumn("Backlog", "backlog")}
        {renderColumn("In Progress", "active")}
        {renderColumn("Done", "completed")}
      </div>
    </div>
  );
};

export default TodoList;
