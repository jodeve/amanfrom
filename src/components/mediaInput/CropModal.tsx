import ErrorText from "components/ErrorText";
import PrimaryButton from "components/PrimaryButton";
import Modal from "components/modal/Modal";
import { ModalContext } from "components/modal/ModalContext";
import { useContext, FC, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css';


export interface CropModalProps {
    image: string;
    crop: Crop
    setCrop: (state: Crop) => void
    setImage: (image: React.ReactEventHandler<HTMLImageElement>) => void
    handleCrop: () => void
    aspect: number;
}

const CropModal: FC<CropModalProps> = ({ 
    image, 
    crop, 
    setCrop, 
    setImage,
    handleCrop,
    aspect,
  }) => {

    const modal = useContext(ModalContext);

    const [error, setError] = useState(false);

    const onCrop = () => {
        if(crop == undefined) {
            setError(true);
            return;
        }
        handleCrop();
        modal.onClose();
    }

    return (
        <Modal title="Crop Image">
            <ReactCrop crop={crop} onChange={c => setCrop(c)} aspect={aspect}>
                <img 
                    src={image} 
                    // @ts-ignore
                    onLoad={setImage} 
                />
            </ReactCrop>
            {
                error ?
                <ErrorText>Drag and drop on the image to crop</ErrorText>
                : null
            }
            <PrimaryButton
                onClick={onCrop}
            >
                Crop
            </PrimaryButton>
        </Modal>
    )
}

export default CropModal;