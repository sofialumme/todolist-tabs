import './App.css';
import React, { useState } from 'react';
import Home from './components/Home';
import Todolist from './components/Todolist';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';

function App() {
  const [value, setValue] = useState('home');

  const handleChange = (event, value) => {
    setValue(value);
  }

  return (
    <div className="App">
      <Tabs value={value} onChange={handleChange}>
        <Tab value="home" label="Home" />
        <Tab value="todos" label="Todos" />
      </Tabs>
      {value === 'home' && <Home />}
      {value === 'todos' && <Todolist />}
    </div>
  );
}

export default App;