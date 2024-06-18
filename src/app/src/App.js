import './App.css';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const url = 'http://localhost/api/';
  // const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/todos/`;

  const fetchTodos = useCallback(async () => {
    try {
      console.log('url:', url);
      const response = await axios.get(url);
      // console.log('response:', response)
  
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = response.data;
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      // Handle the error appropriately, e.g., display an error message to the user
    }
  }, [url]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const createTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, { description: todoInput });
      if (response.status === 201) {
        setTodoInput('');
        fetchTodos();
      } else {
        console.error('Error creating todo:', response.status);
      }
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <div className="App">
      <div>
        <h1>List of TODOs</h1>
        <ul>
          {todos.map((todo, index) => (
            // console.log(todo),
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Create a ToDo</h1>
        <form onSubmit={createTodo}>
          <div>
            <label htmlFor="todo">ToDo: </label>
            <input
              type="text"
              id="todo"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
            />
          </div>
          <div style={{ marginTop: '5px' }}>
            <button type="submit">Add ToDo!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
