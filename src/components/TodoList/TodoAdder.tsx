import React, { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import "../../index.css";
import "./TodoAdder.css";
import addImage from "../../images/add-circle-outline.svg";

interface Props {
  addTodo: (t: string) => void;
}

export default function TodoAdder({ addTodo }: Props) {
  const textRef = React.createRef<HTMLInputElement>();
  const [text, setText] = useState("");
  const add = () => {
    //@ts-ignore
    if (textRef.current) addTodo(textRef.current?.value);
    setText("");
    if (textRef.current) textRef.current.focus();
  };
  useEffect(() => {
    if (textRef.current) textRef.current.focus();
  }, []);

  return (
    <>
      <input
        id="text"
        className="text"
        ref={textRef}
        type="text"
        value={text}
        onKeyUp={(e) => {
          if (e.key === "Enter") add();
        }}
        onChange={(e) => setText(textRef.current?.value as string)}
      />
      <Button
        label="Add"
        img={addImage}
        backgroundColor="palegreen"
        onClick={add}
      />
    </>
  );
}
