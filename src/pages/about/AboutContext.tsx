import React, { createContext } from "react";

export interface IAboutContext {
    refs: React.MutableRefObject<{
        vision: React.RefObject<HTMLDivElement>,
        mission: React.RefObject<HTMLDivElement>,
        motto: React.RefObject<HTMLDivElement>,
        services: React.RefObject<HTMLDivElement>,
    }>;
    scrollTo: (scroll: any) => void;
}

export const AboutContext = createContext({} as IAboutContext );