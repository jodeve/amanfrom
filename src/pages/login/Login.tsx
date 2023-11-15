import { useFormik } from "formik";
import * as Yup from "yup";
import useLogin from "./useLogin";
import AltTextInput from "components/AltTextInput";
import ErrorText from "components/ErrorText";
import ActivityIndicator from "components/ActivityIndicator";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required(),
    password: Yup.string()
        .min(8)
        .required()
});

const Login = () => {

    const {
        isFetching,
        onSubmit,
        invalid,
    } = useLogin();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit,
        validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
    });

    return (
        <div>
            <div className="min-h-full flex flex-col justify-center pb-12 pt-20 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Login
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" action="" onSubmit={formik.handleSubmit}>
                            <div>
                                <AltTextInput
                                    name="email"
                                    label="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                                {
                                    invalid || formik.errors.email ?
                                        <ErrorText>{ formik.errors.email || "Invalid Email or Password" }</ErrorText>
                                        : null
                                }
                            </div>
                            <div>
                                <AltTextInput
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                                {
                                    formik.errors.password ?
                                        <ErrorText>{formik.errors.password}</ErrorText>
                                        : null
                                }
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-300 px-3 md:px-10 py-3 border rounded-xl hover:bg-blue-400 text-md inline-block"
                            >
                                {isFetching ? <ActivityIndicator /> : "Login"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;