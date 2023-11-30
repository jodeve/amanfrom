import { createContext } from "react";

export const ImageContext = createContext<{
    onSetCurrentImage: (image: number) => void
}>(null);