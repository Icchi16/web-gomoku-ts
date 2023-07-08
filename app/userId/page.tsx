"use client";

import React from "react";
import {
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { useState } from "react";

export default function Example() {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);

  return (
    <div>
      <Button onClick={toggleOpen}>Open Collapse</Button>
      <Collapse open={open}>Hello</Collapse>
    </div>
  );
}
