import { useAppContext } from "contexts/AppContext";
import { FC } from "react";
import classNames from "classnames";
import Img from "components/Img";
import useModal from "components/modal/useModal";
import ServiceForm from "./ServiceForm";
import useAos from "src/hooks/useAos";
import OutlinedButton from "components/OutlinedButton";
import { ModalContext } from "components/modal/ModalContext";

export interface ServiceProps {
    service: {
        id: number;
        name: string;
        image: string;
        description: string;
    };
    i: number;
    setServices: any;
    services: any;
}

const Service: FC<ServiceProps> = ({ service, i, setServices, services, }) => {

    useAos({});

    const modal = useModal();

    const {
        signedIn,
    } = useAppContext();


    const handleChangeService = (values: any) => {
        modal.onClose();

    }

    const onModalOpen = () => {
        if (!signedIn) return;
        modal.onOpen();
    }

    return (
        <div
            className={
                classNames(
                    "grid md:grid-cols-2 gap-10 mt-20",
                )
            }
            data-aos={i % 2 == 0 ? "fade-left" : "fade-right"}
            data-aos-delay={i * 800}
            data-aos-duration="1000"
        >
            <div
                className={
                    classNames(
                        i % 2 == 0 ? "md:order-1" : "",
                        "flex flex-col justify-between"
                    )
                }
            >
                <div className="">
                    <h3 className="font-bold text-3xl mb-2">
                        {service.name}
                    </h3>
                    <p>{service.description}</p>
                </div>
                {
                    signedIn ?
                        <div>
                            <OutlinedButton onClick={onModalOpen}>
                                Edit
                            </OutlinedButton>
                        </div>
                        : null
                }
            </div>
            <div>
                <Img src={service.image} alt="" />
            </div>
            <ModalContext.Provider
                value={modal}
            >
                <ServiceForm
                    i={i}
                    service={service}
                    setServices={setServices}
                    services={services}
                    path={`/api/servicesm/${service.id}`}
                    onClose={modal.onClose}
                />
            </ModalContext.Provider>
        </div>
    )
}

export default Service;