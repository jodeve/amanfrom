import { Link, useLocation } from "react-router-dom";
import Title3 from "../Title3";
import { useAppContext } from "contexts/AppContext";
import Contacts from "./Contacts";

const Footer = () => {

    const location = useLocation();

    const {
        DATA,
    } = useAppContext();

    if(location.pathname.includes("login")) return null;

    return (
        <div className="p-10 py-20 bg-gray-800">
            <div className="grid md:grid-cols-3 gap-5 text-gray-400">
                <div>
                    <Title3>{DATA.name}</Title3>
                    <p>{DATA.about}</p>
                </div>
                <div>
                    <Title3>Navigation</Title3>
                    <ol>
                        {
                            DATA.pages.map((link, i) => {

                                const isActive = location.pathname == link.path;

                                return (
                                    <li
                                        key={i}
                                        style={{ listStyle: "none" }}
                                    >
                                        <Link
                                            to={link.path}
                                            className={isActive ? "text-white" : ""}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ol>
                </div>
                <Contacts />
            </div>
        </div>
    )
}

export default Footer;