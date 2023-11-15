import { useEffect, useState } from "react";
import { HOST } from "src/App";

const useServices = () => {

    const [services, setServices] = useState([]);

    const [isFetchingServices, setIsFetchingServices] = useState(false);

    const onFetchServices = async () => {
        try {
            setIsFetchingServices(true);
            const res = await fetch(`${HOST}/services`, {
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json"
                },
            })
            if (res.ok) {
                const body = await res.json();
                setServices(body);
            }
        } catch (error) {

        } finally {
            setIsFetchingServices(false);
        }
    }


    useEffect(() => {
        onFetchServices();
    }, [])


    return {
        services,
        setServices,
        isFetchingServices,
    }
}


export default useServices;