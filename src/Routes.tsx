import { Route, Routes as ReactRoutes, useLocation } from 'react-router-dom';
import Home from 'pages/home/Home';
import About from 'pages/about/About';
import Services from 'pages/services/Services';
import Gallery from 'pages/gallery/Gallery';
import {
    CSSTransition
} from "react-transition-group";
import NotFound from 'pages/NotFound';
import Login from 'pages/login/Login';

export const routes = [
    {
        path: "/",
        element: Home,
        name: "Home",
    },
    {
        path: "/about",
        element: About,
        name: "About",
    },
    {
        path: "/services",
        element: Services,
    },
    {
        path: "/gallery",
        element: Gallery,
    },
    {
        path: "/admin/login",
        element: Login,
    },
]


const Routes = () => {

    const location = useLocation();

    return (
        <CSSTransition
            key={location.pathname}
            className="fade"
            timeout={300}
        >
            <ReactRoutes>
                {
                    routes.map(({ path, element: Element }, i) => {
                        return (
                            <Route
                                key={i}
                                path={path}
                                element={<Element />}
                            />
                        )
                    })
                }
                <Route
                    path={"/*"}
                    element={<NotFound />}
                />
            </ReactRoutes>
        </CSSTransition>
    );
}

export default Routes;