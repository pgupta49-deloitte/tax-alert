import { useState, useEffect } from "react";

export const useClient = (props:boolean) => {
    const [isClient, setIsClient] = useState(props);
    useEffect(() => {
        setIsClient(true)
    }, []);
    return isClient;
};
