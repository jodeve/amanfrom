import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ModalContext } from "components/modal/ModalContext";
import useModal from "components/modal/useModal";
import { useContext, useEffect, useState } from "react";
import CropModal from "./CropModal";
import { type Crop } from 'react-image-crop';
import toBase64 from "lib/toBase64";
import PrimaryButton from "components/PrimaryButton";

interface Props {
    imageUrl?: any;
    label?: string;
    id?: string;
    defaultValue?: string;
    onBlur?: (event: any) => void;
    error?: any;
    helperText?: string;
    onImageChange?: (image: { croppedImage: string; image: string; }) => void;
    aspect?: number;
    isFetching?: boolean;
}

export const MediaInput = ({ imageUrl, id, onImageChange, aspect = 4 / 3, isFetching, }: Props) => {

    const [crop, setCrop] = useState<Crop>();

    const [base64Image, setBase64Image] = useState("");

    const [croppedImage, setCroppedImage] = useState(imageUrl);

    const [image, setImage] = useState<React.ReactEventHandler<HTMLImageElement>>();

    const [extension, setExtension] = useState("");

    const modal = useModal();

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                const type = file.type;
                //const ext = type.replace(/(.*)\//g, '');
                setExtension(type);
                setBase64Image(base64);
                modal.onOpen();
            };
            reader.readAsDataURL(file);
        }
    };

    const {
        open,
    } = useContext(ModalContext);


    useEffect(() => {
        setBase64Image("");
        setCroppedImage("");
    }, [open]);

    const handleCrop = () => {
        if (!crop) return;
        // @ts-ignore
        const croppedImage = toBase64(image!.target, crop, extension);
        setCroppedImage(croppedImage);
    }

    const onCrop = () => {
        onImageChange && onImageChange({ croppedImage, image: base64Image });
    }

    return (
        <ModalContext.Provider value={modal}>
            <label htmlFor={id} className="relative">
                <p className=" text-gray-500 p-2">Upload Picture</p>
                <span className="mr-2">
                    <PlusCircleIcon className="h-7 w-7 m-2 " />
                </span>
                <input
                    type="file"
                    onChange={handleImageUpload}
                    name="file"
                    className="hidden absolute top-0 left-0 right-0 bottom-0"
                    id={id}
                    accept="image/jpeg, image/jpg, image/png"
                />
            </label>

            <span>
                {
                    croppedImage == "" ?
                        (
                            <div></div>
                        ) :
                        (
                            <span className="show-file relative">
                                <img
                                    src={croppedImage}
                                    alt=""
                                    className="w-16 h-12 border object-cover rounded-lg"
                                />
                            </span>
                        )
                }
            </span>
            <CropModal
                image={base64Image}
                // @ts-ignore
                crop={crop}
                setCrop={setCrop}
                setImage={setImage}
                handleCrop={handleCrop}
                aspect={aspect}
            />
            <div className="mt-4">
                <PrimaryButton
                    onClick={onCrop}
                    isLoading={isFetching}
                >
                    Upload
                </PrimaryButton>
            </div>
        </ModalContext.Provider >
    );
};
