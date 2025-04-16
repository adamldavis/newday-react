import React from "react";
import { Button } from "../Button/Button";

interface RedoProps {
  onRedo: () => void;
  active: boolean;
}

const Redo: React.FC<RedoProps> = ({ onRedo, active }) => {
  return (
    <Button
      label="Redo"
      size="small"
      onClick={onRedo}
      backgroundColor={active ? "#f0f0f0" : "#a3a3a3"}
      disabled={!active}
    />
  );
};

export default Redo;
