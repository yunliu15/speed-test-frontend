import { createContext, useState } from "react";

const ModalContext = createContext({});

export const ModalProvider = ({children}) => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState();
    const [modalCallback, setModalCallback] = useState();

    return (
        <ModalContext.Provider value={{showModal, setShowModal, modalContent, setModalContent, modalCallback, setModalCallback}}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalContext;