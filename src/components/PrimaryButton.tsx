import { FC } from "react";
import BaseButton, { ButtonProps } from "./BaseButton";

export interface PrimaryButtonProps extends ButtonProps {
}

const PrimaryButton: FC<PrimaryButtonProps> = (props) => {
    return (
        <BaseButton 
            className="bg-blue-300 hover:bg-blue-400 border-blue-400"
            {...props}
        />
    )
}

export default PrimaryButton;