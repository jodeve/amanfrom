import { useState } from "react";

const useGallery = () => {

    const [isOpenImage, setIsOpenImage] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    const onClose = () => {
        setIsOpenImage(false);
    }

    const onClickNext = () => {
        let _currentImage = currentImage;
        setCurrentImage(_currentImage + 1)
    }

    const onClickPrev = () => {
        let _currentImage = currentImage;
        setCurrentImage(_currentImage - 1)
    }

    const onSetCurrentImage = (image: number) => {
        setCurrentImage(image);
        setIsOpenImage(true);
    }


    return {
        isOpenImage,
        onClose,
        onClickNext,
        onClickPrev,
        onSetCurrentImage,
        currentImage,
    }
}

export default useGallery;