import { DragEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { Todo } from '../../api/types';
import deleteImage from '../../images/delete.svg';
import './TodoItem.css';
import '../../index.css';

interface Props {
    id: string;
    text: string;
    moveItem: (fromIndex: number, toId: string) => void;
    modifyItem: (todo: Todo) => void;
    deleteItem: () => void;
    index: number;
    checked: boolean;
}

export default function TodoItem({ id, text, index, moveItem, modifyItem, deleteItem, checked }: Props) {

    const [ checkedState, setCheckedState ] = useState(checked);
    const [ dragging, setDragging ] = useState(false);
    const [ isOver, setOver ] = useState(false);

    useEffect(() => {
        console.log(`${id} check state=${checkedState}`);   
    }, [checkedState]);
    
    const onClick: MouseEventHandler = (e) => {
        e.preventDefault();
        // updates the item's stored checkedState when changed.
        modifyItem({ id, text, checked: !checkedState, labels: [] });
        setCheckedState(!checkedState);
    }
    const onDrag: DragEventHandler = (e) => {
        console.log("onDrag " + id);
        e.dataTransfer.setData('text/plain', id);
        setDragging(true);
    }
    const onDragEnd: DragEventHandler = (e) => {
        e.preventDefault();
        // get element from x, y
        const element = document.elementFromPoint(e.pageX, e.pageY);
        const otherId = element?.getAttribute('id');
        console.log(`other=${otherId}`);
        if (otherId) moveItem(index, otherId);
        setDragging(false);
    }
    
    const onDragCapture: DragEventHandler = (event) => {
        // Array.from(document.getElementsByClassName('dragging')).forEach(e => {
        //     e.setAttribute('position', 'absolute');
        //     e.setAttribute('left', `${event.pageX}px`);
        //     e.setAttribute('top', `${event.pageY}px`);
        // });
    }

    return <li id={id}
            key={index}
            className={`todo ${dragging ? 'dragging' : ''} ${isOver ? 'over' : ''}`}
            draggable="true"
            onChange={() => modifyItem({id, text, checked: checkedState, labels: []})}
            onDragEnd={onDragEnd}
            onDragCapture={onDragCapture}
            onDragEnter={e => { setOver(true); }}
            onDragLeave={e => setOver(false)}
            onDragStart={onDrag}>
            <button 
            title="check" 
            onClick={onClick} 
            className={`checkbox ${checkedState ? "checked" : "unchecked"}`}>
                {checkedState ? "X" : "O"}
                </button>
            <span className={`${checkedState ? "checked" : ""}`}>{text}</span>
            <span className='del'>
                <Button 
                    backgroundColor='lightgray' 
                    label="Delete" size='small' 
                    primary={false} onClick={deleteItem} img={deleteImage} />
            </span>
        </li>;
}
