import Confirm from "components/Confirm";
import Img from "components/Img";
import useModal from "components/modal/useModal";
import { useAppContext } from "contexts/AppContext";
import { getToken } from "lib/getToken";
import { useState } from "react";
import { HOST } from "src/App";

const GalleryImage = ({ image, i }) => {

    const {
        gallery,
        setGallery,
        signedIn,
    } = useAppContext();

    const deleteModal = useModal();

    const [isFetching, setIsFetching] = useState(false);

    const onDeleteService = async () => {
        try {
            setIsFetching(true);
            await fetch(`${HOST}/images/${image.id}`, {
                method: "delete",
                headers: {
                    "authorization": `Bearer ${getToken()}`
                },
            })
            gallery.splice(i, 1);
            setGallery([...gallery]);
            deleteModal.onClose();
        } catch (error) {

        } finally {
            setIsFetching(false);
        }
    }

    return (
        <div
            className="mt-4"
            data-aos={"fade-down"}
            data-aos-delay={i * 800}
            data-aos-duration="1000"
        >
            <div
                className="relative border rounded-xl"
                style={{
                    background: `url(${image.image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                {
                    signedIn ?
                        <div
                            className={`absolute p-2 inset-0 bg-black bg-opacity-30 h-full`}
                        >
                            <div className="flex justify-end">
                                <button className="text-gray-200" onClick={deleteModal.onOpen}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    : null
                }
                <Img
                    src={image.image}
                    alt=""
                    className="h-auto max-w-full opacity-0"
                />
            </div>
            <Confirm
                deleteModal={deleteModal}
                isFetching={isFetching}
                onDelete={onDeleteService}
            />
        </div>
    )
}

export default GalleryImage;