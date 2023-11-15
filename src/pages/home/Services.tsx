import OutlinedButton from "components/OutlinedButton";
import Section from "components/Section";
import { useAppContext } from "contexts/AppContext";
import { NavLink } from "react-router-dom";

const Service = ({ service, i }) => {

    return (
        <div
            className="p-4"
            data-aos="fade-right"
            data-aos-delay={i * 600}
        >
            <div
                className="relative rounded-xl w-full h-[340px]"
                style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div
                    className="absolute bottom-0 left-0 right-0 p-4 rounded-b-xl"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.4)"
                    }}
                >
                    <h3 className="text-3xl text-white font-bold">
                        {service.name}
                    </h3>
                </div>
            </div>
        </div>
    )
}

const Services = () => {

    const {
        DATA,
    } = useAppContext();

    const services = Object.values(DATA.servicesS);

    const _services = [...services];

    return (
        <Section
            title="Our Services"
            className="bg-blue-200"
        >
            <div className="md:w-3/4 mx-auto mt-20">
                <div className="grid md:grid-cols-3 gap-4">
                    {
                        _services.map((service, i) =>
                            <Service
                                i={i}
                                key={i}
                                service={service}
                            />
                        )
                    }
                </div>
            </div>
            <div className="mt-20 text-center">
                <NavLink to="/about#services">
                    <OutlinedButton>
                        View More
                    </OutlinedButton>
                </NavLink>
            </div>
        </Section>
    )
}

export default Services;