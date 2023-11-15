import { getToken } from "lib/getToken";
import { useEffect, useState } from "react";
import { HOST } from "src/App";
import { DATA } from "src/data";

const usePage = () => {

    const [state, setState] = useState(DATA);

    const [isFetchingPage, setIsFetching] = useState(false);


    const onChange = ({ target }: any) => {
        state[target.name] = target.value;
        setState({ ...state })
    }

    const onFetchData = async () => {
        try {
            setIsFetching(true);
            const res = await fetch(`${HOST}`, {
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json"
                },
            })
            if (res.ok) {
                const body = await res.json();
                setState(body);
            }
        } catch (error) {

        } finally {
            setIsFetching(false);
        }
    }


    useEffect(() => {
        onFetchData();
    }, [])


    const [isUpdatingPage, setIsFetchingPage] = useState(false);

    const onSave = async () => {
        try {
            setIsFetchingPage(true);
            await fetch(`${HOST}`, {
                method: "put",
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json",
                    "authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify(
                    state,
                )
            })
        } catch (error) {

        } finally {
            setIsFetchingPage(false);
        }
    }



    return {
        state,
        onChange,
        setState,
        isUpdatingPage,
        onSave,
        isFetchingPage,
    }
}

export default usePage;