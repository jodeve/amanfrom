import Title2 from "components/Title2";
import { useContext } from "react";
import { AboutContext } from "./AboutContext";
import { useAppContext } from "contexts/AppContext";
import classNames from "classnames";
import AltTextInput from "components/AltTextInput";
import OutlinedButton from "components/OutlinedButton";
import useModal from "components/modal/useModal";
import AboutService from "./AboutService";
import AboutServiceForm from "./AboutServiceForm";
import { Element } from "react-scroll";

const AboutContent = () => {

    const {
        DATA,
        signedIn,
        onChange,
        services,
    } = useAppContext();

    const {
        refs
    } = useContext(AboutContext);

    const modal = useModal();

    return (
        <>
            <div id="container">
                <div id="services" className="pt-20" ref={refs.current.services}>
                    <Element name="#services">
                        <div className="flex justify-between items-center">
                            <Title2>Our Range Of Services</Title2>
                            {
                                signedIn ?
                                    <OutlinedButton
                                        onClick={modal.onOpen}
                                    >
                                        Add Service
                                    </OutlinedButton>
                                    : null
                            }
                        </div>
                        <AboutServiceForm
                            modal={modal}
                            service={undefined}
                        />
                        <ol className="mt-10 list-decimal space-y-4 pl-4">
                            {
                                services.map((service, i) => {
                                    return (
                                        <AboutService
                                            key={i}
                                            index={i}
                                            service={service}
                                        />
                                    )
                                })
                            }
                        </ol>

                    </Element>
                </div >
            </div>
            {
                [
                    {
                        title: "Our Vision Statement",
                        key: "vision"
                    },
                    {
                        title: "Our Mission Statement",
                        key: "mission",
                    },
                    {
                        title: "Our Motto",
                        key: "motto"
                    },

                ].map(({ key, title }, i) => {
                    return (
                        <div
                            id={key}
                            key={i}
                            className={
                                classNames(
                                    "pt-20",
                                    i == 2 ? "pb-20" : ""
                                )
                            }
                            ref={refs.current[key]}
                        >
                            <div className="">
                                <Title2>{title}</Title2>
                                <p>
                                    {
                                        signedIn ?
                                            <AltTextInput
                                                value={DATA[key]}
                                                name={key}
                                                onChange={onChange}
                                            />
                                            : DATA[key]
                                    }
                                </p>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default AboutContent;