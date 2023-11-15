import { Crop } from "react-image-crop";

const toBase64 = (image: HTMLImageElement, crop: Crop, extention: string) => {
    try {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        ctx!.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        const base64Image = canvas.toDataURL(extention, 1);
        return base64Image;
    } catch (e) {
        console.log(e);
        return "";
    }
}


export default toBase64;