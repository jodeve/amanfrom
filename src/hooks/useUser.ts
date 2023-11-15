import { getToken } from "lib/getToken";
import { useEffect, useState } from "react";
import { HOST } from "src/App";

const useUser = () => {

    const [signedIn, setSignedIn] = useState(false);

    const [isFetchingUser, setIsFetchingUser] = useState(false);

    const onFetchUser = async () => {
        try {
            setIsFetchingUser(true);
            const res = await fetch(`${HOST}/user`, {
                method: "get",
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json",
                    "authorization": `Bearer ${getToken()}`,
                },
            })
            if(res.ok){
                setSignedIn(true);
            }
        } catch (error) {

        } finally {
            setIsFetchingUser(false);
        }
    }


    useEffect(() => {
        onFetchUser();
    }, []);

    return {
        isFetchingUser,
        signedIn,
        setSignedIn,
    }
}

export default useUser;