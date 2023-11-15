import Quicklinks from "./Quicklinks";
import AboutHeader from "./AboutHeader";
import { useEffect, useRef } from "react";
import { AboutContext } from "./AboutContext";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";

export const quicklinks = [
    {
        name: "Vision",
    },
    {

        name: "Mission",
    },
    {
        name: "Motto"
    }
];

const About = () => {

    const refs = useRef({
        "vision": useRef<HTMLDivElement>(null),
        "mission": useRef<HTMLDivElement>(null),
        "motto": useRef<HTMLDivElement>(null),
        "services": useRef<HTMLDivElement>(null),
    })

    const scrollTo = (refName: "vision" | "mission" | "motto") => {
        window.scrollTo({ top: refs.current[refName].current!.offsetTop, behavior: "smooth" });
    }

    const location = useLocation();

    let hash = location.hash;

    useEffect(() => {
        if (hash) {
            scroller.scrollTo(hash, {
                smooth: true,
                duration: 1500,
                delay: 100,
                spy: true,
                offset: refs.current.services.current.offsetHeight,
            });
        }
    }, [])

    return (
        <AboutContext.Provider
            value={{
                refs,
                scrollTo,
            }}
        >
            <div className="pt-20">
                <AboutHeader />
                <Quicklinks />
            </div>
        </AboutContext.Provider>
    )
}

export default About;