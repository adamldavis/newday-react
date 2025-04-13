import React, { DragEvent, DragEventHandler, ReactElement } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { Todo } from '../../api/types';
import ArrayUtil from '../../util/ArrayUtil';
import './TodoList.css';
import '../../index.css';

interface Props {
    todos: Todo[];
    dispatch: React.Dispatch<any>;
}

function TodoList({ todos, dispatch }: Props) {

    const moveItem = (fromIndex: number, id: string) => {
        //TODO
        //todoService.getAll...
        if (todos.length > 1) {
            const copy = ArrayUtil.moveElementTo(todos, (it) => it.id === id, fromIndex);
            //setTodos(copy);
        }
    }
    const deleteItem = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.style.opacity = '50%';
            setTimeout(() => element.style.opacity = '', 200);
        }
        // TODO remove
    }
    const modifyItem = (todo: Todo) => {
        // TODO : modify
    }
    const items: ReactElement[] = todos.map((it, i) => 
        (<TodoItem 
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
