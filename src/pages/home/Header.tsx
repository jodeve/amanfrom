import OutlinedButton from "components/OutlinedButton";
import PrimaryButton from "components/PrimaryButton";
import { Link } from "react-scroll";
import { useAppContext } from "contexts/AppContext";
import Slider from "./Slider";
import useAos from "src/hooks/useAos";
import { NavLink } from "react-router-dom";

const Header = () => {

    const {
        DATA,
    } = useAppContext();

    useAos({
    });

    return (
        <div className="md:w-2/3 mx-auto section" data-aos="fade-up">
            <div className="">
                <h1 className="font-bold md:text-center text-5xl md:text-8xl py-4">
                    Amanfrom <span className="text-blue-300">Hospital</span> <br />
                </h1>
                <p className="md:text-center py-4">
                    {DATA.about}
                </p>
                <div className="py-10 flex md:justify-center gap-4">
                    <Link
                        to="contact"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <PrimaryButton
                        >
                            Contact Us
                        </PrimaryButton>
                    </Link>
                    <NavLink to="/about">
                        <OutlinedButton
                        >
                            About Us
                        </OutlinedButton>
                    </NavLink>
                </div>
            </div>
            <Slider />
        </div>
    )
}

export default Header;