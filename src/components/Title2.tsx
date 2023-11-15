import { FC, HTMLProps } from "react";

const Title2: FC<HTMLProps<HTMLElement>> = ({
    children,
}) => {
    return (
        <h2
            className="text-4xl mb-4"
        >
            {children}
        </h2>
    )
}

export default Title2;