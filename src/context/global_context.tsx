'use client';

import { NavButtons, NavItem } from "@/components/navbar/structure";
import { useSession } from "next-auth/react";
import React, { createContext, useState } from "react";

type Props = {
    isLoading: boolean;
    isLoaded: boolean;
    navbar: {
        extraLinks?: NavItem[];
        extraButtons?: NavButtons[];
    };
    setNavbar: React.Dispatch<React.SetStateAction<{
        extraLinks?: NavItem[];
        extraButtons?: NavButtons[];
    }>>;
};

export const GlobalContext = createContext<Props>({
    isLoading: true,
    isLoaded: false,
    navbar: {},
    setNavbar: () => { }
});

export default function GlobalContextProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [navbar, setNavbar] = useState({});

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
            isLoaded,
            navbar,
            setNavbar,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}