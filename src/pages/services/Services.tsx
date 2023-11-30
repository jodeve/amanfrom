import Title from "components/Title"
import { useAppContext } from "contexts/AppContext";
import Service from "./Service";
import { useEffect, useState } from "react";
import useFetch from "lib/useFetch";
import OutlinedButton from "components/OutlinedButton";
import useModal from "components/modal/useModal";
import { ModalContext } from "components/modal/ModalContext";
import ServiceForm from "./ServiceForm";
import ActivityIndicator from "components/ActivityIndicator";

const Services = () => {

    const {
        signedIn
    } = useAppContext()

    const [services, setServices] = useState([]);

    const {
        onFetch,
        isFetching,
    } = useFetch("/api/servicesm", setServices);

    useEffect(() => {
        onFetch()
    }, [])

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
                    isFetching ?
                        <div className="flex justify-center items-center">
                            <ActivityIndicator />
                        </div>
                        :
                        <>
                            <div className="grid md:grid-cols-3 gap-4">
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
                        </>
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