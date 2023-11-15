import { FC, HTMLProps } from "react";
import ErrorText from "./ErrorText";
import { FormikErrors } from "formik";

const TextInput: FC<HTMLProps<HTMLInputElement> & {
    error?: string | FormikErrors<any> | string[] | FormikErrors<any>[]
}> = ({
    name,
    label,
    error,
    ...others
}) => {



        return (
            <div className="mb-5 w-full">
                <label htmlFor="">{label}</label>
                <input
                    name={name}
                    type="text"
                    className="block rounded-md p-2 mt-2 w-full focus:outline-none focus:border-blue-300 focus:ring-0"
                    {...others}
                />
                <ErrorText>{error}</ErrorText>

            </div>
        )
    }

export default TextInput;