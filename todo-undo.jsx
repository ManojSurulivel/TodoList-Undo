import React, { useState } from "react";

function App() {
  const [text, setText] = useState(""); // Holds current input
  const [completed, setCompleted] = useState([]); // Stores completed tasks
  const [display, setDisplay] = useState([]); // Stores displayed tasks

  // Move a specific text from display to completed
  const handleDone = (task) => {
    if (task.trim() && !completed.includes(task.trim())) {
      setCompleted([...completed, task]); // Add to completed list
      setDisplay(display.filter((item) => item !== task)); // Remove from display
    }
  };

  // Remove item from completed list
  const handleDelete = (indexToDelete) => {
    setCompleted(completed.filter((_, index) => index !== indexToDelete));
  };

  // Remove task from display list
  const handleDeleteDisplay = (task) => {
    setDisplay(display.filter((item) => item !== task));
  };

  // Undo: Move last completed task back to the display
  const handleUndo = () => {
    if (completed.length > 0) {
      const lastItem = completed[completed.length - 1];
      setDisplay([...display, lastItem]); // Restore last completed task to display
      setCompleted(completed.slice(0, -1)); // Remove from completed list
    }
  };

  // Add to display list (avoiding duplicates)
  const handleAddDisplay = () => {
    if (text.trim() && !display.includes(text.trim())) {
      setDisplay([...display, text.trim()]);
      setText(""); // Clear input field
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <h2>Current Task</h2>
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Enter task..."
        />
        <button onClick={handleAddDisplay}>Add to Display</button>

        <h2>Tasks to Complete</h2>
        <ul>
          {display.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => handleDone(task)}>Done</button>
              <button onClick={() => handleDeleteDisplay(task)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Completed Tasks</h2>
        {completed == 0 ? (
          "No Completed Task "
        ) : (
          <ul>
            {completed.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => handleDelete(index)}>Delete</button>
                <button onClick={handleUndo} disabled={completed.length === 0}>
                  Undo Last
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
