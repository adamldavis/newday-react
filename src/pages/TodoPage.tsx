import React, { useEffect, useState } from 'react';
import TodoList from '../components/TodoList/TodoList';
import Loading from '../components/Loading/Loading';
import TodoAdder from '../components/TodoList/TodoAdder';
import { Todo } from '../api/types';
import { useData } from '../hooks/useDataHook';
import uuidv4 from '../util/uuid';

interface Props {
    initialTodos?: Todo[]
}

function TodoPage({ initialTodos = [] }: Props) {

  const [ isLoading, setIsLoading ] = useState(false);
  const { data, dispatch } = useData(initialTodos);
  
  const addTodo = (text: string) => {
    console.log(`adding ${text}`)
    setIsLoading(true);
    dispatch({type: 'add', payload: { id: uuidv4(), text, checked: false, labels: [] }});
    // simulates call to API
    setTimeout(() => setIsLoading(false), 200);
  }
  return (
    <>
    <h1>To-do</h1>
    <h2>To-do list with drag & drop, delete, saved in localStorage</h2>
    <Loading show={isLoading} />
    <TodoList todos={data.todos ?? []} dispatch={dispatch} />
    <TodoAdder addTodo={addTodo} />
    </>
  );
}

export default TodoPage;
