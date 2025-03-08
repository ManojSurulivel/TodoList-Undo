import React from 'react'
import TodoList from './My-Todo-List/TodoList';
import TodoUndo from './TodoUndo/TodoUndo'
import PassWordCheck from './PasswordCheck/PassWordCheck';
import MUI from './MUI';


const App = () => {
  return (
    <div>
      <TodoUndo />
      <PassWordCheck /> 
      <TodoList />
    <MUI />
    </div>
  )
}

export default App;

