import React from "react";
import { Button } from "../Button/Button";

interface UndoProps {
  onUndo: () => void;
  active: boolean;
}

const Undo: React.FC<UndoProps> = ({ onUndo, active }) => {
  return (
    <Button
      label="Undo"
      size="small"
      onClick={onUndo}
      backgroundColor={active ? "#f0f0f0" : "#a3a3a3"}
      disabled={!active}
    />
  );
};

export default Undo;
