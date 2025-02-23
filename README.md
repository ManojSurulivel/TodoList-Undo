
import React, { useState, useRef, useEffect } from "react";
import "./App.css"; // Import the CSS file

function App() {
  const [text, setText] = useState(""); // Holds input
  const [completed, setCompleted] = useState([]); // Completed tasks
  const [display, setDisplay] = useState([]); // Displayed tasks
  const inputRef = useRef();

  // Move a task to completed
  const handleDone = (task) => {
    if (task.trim() && !completed.includes(task.trim())) {
      setCompleted([...completed, task]); 
      setDisplay(display.filter((item) => item !== task)); 
    }
  };

  // Remove from completed tasks
  const handleDelete = (index) => {
    setCompleted(completed.filter((_, i) => i !== index));
  };

  // Remove from display list
  const handleDeleteDisplay = (task) => {
    setDisplay(display.filter((item) => item !== task));
  };

  // Undo last completed task
  const handleUndo = () => {
    if (completed.length > 0) {
      const lastItem = completed[completed.length - 1];
      setDisplay([...display, lastItem]); 
      setCompleted(completed.slice(0, -1)); 
    }
  };

  // Add a task to display list
  const handleAddDisplay = () => {
    if (text.trim() && !display.includes(text.trim())) {
      setDisplay([...display, text.trim()]);
      setText(""); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(()=>{
    inputRef.current.focus();
  },[])

  return (
    <form className="App" onSubmit={handleSubmit}>
      <h1>📝 Todo List + Undo</h1>

      {/* Input Section */}
      <div className="input-container">
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Enter task..."
          ref={inputRef}
        />
        <button onClick={handleAddDisplay}>➕ Add Task</button>
      </div>

      {/* Display Tasks */}
      <h2>📌 Tasks to Complete</h2>
      {display.length === 0 ? <p>No tasks added yet!</p> : null}
      <ul>
        {display.map((task, index) => (
          <li key={index} className="task">
            {task}
            <div className="buttons">
              <button className="done" onClick={() => handleDone(task)}>✅ Done</button>
              <button className="delete" onClick={() => handleDeleteDisplay(task)}>🗑 Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Completed Tasks */}
      <h2>✔️ Completed Tasks</h2>
      {completed.length === 0 ? <p>No completed tasks yet!</p> : null}
      <ul>
        {completed.map((task, index) => (
          <li key={index} className="completed">
            {task}
            <div className="buttons">
              <button className="delete" onClick={() => handleDelete(index)}>🗑 Delete</button>
              <button className="undo" onClick={handleUndo}>🔄 Undo</button>
            </div>
          </li>
        ))}
      </ul>
    </form>
  );
}

export default App;
# TodoList-Undo
# TodoList-Undo
