import React, { useState, useRef, useEffect } from "react";
import "./TodoUndo.css"; 

const TodoUndo = () => {
  const [text, setText] = useState("");
  const [display, setDisplay] = useState([]);
  const [complete, setComplete] = useState([]);
  const inputRef = useRef();

  const handleAddClick = () => {
    if (text.trim() && !display.includes(text.trim())) {
      setDisplay([...display, text.trim()]);
      setText("");
    }
  };

  const handleDone = (task) => {
    if (task.trim() && !complete.includes(task.trim())) {
      setComplete([...complete, task]);
      setDisplay(display.filter((item) => item !== task));
    }
  };

  const handleDelete = (task) => {
    setDisplay(display.filter((item) => item !== task));
  };

  const handleUndo = () => {
    if (complete.length > 0) {
      const lastItem = complete[complete.length - 1];
      setDisplay([...display, lastItem]);
      setComplete(complete.slice(0, -1));
    }
  };

  const handleDeleteComplete = (index) => {
    setComplete(complete.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
       e.preventDefault()
  }

  useEffect(() => {
        inputRef.current.focus();
      },[])
  
      return (
    <form onSubmit={handleSubmit} className="container">
      
      <div className="input-box">
        <h2>Add Task</h2>
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Enter a task..."
          ref={inputRef}
        />
        <button onClick={handleAddClick}>Add Task</button>
      </div>



       <div className="tasks">

      <div className="task-section">
        <h2>Tasks to Complete</h2>
        <div className="task-list">
          {display.length === 0 ? (
            <p style={{ textAlign: "center", color: "#aaa", fontStyle: "italic" }}>No tasks to complete</p>
          ) : (
            <ul>
              {display.map((task, index) => (
                <li key={index}>
                  {task}
                  <div>
                    <button onClick={() => handleDone(task)}>Done</button>
                    <button onClick={() => handleDelete(task)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

       <div className="task-section">
        <h2>Completed Tasks</h2>
        <div className="task-list">
          {complete.length === 0 ? (
            <p style={{ textAlign: "center", color: "#aaa", fontStyle: "italic" }}>No completed tasks</p>
          ) : (
            <ul>
              {complete.map((task, index) => (
                <li key={index}>
                  {task}
                  <div>
                    <button onClick={handleUndo}>Undo</button>
                    <button onClick={() => handleDeleteComplete(index)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      </div>
    </form>
  );
};

export default TodoUndo;
