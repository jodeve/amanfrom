import { useAppContext } from "contexts/AppContext";
import Modal from "components/modal/Modal";
import { ModalContext } from "components/modal/ModalContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import ServiceFormImage from "./ServiceFormImage";
import ErrorText from "components/ErrorText";
import { useEffect } from "react";


const validationSchema = Yup.object().shape({
    image: Yup.string()
        .required(),
    name: Yup.string()
        .required(),
    description: Yup.string()
        .required()
});

const ServiceForm = ({
    modal,
    handleChangeService,
    service,
}) => {

    const {
        signedIn,
        gallery,
        services,
    } = useAppContext();

    useEffect(() => {
        let _service = service.name;
        if(_service == "") {
            _service = services.length > 0 ? services[0].name : "";
        }
        formik.setValues({ ...service, name: _service })
    }, [service, services])
    

    const formik = useFormik({
        initialValues: {
            ...service
        },
        onSubmit: handleChangeService,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema,
    })

    return (
        <>
            {
                signedIn ?
                    <ModalContext.Provider
                        value={modal}
                    >
                        <Modal
                            title="Update Service Placeholder"
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
                                    <select
                                        name="name"
                                        className="block border rounded-md p-2 mt-2 w-full focus:outline-none focus:border-blue-300 focus:ring-0"
                                        onChange={formik.handleChange}
                                        value={formik.values["name"]}
                                    >
                                        {
                                            services.map((service, j) => (
                                                <option key={j}>{service.name}</option>
                                            ))
                                        }
                                    </select>
                                    <ErrorText>{formik.errors.name}</ErrorText>
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
                                <button
                                    className="bg-blue-300 px-3 md:px-10 py-3 border rounded-xl hover:bg-blue-400 text-md inline-block"
                                    type="submit"
                                >
                                    Update
                                </button>
                            </form>
                        </Modal>
                    </ModalContext.Provider>
                    : null
            }
        </>
    )
}

export default ServiceForm;