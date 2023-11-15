import Title3 from "components/Title3";
import { quicklinks } from "./About";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";

const Quicklinks = () => {

    const [navbar, setNavbar] = useState(false);

    //navbar scroll changeBackground function
    const changeBackground = () => {
        if (window.scrollY >= 240) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }


    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener("scroll", changeBackground)
            // cleanup function
            return () => {
                window.removeEventListener('scroll', changeBackground);
            };
        }
    }, []);

    return (
        <div className="p-6 hidden md:block fixed right-40 bg-white" style={{ top: navbar ? 100 : 380, transition: "all 2s;"}}>
            <Title3>Quicklinks</Title3>
            <ol>
                {
                    quicklinks.map((link, i) => {
                        return (
                            <li
                                key={i}
                                className="py-3 border-gray-300 border-b-2 cursor-pointer"
                            >
                                <Link
                                    to={`${link.name.toLowerCase()}`}
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ol>
        </div>
    )
}

export default Quicklinks;