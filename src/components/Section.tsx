import { FC, HTMLProps } from "react";
import Title from "./Title";
import classNames from "classnames";

const Section: FC<HTMLProps<HTMLElement> & { subtitle?: string, title?: string }> = ({
    children,
    subtitle,
    title,
    className,
    ...others
}) => {
    return (
        <section 
            className={
                classNames(
                    "section",
                    className
                )
            }
            {...others}
        >
            {
                title || subtitle ?
                    <div className="md:w-1/3 mx-auto text-center">
                        <Title>{title}</Title>
                        <p>{subtitle}</p>
                    </div>
                    : null
            }
            {children}
        </section>
    )
}

export default Section;