import { InputHTMLAttributes } from "react";

export interface IUseInput extends InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
    label?: string
    formik?: any
    helperText?: string
    margin?: boolean
    asyncErrors?: any
}

const useInput = (options: IUseInput) => {

    const {
        label = "",
        id,
        name,
        value,
        formik,
        onChange,
        helperText,
        placeholder,
        asyncErrors,
    } = options;

    let inputId = id || label.toLowerCase();

    let inputName = name;

    if (!inputName) {
        if (placeholder) inputName = placeholder.toLowerCase();
        else inputName = label.toLowerCase();
    }

    let inputValue = value

    if (!inputValue && formik) inputValue = formik.values[inputName]

    let handleChange = onChange

    if (!handleChange && formik) handleChange = formik.handleChange

    let inputHelperText = helperText;

    if (asyncErrors && asyncErrors[inputName]) {
        inputHelperText = asyncErrors[inputName]
    }

    if (!inputHelperText && formik) {
        inputHelperText = formik.errors[inputName];
    }

    return {
        inputId,
        inputName,
        inputValue,
        handleChange,
        inputHelperText,
    }
}

export default useInput;