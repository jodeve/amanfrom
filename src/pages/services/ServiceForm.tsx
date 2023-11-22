import { useAppContext } from "contexts/AppContext";
import Modal from "components/modal/Modal";
import { ModalContext } from "components/modal/ModalContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import ServiceFormImage from "./ServiceFormImage";
import ErrorText from "components/ErrorText";
import { useEffect } from "react";
import AltTextInput from "components/AltTextInput";
import useFetch from "lib/useFetch";
import PrimaryButton from "components/PrimaryButton";


const validationSchema = Yup.object().shape({
    image: Yup.string()
        .required(),
    name: Yup.string()
        .required(),
    description: Yup.string()
        .required()
});

const ServiceForm = ({
    service,
    setServices,
    services,
    path,
    i,
    onClose,
}) => {

    const {
        gallery,
    } = useAppContext();

    /*useEffect(() => {
        let _service = service.name;
        if (_service == "") {
            _service = services.length > 0 ? services[0].name : "";
        }
        formik.setValues({ ...service, name: _service })
    }, [service, services])
*/

    const onSubmit = (values: any, { resetForm }: { resetForm: () => void }) => {
        if (!isEditing) onPost(values);
        else onPut(values);
        onResetForm = resetForm;
    }
    let isEditing = Boolean(service)


    const formik = useFormik({
        initialValues: {
            ...service
        },
        onSubmit,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema,
    })

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
        services?.push(body);
        setServices([...services]);
        handleClose();
    }, handleError);

    const {
        onPut,
        isFetching
    } = useFetch(path, (body) => {
        services[i!] = body;
        setServices([...services]);
        handleClose();
    }, handleError);



    useEffect(() => {
        formik.setValues({ ...service })
    }, [service])


    return (
        <>

            <Modal
                title={`${isEditing ? 'Update' : 'Add'} Service`}
            >
                <form onSubmit={formik.handleSubmit} className="space-y-3">
                    <div>
                        <div className="grid grid-cols-4 gap-2">
                            {
                                gallery.map((image, j) => <ServiceFormImage
                                    key={j}
                                    formik={formik}
                                    image={image}
                                />)
                            }
                        </div>
                        <ErrorText>{formik.errors.image}</ErrorText>
                    </div>
                    <div>
                        <AltTextInput
                            name="name"
                            label="Name"
                            error={formik.errors.name}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="my-5 w-full">
                        <label htmlFor="">Description</label>
                        <textarea
                            name={"description"}
                            value={formik.values["description"]}
                            onChange={formik.handleChange}
                            className="block border rounded-md p-2 mt-2 w-full focus:outline-none focus:border-blue-300 focus:ring-0"
                        />
                        <ErrorText>{formik.errors.description}</ErrorText>
                    </div>
                    <PrimaryButton type="submit" isLoading={isFetching || isPosting}>
                        {`${isEditing ? 'Update' : 'Add'} Service`}
                    </PrimaryButton>
                </form>
            </Modal>
        </>
    )
}

export default ServiceForm;