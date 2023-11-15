import { useEffect, useState } from "react";
import { HOST } from "src/App";

const useImages = () => {


    const [gallery, setGallery] = useState([]);

    const [isFetchingImages, setIsFetchingImages] = useState(false);


    const onFetchImages = async () => {
        try {
            setIsFetchingImages(true);
            const res = await fetch(`${HOST}/images`, {
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json"
                },
            })
            if (res.ok) {
                const body = await res.json();
                setGallery(body);
            }
        } catch (error) {

        } finally {
            setIsFetchingImages(false);
        }
    }


    useEffect(() => {
        onFetchImages();
    }, []);


    return {
        gallery,
        setGallery,
        isFetchingImages,
    }
}

export default useImages;