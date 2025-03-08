import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import "./TodoList.css";

function TodoList() {
  const [text, setText] = useState("");
  const [display, setDisplay] = useState([]);
  const [checkedItems, setCheckedItems] = useState({}); // Track checked items

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleAddClick = () => {
    if (text.trim() && !display.includes(text.trim())) {
      setDisplay([...display, text.trim()]);
      setText("");
    }
  };

  const handleCheck = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle checked state
    }));
  };

  const handleDelete = (index) => {
    setDisplay(display.filter((_, i) => i !== index));
  };
  return (
    <div className="container">
      <h1>Todo-List</h1>
      <input type="text" value={text} onChange={handleChange} />
      <button className="addBtn" onClick={handleAddClick}>
        Add
      </button>

      <div>
        <ul>
          {display.map((value, index) => (
            <li
              key={index}
              style={{
                textDecoration: checkedItems[index] ? "line-through" : "none",
              }}
            >
              <Checkbox
                checked={checkedItems[index] || false}
                onChange={() => handleCheck(index)}
              />
              {value}
              <div>
                <button onClick={() => handleDelete(index)}>Del</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
