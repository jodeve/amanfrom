import Img from "components/Img";
import { useAppContext } from "contexts/AppContext";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Slider = () => {

    const {
        gallery,
    } = useAppContext();    

    const _gallery = [...gallery];

    return (
        <ImageGallery 
            items={_gallery.map((image) => ({ original: image.croppedImage, thumbnail: image.croppedImage }))}
            infinite
            showNav={false}
            showFullscreenButton={false}
            showThumbnails={false}
            showPlayButton={false}
            autoPlay
            renderItem={(item) => (
                <Img src={item.original} className="mx-auto"/>
            )}
        />
    )
}

export default Slider;