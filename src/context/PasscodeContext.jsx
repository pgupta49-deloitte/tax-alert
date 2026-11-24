"use client"
import { createContext, useState } from "react";
import { useRouter } from 'next/navigation'

const PasscodeContext = createContext();

const PasscodeProvider = ({children}) => {
    const[passcode, setPasscode] = useState(Array(8).fill(''));
    const[authenticated, setAuthenticated] = useState(null);
    
    const router = useRouter();

    

    return(
        <PasscodeContext.Provider value={{passcode, setPasscode, authenticated, setAuthenticated}}>
            {children}
        </PasscodeContext.Provider>
    )
};

export {PasscodeContext, PasscodeProvider};

