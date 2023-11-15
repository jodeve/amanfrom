import { useState } from "react";

const useModal = () => {
    
    const [open, setOpen] = useState(false);

    const onOpen = () => setOpen(true);

    const onClose = () => setOpen(false);
    
    const onToggle = () => setOpen(!open);
    
    return {
        open,
        onOpen,
        onClose,
        onToggle,
    }
}

export default useModal;