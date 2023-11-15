import useModal from "components/modal/useModal";
import { IService, useAppContext } from "contexts/AppContext";
import { FC, useState } from "react";
import { HOST } from "src/App";
import AboutServiceForm from "./AboutServiceForm";
import Confirm from "components/Confirm";
import { getToken } from "lib/getToken";

const AboutService: FC<{ service: IService, index: number }> = ({ service, index }) => {

    const deleteModal = useModal();

    const {
        services,
        setServices,
        signedIn,
    } = useAppContext();

    const [isFetching, setIsFetching] = useState(false);

    const onDeleteService = async () => {
        try {
            setIsFetching(true);
            await fetch(`${HOST}/services/${service.id}`, {
                method: "delete",
                headers: {
                    "authorization": `Bearer ${getToken()}`
                },
            })
            services.splice(index, 1);
            setServices([...services]);
            deleteModal.onClose();
        } catch (error) {

        } finally {
            setIsFetching(false);
        }
    }

    let sub;

    if (service.sub) {
        sub = JSON.parse(service.sub);
    }

    const modal = useModal();

    return (
        <li className="" >
            <div className="flex justify-between">
                <h4 className="inline-block">{service.name}</h4>
                {
                    signedIn ?
                        <div className="flex">
                            <button onClick={modal.onOpen}>
                                <i className="fas fa-pencil text-gray-400"></i>
                            </button>
                            <button onClick={deleteModal.onOpen} className="ml-4">
                                <i className="fas fa-trash text-gray-400"></i>
                            </button>
                        </div>
                        : null
                }

            </div>
            {
                sub ?
                    <ol className="ml-12 mt-3 list-[upper-roman]">
                        {
                            sub.map((sub, j) => (
                                <li key={j}>{sub}</li>
                            ))
                        }
                    </ol>
                    : null
            }
            <AboutServiceForm
                modal={modal}
                service={{
                    ...service,
                    sub,
                }}
                index={index}
            />
            <Confirm 
                deleteModal={deleteModal}
                isFetching={isFetching}
                onDelete={onDeleteService}
            />
        </li >
    )
}

export default AboutService;