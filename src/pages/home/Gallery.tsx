import Img from "components/Img";
import OutlinedButton from "components/OutlinedButton";
import Section from "components/Section";
import { useAppContext } from "contexts/AppContext";
import { NavLink } from "react-router-dom";

const Gallery = () => {

    const {
        gallery,
    } = useAppContext();

    const _gallery = [...gallery]

    return (
        <Section
            title="Gallery"
        >
            <div className="md:w-3/4 mx-auto mt-20" >
                <div className="grid md:grid-cols-3 gap-4">
                    {
                        _gallery.splice(0, 6).map((img, i) => {
                            return (
                                <div key={i} className="p-4" data-aos="fade-up" data-aos-delay={i * 600}>
                                    <Img src={img.croppedImage} className="w-full height-auto" />
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
    )
}

export default Gallery;