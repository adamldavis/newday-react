import {
  DragEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { Button } from "../Button/Button";
import { Todo } from "../../api/types";
import deleteImage from "../../images/delete.svg";
import "./TodoItem.css";
import "../../index.css";

interface Props {
  id: string;
  text: string;
  moveItem: (fromIndex: number, toId: string) => void;
  modifyItem: (todo: Todo) => void;
  deleteItem: () => void;
  index: number;
  checked: boolean;
  overId: string | null;
  setOver: (over: boolean) => void;
}

export default function TodoItem({
  id,
  text,
  index,
  moveItem,
  modifyItem,
  deleteItem,
  checked,
  overId,
  setOver,
}: Props) {
  const isOver = overId === id;
  const [checkedState, setCheckedState] = useState(checked);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    console.log(`${id} check state=${checkedState}`);
  }, [checkedState]);

  const onClick: MouseEventHandler = (e) => {
    e.preventDefault();
    // updates the item's stored checkedState when changed.
    modifyItem({ id, text, checked: !checkedState, labels: [] });
    setCheckedState(!checkedState);
  };
  const onDrag: DragEventHandler = (e) => {
    console.log("onDrag " + id);
    e.dataTransfer.setData("text/plain", id);
    setDragging(true);
  };
  const onDragEnd: DragEventHandler = (e) => {
    e.preventDefault();
    // use currently dragged over element's id
    console.log(`other=${overId}`);
    if (overId) moveItem(index, overId);
    setDragging(false);
  };

  const onDragCapture: DragEventHandler = (event) => {
    // TODO animate drag
  };

  return (
    <li
      id={id}
      key={index}
      className={`todo ${dragging ? "dragging" : ""} ${isOver ? "over" : ""}`}
      draggable="true"
      onChange={() =>
        modifyItem({ id, text, checked: checkedState, labels: [] })
      }
      onDragEnd={onDragEnd}
      onDragCapture={onDragCapture}
      onDragEnter={() => setOver(true)}
      onDragLeave={() => setOver(false)}
      onDragStart={onDrag}
    >
      <button
        title="check"
        onClick={onClick}
        className={`checkbox ${checkedState ? "checked" : "unchecked"}`}
      >
        {checkedState ? "X" : "O"}
      </button>
      <span className={`${checkedState ? "checked" : ""}`}>{text}</span>
      <span className="del">
        <Button
          backgroundColor="lightgray"
          label="Delete"
          size="small"
          primary={false}
          onClick={deleteItem}
          img={deleteImage}
        />
      </span>
    </li>
  );
}
