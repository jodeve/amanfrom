import classNames from "classnames"
import { FC, HTMLProps } from "react"

const Img: FC<HTMLProps<HTMLImageElement>> = ({ className, ...props }) => {
    return(
        <img
            className={
                classNames(
                    "border rounded-xl",
                    className
                )
            }
            {...props} 
        />
    )
}

export default Img;