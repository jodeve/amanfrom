import { FormikErrors } from "formik";

const ErrorText = ({ children }: { children: string | FormikErrors<any> | string[] | FormikErrors<any>[] }) => {
    return (
        //@ts-ignore
        <p className="text-sm text-red-600">{children}</p>
    )
}

export default ErrorText;