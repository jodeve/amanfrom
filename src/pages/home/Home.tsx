import Gallery from "./Gallery";
import Header from "./Header";
import Services from "./Services";
import GetInTouch from "./GetInTouch";
import { useRef } from "react";
import { HomeContext } from "./HomeContext";
import Team from "./Team";

const Home = () => {

    const ref = useRef<HTMLDivElement>(null)

    const scrollTo = () => {
        window.scrollTo({ top: ref.current!.offsetTop, behavior: "smooth" });
    }

    return (
        <HomeContext.Provider
            value={{
                ref,
                scrollTo,
            }}
        >
            <div className="relative">
                <Header />
                <Services />
                <Gallery />
                <Team />
                <GetInTouch />
            </div>
        </HomeContext.Provider>
    )
}

export default Home;