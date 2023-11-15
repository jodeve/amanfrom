import Title from "components/Title"
import { useAppContext } from "contexts/AppContext";
import Service from "./Service";
import { useEffect, useState } from "react";

const Services = () => {

    const {
        DATA,
        onChange,
    } = useAppContext();

    const [services, setServices] = useState([]);

    const serviceKeys = [
        "serviceOne",
        "serviceTwo",
        "serviceThree",
    ];

    useEffect(() => {
        if (!DATA.servicesS) {
            DATA.servicesS = {
                serviceOne: {
                    name: "",
                    image: "",
                    description: "",
                },
                serviceTwo: {
                    name: "",
                    image: "",
                    description: "",
                },
                serviceThree: {
                    name: "",
                    image: "",
                    description: "",
                }
            }
        }

        let servicesS = DATA.servicesS;


        setServices(Object.values(servicesS));


    }, [DATA])


    const onChangeservice = ({ key, value }) => {
        DATA.servicesS[key] = {
            ...value,
        };
        onChange({ target: { value: DATA.servicesS, name: "serviceS", } })
    }

    return (
        <div className="pt-20">
            <div className="bg-blue-200 p-10 md:p-20 text-center">
                <Title>
                    Services
                </Title>
            </div>
            <div className="md:w-3/4 mx-auto my-20 px-5">
                {
                    services.map((service, i) => <Service
                        i={i}
                        key={i}
                        service={service}
                        onChangeService={onChangeservice}
                        kKey={serviceKeys[i]}
                    />)
                }
            </div>
        </div>
    )
}

export default Services;