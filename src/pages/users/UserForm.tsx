import { FC, useEffect } from "react";
import PrimaryButton from "components/PrimaryButton";
import useFetch from "lib/useFetch";
import { useFormik } from "formik";
import Modal from "components/modal/Modal";
import AltTextInput from "components/AltTextInput";
import ErrorText from "components/ErrorText";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required(),
    role: Yup.string()
        .required(),
    email: Yup.string()
        .email()
        .required(),
});


export interface TableFormModalContentProps {
    formik?: any
    isEditing?: boolean
    asyncErrors?: any
}

export interface TableFormModalProps {
    validationSchema?: any
    title?: string
    initialValues: any
    isEditing?: boolean
    path: string
    i?: number
    rows: any
    setRows: any
}

interface TableFormProps extends TableFormModalProps {
    onClose: () => void
}

export const roles = [
    "Admin",
    "User"
];

export const UserForm: FC<TableFormProps> = ({
    title,
    isEditing,
    initialValues,
    path,
    i,
    onClose,
    rows,
    setRows,
}) => {

    let onResetForm: () => void;

    const handleClose = () => {
        onResetForm();
        onClose();
    }

    const handleError = async (res: Response) => {
        if (res.status === 422) {
            formik.setFieldError("email", "Email has already been taken")
        }
    }

    const {
        onPost,
        isFetching: isPosting
    } = useFetch(path, (body) => {
        rows?.push(body);
        setRows([...rows]);
        handleClose();
    }, handleError);

    const {
        onPut,
        isFetching
    } = useFetch(path, (body) => {
        rows[i!] = body;
        setRows([...rows]);
        handleClose();
    }, handleError);

    const onSubmit = (values: any, { resetForm }: { resetForm: () => void }) => {
        if (!isEditing) onPost(values);
        else onPut(values);
        onResetForm = resetForm;
    }

    const formik = useFormik({
        initialValues: {
            ...initialValues,
        },
        onSubmit,
        validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
    });

    useEffect(() => {
        formik.setValues({ ...initialValues })
    }, [initialValues])

    return (
        <Modal
            title={title}
        >
            <AltTextInput
                name="name"
                label="Name"
                error={formik.errors.name}
                value={formik.values.name}
                onChange={formik.handleChange}
            />
            <AltTextInput
                name="email"
                label="Email"
                error={formik.errors.email}
                value={formik.values.email}
                onChange={formik.handleChange}
            />
            <AltTextInput
                name="password"
                label="Password"
                error={formik.errors.password}
                value={formik.values.password}
                onChange={formik.handleChange}
                type="password"
            />
            <div className="mb-5">
                <select
                    name="role"
                    className="block border rounded-md p-2 mt-2 w-full focus:outline-none focus:border-blue-300 focus:ring-0"
                    onChange={formik.handleChange}
                    value={formik.values["role"]}
                >
                    {
                        roles.map((role, j) => (
                            <option key={j}>{role}</option>
                        ))
                    }
                </select>
                <ErrorText>{formik.errors.role}</ErrorText>
            </div>
            <PrimaryButton
                onClick={() => formik.handleSubmit()}
                isLoading={isPosting || isFetching}
            >
                {isEditing ? "Update" : "Save"}
            </PrimaryButton>
        </Modal>
    )
}

export default UserForm;