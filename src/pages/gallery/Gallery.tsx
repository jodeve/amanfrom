import OutlinedButton from "components/OutlinedButton";
import Title from "components/Title"
import { MediaInput } from "components/mediaInput/MediaInput";
import Modal from "components/modal/Modal";
import { ModalContext } from "components/modal/ModalContext";
import useModal from "components/modal/useModal";
import { useAppContext } from "contexts/AppContext";
import { useState } from "react";
import { HOST } from "src/App";
import useAos from "src/hooks/useAos";
import GalleryImage from "./GalleryImage";
import { getToken } from "lib/getToken";

const Gallery = () => {

    useAos({});

    const {
        signedIn,
        gallery,
        setGallery,
    } = useAppContext();

    const modal = useModal();

    const [isFetching, setIsFetching] = useState(false);

    const onUploadImage = async (values: { image: string, croppedImage: string }) => {
        try {
            setIsFetching(true);
            const res = await fetch(`${HOST}/images`, {
                method: "post",
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json",
                    "authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify(values)
            })
            if(res.ok){
                const body = await res.json();
                gallery.push(body);
                setGallery([ ...gallery ]);
                modal.onClose();
            }
        } catch (error) {
            
        }finally{
            setIsFetching(false);
        }
    }

    return (
        <div className="pt-20">
            <div className="bg-blue-200 p-10 md:p-20 text-center">
                <Title>
                    Gallery
                </Title>
                {
                    signedIn ?
                        <OutlinedButton
                            onClick={modal.onOpen}
                        >
                            Upload Image
                        </OutlinedButton>
                        : null
                }
            </div>
            <div className="md:w-3/4 mx-auto my-20">
                <div className="md:columns-3 gap-4 px-2 md-:px-0">
                    {
                        gallery.map((image, i) => {
                            return (
                                <GalleryImage 
                                    i={i}
                                    key={i}
                                    image={image}
                                />
                            )
                        })}
                </div>
            </div>
            <ModalContext.Provider value={modal}>
                <Modal>
                    <MediaInput 
                        onImageChange={onUploadImage}
                        isFetching={isFetching}
                    />
                </Modal>
            </ModalContext.Provider>
        </div>
    )
}

export default Gallery;