import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DATA } from "src/data";
import { Dialog } from '@headlessui/react'
import { useAppContext } from "contexts/AppContext";
import PrimaryButton from "./PrimaryButton";
import ActivityIndicator from "./ActivityIndicator";

const Navbar = () => {

    const location = useLocation();

    const [navbar, setNavbar] = useState(true);

    const changeBackground = () => {
        if (window.scrollY >= 66) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }


    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener("scroll", changeBackground)
            return () => {
                window.removeEventListener('scroll', changeBackground);
            };
        }
    }, []);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const {
        signedIn,
        onSave,
        isUpdatingPage,
    } = useAppContext();

    if (location.pathname.includes("login")) return null;


    return (
        <>
            <div className={classNames(
                "fixed w-full z-20 top-0 left-0 right-0",
                navbar ? "bg-white border-gray-200 border-b-2" : "",
            )}
            >
                <div className="relative flex w-3/4 mx-auto gap-x-7 py-4 items-center ">
                    <div className="flex-1">
                        <Link to="/">{DATA.name}</Link>
                    </div>
                    <div className="hidden md:block">
                        <ol className="flex gap-x-8">
                            {
                                DATA.pages.map((link, i) => {

                                    const isActive = location.pathname == link.path;

                                    return (
                                        <li key={i} style={{ listStyle: "none" }}>
                                            <Link to={link.path} className={isActive ? "text-blue-600" : ""}>
                                                {link.name}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ol>
                    </div>
                    <div className="md:flex-1 flex justify-end">
                        <button className="block md:hidden" onClick={() => setMobileMenuOpen(true)}>
                            <i className="fa fa-bars"></i>
                        </button>
                        <div className="hidden md:block">
                            {
                                signedIn ?
                                    (
                                        <PrimaryButton
                                            onClick={onSave}
                                            isLoading={isUpdatingPage}
                                        >
                                            Save
                                        </PrimaryButton>
                                    )
                                    : null
                            }
                        </div>
                    </div>
                </div>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-30 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex justify-between gap-x-6">
                            <a href="#" className="-m-1.5 p-1.5">
                                {DATA.name}
                            </a>
                            <button
                                className="-m-2.5 rounded-md p-2.5"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <i className="fa fa-xmark"></i>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {
                                        DATA.pages.map((item, i) => {

                                            const isActive = location.pathname == item.path;

                                            return (
                                                <Link
                                                    key={i}
                                                    to={item.path}
                                                    className={
                                                        classNames(
                                                            "-mx-3 block px-3 py-2 hover:bg-gray-50",
                                                            isActive ? "text-blue-600" : "",
                                                        )
                                                    }
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            )
                                        })
                                    }
                                    {
                                        signedIn ?
                                            (
                                                <a
                                                    href="#"
                                                    className="-mx-3 block px-3 py-2 hover:bg-gray-50"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        onSave()
                                                    }}
                                                >
                                                    { isUpdatingPage ? <ActivityIndicator /> : "Save" }
                                                </a>
                                            )
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </div >
        </>
    )
}

export default Navbar;