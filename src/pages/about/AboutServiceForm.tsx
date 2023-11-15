import { useEffect, useState } from "react";
import { useAppContext } from "contexts/AppContext";
import AltTextInput from "components/AltTextInput";
import OutlinedButton from "components/OutlinedButton";
import { ModalContext } from "components/modal/ModalContext";
import Modal from "components/modal/Modal";
import { useFormik } from "formik";
import { HOST } from "src/App";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required(),
});

const AboutServiceForm = ({
    modal,
    service,
    index = null,
}) => {

    const {
        services,
        setServices,
    } = useAppContext();

    let isEditing = Boolean(service);

    const onAddService = (values) => {
        const _services = services;
        if(isEditing) _services[index] = values;
        else _services.push(values);
        setServices([..._services])
        if(!isEditing) formik.resetForm();
        modal.onClose();
    }

    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (isEditing) {
            let _service  = service;       
            formik.setValues({
                ..._service,
            })
        }
    }, [])

    const handleAddService = async (values: any) => {
        setIsFetching(true);
        try {
            let path = isEditing ? `${HOST}/services/${service.id}` : `${HOST}/services`;
            let method = isEditing ? "put" : "post";
            const res = await fetch(path, {
                method: method,
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json"
                },
                body: JSON.stringify(values),
            });
            if (res.ok) {
                const body = await res.json();
                onAddService(body);
            }
        } catch (error) {

        } finally {
            setIsFetching(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            sub: [],
        },
        onSubmit: handleAddService,
        validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
    })

    const [sub, setSub] = useState("");

    const onAddSub = () => {
        let _sub = formik.values.sub;
        if(!_sub) _sub = [];
        _sub.push(sub);
        formik.setFieldValue("sub", _sub);
        setSub("")
        //console.log(formik.values);

    }

    const onRemoveSub = (sub: string) => {
        let _sub = formik.values.sub;
        let i = _sub.indexOf(sub);
        _sub.splice(i, 1);
        formik.setFieldValue("sub", _sub);
    }    

    return (

        <ModalContext.Provider value={modal}>
            <Modal
                title={
                    `${isEditing ? "Edit" : "New"} Service`
                }
            >
                <AltTextInput
                    label="Name"
                    name="name"
                    value={formik.values["name"]}
                    onChange={formik.handleChange}
                    error={formik.errors.name}
                />
                <div className="flex items-center mb-5">
                    <AltTextInput
                        placeholder="Sub Service"
                        value={sub}
                        onChange={({ target }: any) => setSub(target.value)}
                        margin={false}
                    />
                    <button className="p-2 flex items-center cursor-pointer" onClick={onAddSub}>
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
                {
                    formik.values.sub ?
                        <>
                            <ul className="ml-4 mb-4">
                                {
                                    formik.values.sub.map((sub, i) => {
                                        return (
                                            <li key={i} className="list-[upper-roman]">
                                                <div className="flex items-center">
                                                    <span>{sub}</span>
                                                    <span className="text-gray-500 ml-5 cursor-pointer" onClick={() => onRemoveSub(sub)}>
                                                        <i className="fa fa-xmark"></i>
                                                    </span>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </>
                        : null
                }
                <div className="flex justify-end">
                    <OutlinedButton
                        onClick={() => formik.handleSubmit()}
                        isLoading={isFetching}
                    >
                        {`${isEditing ? "Update" : "Add"} Service`}

                    </OutlinedButton>
                </div>
            </Modal>
        </ModalContext.Provider>
    )
}

export default AboutServiceForm;