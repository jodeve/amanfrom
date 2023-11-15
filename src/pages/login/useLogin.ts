import { AppContext } from "contexts/AppContext";
import { storeToken } from "lib/storeToken";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HOST } from "src/App";

interface LoginInput {
    email: string
    password: string
}

const useLogin = () => {

    const navigate = useNavigate();
    const [isFetching, setIsFetching] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const { search } = useLocation();

    const query = new URLSearchParams(search);

    const {
        setSignedIn,
    } = useContext(AppContext);

    const onSubmit = async (values: LoginInput) => {
        try {
            setIsFetching(true);
            const res = await fetch(`${HOST}/login`, {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json"
                },
                body: JSON.stringify(values)
            });
            if (res.ok) {
                const headers = res.headers;
                console.log(headers);
                
                storeToken({
                    headers: headers!,
                    setSignedIn,
                })
                let redirect = query.get("redirect");
                if (!redirect) redirect = "/";
                navigate(redirect);
            } else if (res.status == 401) {
                setInvalid(true);
            }
        } catch (e) {
            console.log(e);
            
        } finally {
            setIsFetching(false)
        }
    }    

    return {
        onSubmit,
        isFetching,
        invalid,
    }
}

export default useLogin;