import { FC, HTMLProps } from "react"

const Title: FC<HTMLProps<HTMLElement>> = ({
    children,
}) => {
    return (
        <h2 className="font-bold text-5xl md:text-6xl mb-5">
            {children}
        </h2>
    )
}

export default Title;