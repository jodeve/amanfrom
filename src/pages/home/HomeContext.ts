import React, { createContext } from "react";

export interface IHomeContext {
    ref: React.RefObject<HTMLDivElement>;
    scrollTo: (scroll: any) => void;
}

export const HomeContext = createContext({} as IHomeContext );