import { useState, type ReactNode } from "react";
import { ModalContext } from "../hooks/useModal";
import Modal from "./Modal";

type Props = {
  children: ReactNode;
};

export default function ModalProvider({ children }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <ModalContext value={{ open, setOpen }}>
      <Modal />
      {children}
    </ModalContext>
  );
}
