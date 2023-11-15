import { FC } from "react";
import BaseButton, { ButtonProps } from "./BaseButton";

const OutlinedButton: FC<ButtonProps> = (props) => {
    return (
        <BaseButton
            className="border-blue-300 hover:bg-blue-300"
            {...props}
        />
    )
}

export default OutlinedButton;