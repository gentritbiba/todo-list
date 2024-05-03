"use client"
import type React from 'react';
import { useEffect, useState } from 'react';
import { DatePicker } from '@/components/ui/date-picker';
import { createTodo, deleteTodoById, getTodos, updateTodoComplete } from './server-actions';

export interface Todo {
  id: string;
  text: string;
  dueDate: Date;
  completed: boolean;
}

const sortTodos = (a: Todo, b: Todo) => {
  if (a.completed && !b.completed) {
    return 1;
  // biome-ignore lint/style/noUselessElse: <explanation>
  } else if (!a.completed && b.completed) {
    return -1;
  // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    return a.dueDate.getTime() - b.dueDate.getTime();
  }
}


export  function TodoList({ initialList }: { initialList: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(initialList.sort(sortTodos));
  const [newTodo, setNewTodo] = useState('');
  const [date, setDate] = useState<Date>(new Date());


  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo,
        dueDate: date,
        completed: false,
      };
      createTodo(todo).then((d) => {
        const sortedTodos = [...todos, d].sort(sortTodos);
        setTodos(sortedTodos);
        setNewTodo('');
      });
    }
    else{
      alert('Please enter a valid todo item')
    }
  };

  const toggleTodo = (todo: Todo) => {
    updateTodoComplete(todo).then((d) => {
      const updatedTodos = todos.map(t => t.id === todo.id ? d : t).sort(sortTodos);
      setTodos(updatedTodos);
    });
  };

  const deleteTodo = (id: string) => {
    // setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    deleteTodoById(id).then(() => {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    });
  };
  

  return (
    <div className='w-[600px] max-w-[100vw]'>
      <div className='flex gap-2 p-2 max-[600px]:flex-wrap'>
        <input
          type="text"
          value={newTodo}
          className='text-black px-4 py-2 border-2 text-xl rounded-lg flex-grow'
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <DatePicker date={date} setDate={date => setDate(date as Date)} />
        <button type="button" onClick={addTodo} className="bg-green-700 rounded-xl text-xl px-3 text-white">+</button>
      </div>
      <ul className='p-3'>
        {todos.map(todo => (
          <li key={todo.id} className='flex justify-between py-2 border-b-2'>
            <div className='flex flex-grow'>
            <input
              type="checkbox"
              id={todo.id}
              checked={todo.completed}
              onChange={() => toggleTodo(todo)}
            />
            <label htmlFor={todo.id} className={`${todo.completed ? 'line-through' : ''} flex-grow  px-4`}>
              <span className='block'>{todo.text}</span> 
              <small>{todo.dueDate.toDateString()}</small>
              {todo.dueDate.getTime() < Date.now() && !todo.completed && <span className='text-red-800'> - Overdue</span>}
            </label>
            </div>
            <button type="button" className='text-white px-3 rounded-xl bg-red-800' onClick={() => deleteTodo(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;