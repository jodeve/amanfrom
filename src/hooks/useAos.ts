import { useEffect } from "react";
import AOS from "aos";

const useAos = (options: AOS.AosOptions) => {
    useEffect(() => {
        AOS.init({
            ...options,
            once: true,
        });
    }, []);
}

export default useAos;