import Title from "components/Title"
import { useAppContext } from "contexts/AppContext";
import Service from "./Service";
import { useEffect, useState } from "react";
import useFetch from "lib/useFetch";
import OutlinedButton from "components/OutlinedButton";
import useModal from "components/modal/useModal";
import { ModalContext } from "components/modal/ModalContext";
import ServiceForm from "./ServiceForm";

const Services = () => {

    const {
        signedIn
    } = useAppContext()

    const [services, setServices] = useState([]);

    const {
        onFetch
    } = useFetch("/api/servicesm", setServices);

    useEffect(() => {
        onFetch()
    }, [])


    const onChangeService = () => {

    }

    const modal = useModal();

    return (
        <div className="pt-20">
            <div className="bg-blue-200 p-10 md:p-20 text-center">
                <Title>
                    Services
                </Title>
                {
                    signedIn ?
                        <OutlinedButton
                            onClick={modal.onOpen}
                        >
                            Add Service
                        </OutlinedButton>
                        : null
                }
            </div>
            <div className="md:w-3/4 mx-auto my-20 px-5">
                {
                    services.map((service, i) => <Service
                        i={i}
                        key={i}
                        service={service}
                        setServices={setServices}
                        services={services}
                    />)
                }
            </div>
            <ModalContext.Provider value={modal}>
                <ServiceForm 
                    setServices={setServices}
                    services={services}
                    path={`/api/servicesm`}
                    i={null}
                    service={null}
                    onClose={modal.onClose}
                />
            </ModalContext.Provider>
        </div>
    )
}

export default Services;