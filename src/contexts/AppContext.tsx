import { createContext, useContext } from "react";
import { DATA } from "src/data";

export interface IService {
    id: number;
    name: string;
    sub?: string;
}

export interface IGallery {
    image: string;
    croppedImage: string;
}

export interface IAppContext {
    DATA: typeof DATA;
    signedIn: boolean;
    setSignedIn: (signedIn: boolean) => void;
    onChange: ({ target }: any) => void;
    isUpdatingPage: boolean;
    onSave: () => void;
    services: IService[];
    setServices: (services: IService[]) => void;
    gallery: IGallery[];
    setGallery: (gallery: IGallery[]) => void;
}

export const AppContext  = createContext<IAppContext>(null);

export const useAppContext = () => useContext(AppContext);