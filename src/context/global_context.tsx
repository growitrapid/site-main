'use client';

import { useSession } from "next-auth/react";
import React, { createContext, useState } from "react";

type Props = {
    isLoading: boolean;
    isLoaded: boolean;
};

export const GlobalContext = createContext<Props>({
    isLoading: true,
    isLoaded: false
});

export default function GlobalContextProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    React.useEffect(() => {
        if (status === "unauthenticated") {
            setIsLoaded(true);
            setIsLoading(false);
        } else if (status === "authenticated") {
            setIsLoaded(true);
            setIsLoading(false);
        }
    }, [session, status]);

    return (
        <GlobalContext.Provider value={{
            isLoading,
            isLoaded
        }}>
            {children}
        </GlobalContext.Provider>
    )
}