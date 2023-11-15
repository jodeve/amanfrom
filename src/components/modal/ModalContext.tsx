import { createContext } from "react";

export interface IModalContext {
    open: boolean
    onClose: () => void
    onOpen: () => void
    onToggle: () => void
}

export const ModalContext = createContext<IModalContext>({} as IModalContext);