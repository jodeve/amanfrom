import { useAppContext } from "contexts/AppContext";
import { FC } from "react";
import classNames from "classnames";
import Img from "components/Img";
import useModal from "components/modal/useModal";
import ServiceForm from "./ServiceForm";
import useAos from "src/hooks/useAos";
import OutlinedButton from "components/OutlinedButton";

export interface ServiceProps {
    service: {
        name: string;
        image: string;
        description: string;
    };
    onChangeService: ({ key, value }: { key: string; value: any; }) => void;
    i: number;
    kKey: string;
}

const Service: FC<ServiceProps> = ({ service, onChangeService, i, kKey, }) => {

    useAos({});

    const modal = useModal();

    const {
        signedIn,
    } = useAppContext();


    const handleChangeService = (values: any) => {
        modal.onClose();
        onChangeService({
            key: kKey, value: {
                ...values,
            }
        })
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
                        {service.name || "Service Name"}
                    </h3>
                    <p>{service.description || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid itaque similique vitae dicta. Iure illo consectetur deleniti provident eligendi vel animi, culpa sapiente exercitationem sunt praesentium, enim eaque quidem! Aliquam!"}</p>
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
                <Img src={service.image || `/imgs/1.jpeg`} alt="" />
            </div>
            <ServiceForm
                modal={modal}
                handleChangeService={handleChangeService}
                service={service}
            />
        </div>
    )
}

export default Service;