import { FC, HTMLAttributes } from "react";
import ActivityIndicator from "./ActivityIndicator";
import classNames from "classnames";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement>  { 
    isLoading?: boolean;
    type?: "button" | "submit" | "reset";
} 

const BaseButton: FC<ButtonProps> = ({ children, isLoading, className, ...others }) => {
    return (
        <button 
            className={
                classNames(
                    "px-3 md:px-10 py-3 border rounded-xl text-md inline-block",
                    className,
                )
            }
            {...others}
        >
            { isLoading ? <ActivityIndicator /> : children }
        </button>
    )
}

export default BaseButton;