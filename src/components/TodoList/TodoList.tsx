import React, { DragEvent, DragEventHandler, ReactElement } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { Todo } from '../../api/types';
import './TodoList.css';
import '../../index.css';

interface Props {
    todos: Todo[];
    dispatch: React.Dispatch<any>;
}

function TodoList({ todos, dispatch }: Props) {

    // moves from index to index of item at given ID
    const moveItem = (fromIndex: number, id: string) => {
        if (todos.length > 1) {
            const toIndex = todos.findIndex((it) => it.id === id);
            const entity = todos[fromIndex];
            dispatch({type: 'move', payload: {entity, from: fromIndex, to: toIndex}});
        }
    }
    const deleteItem = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // fade out
            element.style.opacity = '50%';
        }
        const index = todos.findIndex(it => it.id === id);
        const entity = todos[index];
        dispatch({type: 'delete', payload: {id, entity, index}});
    }
    const modifyItem = (todo: Todo) => {
        // TODO : modify
    }
    const items: ReactElement[] = todos.map((it, i) => 
        (<TodoItem 
            key={it.id}
            id={it.id} 
            text={it.text} 
            index={i} 
            moveItem={moveItem} 
            deleteItem={() => deleteItem(it.id)} 
            modifyItem={modifyItem}
            checked={it.checked} />)
        );

    const onDrop: DragEventHandler = (e: DragEvent) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        // todo
    }

    return <div className='todo-list' 
            onDrop={onDrop}>
        <ul>{items}</ul>
    </div>;
}

export default TodoList;
