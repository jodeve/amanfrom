import { useState } from "react";
import { getToken } from "./getToken";

interface IOptions {
    handleError?: boolean
}

const useFetch = (
    path: string, 
    onSuccess: (body: any, headers?: Headers) => void, 
    onError?: (res?: any) => void, 
    options?: IOptions
) => {

    const [isFetching, setIsFetching] = useState(false);


    const onFetch = async (method = 'get', body = undefined) => {
    
        let host = "localhost:4000";

        const apiHost = `${host}/api`;

        const token = getToken();
        const _path = path.endsWith('/') ? path.substr(0, path.length - 1) : path;
        try {
            setIsFetching(true);
            const res = await fetch(`${apiHost}${_path}`, {
                method,
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });
            console.log(`[${method}] ${path}: ${res.status}`);
            if (res.ok) {
                try {
                    const body = await res.json();
                    onSuccess(body, res.headers);
                }catch(e){
                    onSuccess(null, res.headers);
                }
            } else {
                if(res.status == 500){
                    throw new Error("An unknown error occured");
                }                
                if (onError) onError(res);
            }
        } catch (e) {
            console.log(e);
            
            if(options?.handleError && onError) onError();
            //else onSetMessage("An unknown error occured");
        } finally {
            setIsFetching(false)
        }
    }

    const onPost = async (body?: any) => onFetch("post", body)

    const onPut = async (body?: any) => onFetch("put", body)

    const onDelete = async (body?: any) => onFetch("delete", body)

    return {
        onFetch,
        isFetching,
        onPost,
        onPut,
        onDelete,
    }

}

export default useFetch;