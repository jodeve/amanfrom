import { FC, HTMLProps } from "react";

const Title3: FC<HTMLProps<HTMLElement>> = ({
    children,
}) => {
    return (
        <h3
            className="text-2xl mb-3"        
        >
            {children}
        </h3>
    )
}

export default Title3;
