"use client";

import { ReactElement, ReactNode } from "react";

interface ModalCompProp {
  children: ReactNode;
}

const ModalComp: React.FC<ModalCompProp> = ({ children }) => {
  return <div>{children}</div>;
};

export default ModalComp;
