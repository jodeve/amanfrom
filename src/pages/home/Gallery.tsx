import Img from "components/Img";
import OutlinedButton from "components/OutlinedButton";
import Section from "components/Section";
import { useAppContext } from "contexts/AppContext";
import { ImageContext } from "contexts/ImageContext";
import { NavLink } from "react-router-dom";
import useGallery from "src/hooks/useGallery";
import ImgsViewer from "react-images-viewer";

const Gallery = () => {

    const {
        gallery,
    } = useAppContext();

    let _gallery = [...gallery];

    _gallery =  _gallery.splice(0, 6);

    const {
        onSetCurrentImage,
        currentImage,
        isOpenImage,
        onClickPrev,
        onClickNext,
        onClose,
    } = useGallery();

    return (
        <ImageContext.Provider
            value={{
                onSetCurrentImage,
            }}
        >
            <ImgsViewer
                imgs={_gallery.map((i) => ({ src: i.image }))}
                currImg={currentImage}
                isOpen={isOpenImage}
                onClickPrev={onClickPrev}
                onClickNext={onClickNext}
                onClose={onClose}
            />
            <Section
                title="Gallery"
            >
                <div className="md:w-3/4 mx-auto mt-20" >
                    <div className="grid md:grid-cols-3 gap-4">
                        {
                            _gallery.map((img, i) => {
                                return (
                                    <div key={i} className="p-4" data-aos="fade-up" data-aos-delay={i * 600}>
                                        <div onClick={() => onSetCurrentImage(i)}>
                                            <Img src={img.croppedImage} className="w-full height-auto" />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="mt-20 text-center">
                    <NavLink to="/gallery">
                        <OutlinedButton>
                            View More
                        </OutlinedButton>
                    </NavLink>
                </div>
            </Section>
        </ImageContext.Provider>
    )
}

export default Gallery;