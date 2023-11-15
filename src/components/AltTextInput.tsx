import { FC, HTMLProps } from "react";
import ErrorText from "./ErrorText";
import { FormikErrors } from "formik";
import classNames from "classnames";


const AltTextInput: FC<HTMLProps<HTMLInputElement> & {
    error?: string | FormikErrors<any> | string[] | FormikErrors<any>[],
    margin?: boolean;
}> = ({
    name,
    label,
    error,
    margin = true,
    ...others
}) => {



    return (
        <div className={
            classNames(
                margin ? "mb-5" : "",
                "w-full"
            )
        }>
            <label htmlFor="">{label}</label>
            <input
                name={name}
                type="text"
                className="block rounded-md p-2 mt-2 w-full border focus:outline-none focus:border-blue-300 focus:ring-0"
                {...others}
            />
            <ErrorText>{error}</ErrorText>
        </div>
    )
}

export default AltTextInput;