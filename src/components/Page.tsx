import classNames from "classnames";
import { FC, HTMLProps } from "react";

const Page: FC<HTMLProps<HTMLElement> & { section?: boolean }> = ({ children, section = true, className }) => {
    return(
        <div className={
            classNames(
                "w-2/3 mx-auto",
                section ? "section" : "",
                className,
            )
        }>
            {children}
        </div>
    )
}

export default Page;