import ErrorText from "components/ErrorText";
import PrimaryButton from "components/PrimaryButton";
import Section from "components/Section";
import TextInput from "components/TextInput";
import Title from "components/Title";
import Modal from "components/modal/Modal";
import { ModalContext } from "components/modal/ModalContext";
import useModal from "components/modal/useModal";
import { useFormik } from "formik";
import { useState } from "react";
import { HOST } from "src/App";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required(),
    email: Yup.string()
        .email()
        .required(),
    message: Yup.string()
        .min(8)
        .required()
});

const GetInTouch = () => {

    const modal = useModal();

    const [isFetching, setIsFetching] = useState(false);

    const onSubmit = async (values: any) => {
        try {
            setIsFetching(true);
            const res = await fetch(`${HOST}/messages`, {
                method: "post",
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json",
                },
                body: JSON.stringify(values),
            })
            if(res.ok){
                modal.onOpen();
                formik.resetForm();
            }
        } catch (error) {

        } finally {
            setIsFetching(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: "",
        },
        onSubmit,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema,
    })

    return (
        <Section
            id="contact"
            className="bg-blue-200"
        >
            <div className="md:w-1/2 mx-auto">
                <div className="flex w-full items-center">
                    <div className="w-full  space-y-10">
                        <div className="text-center">
                            <Title>Get In Touch</Title>
                        </div>
                        <form onSubmit={formik.handleSubmit} data-aos="flip-left">
                            <div className="md:flex gap-2">
                                <TextInput
                                    name="name"
                                    label="Name"
                                    onChange={formik.handleChange}
                                    value={formik.values["name"]}
                                    error={formik.errors.name}
                                />
                                <TextInput
                                    name="email"
                                    label="Email"
                                    onChange={formik.handleChange}
                                    value={formik.values["email"]}
                                    error={formik.errors.email}
                                />
                            </div>
                            <div className="mb-5 w-full">
                                <label htmlFor="">Message</label>
                                <textarea
                                    name={"message"}
                                    onChange={formik.handleChange}
                                    value={formik.values["message"]}
                                    className="block rounded-md p-2 mt-2 w-full focus:outline-none focus:border-blue-300 focus:ring-0"
                                />
                                <ErrorText>{formik.errors.message}</ErrorText>
                            </div>
                            <div className="text-center">
                                <PrimaryButton
                                    type="submit"
                                    isLoading={isFetching}
                                >
                                    Send
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ModalContext.Provider value={modal}>
                <Modal>
                    <p className="text-green-500 font-bolds text-3xl">Message Sent Successfully!</p>
                </Modal>
            </ModalContext.Provider>
        </Section>
    )
}

export default GetInTouch;