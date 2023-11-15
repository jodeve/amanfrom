import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import Navbar from "components/Navbar";
import Footer from "components/footer/Footer";
import ScrollToTop from "./ScrollToTop";
import { AppContext } from "contexts/AppContext";
import "aos/dist/aos.css";
import useUser from "./hooks/useUser";
import useImages from "./hooks/useImages";
import useServices from "./hooks/useServices";
import usePage from "./hooks/usePage";
import ActivityIndicator from "components/ActivityIndicator";
import Helmet from "react-helmet";

const host = import.meta.env.VITE_API_HOST;

export const HOST = `${host}/api`;

const App = () => {
 
    const {
        state,
        onChange,
        isUpdatingPage,
        onSave,
        isFetchingPage,
    } = usePage();

    const {
        services,
        setServices,
        isFetchingServices,
    } = useServices();


    const {
        gallery,
        setGallery,
        isFetchingImages,
    } = useImages();


    const {
        signedIn,
        setSignedIn,
        isFetchingUser,
    } = useUser();

    const data = {
        DATA: state,
        signedIn,
        setSignedIn,
        onChange,
        onSave,
        isUpdatingPage,
        services,
        setServices,
        gallery,
        setGallery,
    };


    if(isFetchingImages || isFetchingUser || isFetchingPage || isFetchingServices)  return(
        <div className="h-screen w-screen flex items-center justify-center">
            <ActivityIndicator />
        </div>
    );

    return (
        <AppContext.Provider
            value={data}
        >
            <Helmet>
                <meta name="description" content={data.DATA.about} />
            </Helmet>
            <BrowserRouter>
                <ScrollToTop />
                <Navbar />
                <Routes />
                <Footer />
            </BrowserRouter>
        </AppContext.Provider>
    )
}

export default App;