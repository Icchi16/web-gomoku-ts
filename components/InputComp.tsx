"use client";

import { Input } from "@material-tailwind/react";
import { size } from "@material-tailwind/react/types/components/input";

interface InputProps {
  label?: string;
  labelProps?: { className?: string };
  size?: size;
}

const InputComp: React.FC<InputProps> = ({ label, size }) => {
  return <Input variant="standard" label={label} size={size} />;
};

export default InputComp;
