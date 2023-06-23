import React from "react"

// import './admin-globals.scss'
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../(api)/api/auth/[...nextauth]/authOptions";
import { Barlow, Inter } from "next/font/google";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import "nprogress/nprogress.css";

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const barlow = Barlow({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ['latin'],
    variable: '--font-barlow',
});

const TopProgressBar = dynamic(
    () => {
        return import("@/utils/progressbar");
    },
    { ssr: false },
);

export const metadata: Metadata = {
    title: 'Admin',
    description: 'Generated by create next app',
}

export default async function AdminLayout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: {
        slug: string[],
    },
    searchParams: {
        [key: string]: string;
    }
}) {
    const session = await getServerSession(nextAuthOptions);
    const cookieStore = cookies();
    const theme = cookieStore.get('theme');

    // @ts-ignore
    if (!session || session.user?.role < 2) {
        redirect(`/`);
    }

    return (
        <html lang="en">
            <body className={`h-full ${inter.className} ${inter.variable} ${barlow.variable} ${theme?.value === "light" ? "" : "dark"}`}>
                <TopProgressBar />
                {children}
            </body>
        </html>
    )
}