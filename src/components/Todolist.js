import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Todolist() {
    const [todo, setTodo] = useState({ description: '', date: '', priority: '' });
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();

    const columns = [
        { field: 'description', sortable: true, filter: true, floatingFilter: true },
        { field: 'date', sortable: true, filter: true, floatingFilter: true },
        {
            field: 'priority', sortable: true, filter: true, floatingFilter: true,
            cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' }
        }
    ]

    const inputChanged = (event) => {
        setTodo({ ...todo, [event.target.name]: event.target.value });
    }

    const changeDate = (date) => {
        setTodo({ ...todo, date: dayjs(date).format('YYYY/MM/DD') });
    }

    const addTodo = (event) => {
        setTodos([...todos, todo]);
    }

    const deleteTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) =>
                index !== gridRef.current.getSelectedNodes()[0].childIndex));
        } else {
            alert('Select a row first');
        }
    }

    return (
        <div>
            <h1>TodoList</h1>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <TextField
                    label="Description"
                    variant="standard"
                    name="description"
                    value={todo.description}
                    onChange={inputChanged} />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date"
                        value={todo.date}
                        onChange={changeDate}
                        inputFormat="YYYY/MM/DD"
                        renderInput={(params) => <TextField variant='standard' {...params} />}
                    />
                </LocalizationProvider>

                <TextField
                    label="Priority"
                    variant="standard"
                    name="priority"
                    value={todo.priority}
                    onChange={inputChanged} />
                <Button onClick={addTodo} variant='contained' color='primary'>Add</Button>
                <Button onClick={deleteTodo} variant='contained' color='error'>Delete</Button>
            </Stack>

            <div className='ag-theme-material'
                style={{ height: '700px', width: '50%', margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection='single'
                    columnDefs={columns}
                    rowData={todos}
                    animateRows={true}>
                </AgGridReact>
            </div>
        </div>
    );
};

export default Todolist;