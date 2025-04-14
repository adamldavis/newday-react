import React, { useState } from 'react';
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

  const { data, dispatch, isLoading } = useData(initialTodos);
  const todos = data.todos ?? [];

  const addTodo = (text: string) => {
    if (!text) {
      return; // no text
    }
    console.log(`adding ${text}`);
    const todo = { id: uuidv4(), text, checked: false, labels: [] };
    dispatch({type: 'add', payload: { type: 'save', id: todo.id, entity: todo }});
  }
  return (
    <>
    <h1>To-do</h1>
    <h2>To-do list with drag & drop, delete, saved in localStorage</h2>
    <Loading show={isLoading} />
    <TodoList todos={todos} dispatch={dispatch} />
    <TodoAdder addTodo={addTodo} />
    </>
  );
}

export default TodoPage;
