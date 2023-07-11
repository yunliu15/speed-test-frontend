import { createContext, useState } from "react";

const MessageContext = createContext({});

export const MessageProvider = ({children}) => {
    const [message, setMessage] = useState({content: '', type: ''});
    return (
        <MessageContext.Provider value={{message, setMessage}}>
            {children}
        </MessageContext.Provider>
    )
}

export default MessageContext;