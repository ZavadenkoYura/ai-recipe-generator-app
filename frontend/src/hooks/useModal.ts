import { createContext, useContext, type Dispatch } from "react";

type IContext = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = createContext<IContext | null>(null);
export const useAppModal = () => useContext<IContext | null>(ModalContext);
