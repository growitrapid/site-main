'use client';

import React, { useEffect, useState } from 'react'
import style from './structure.module.scss'
import { usePathname } from 'next/navigation';
import { FaPen, FaRegArrowAltCircleRight, FaUsers } from 'react-icons/fa';
import { VscDashboard, VscGraph } from 'react-icons/vsc';
import Link from 'next/link';
import config from '@/utils/config';
import NavBar from '@/components/navbar/structure';
import { Session } from 'next-auth';

const menuItems: {
    title: string,
    subtitle?: string,
    icon: React.ReactNode,
    link?: string,
    onClick?: () => void,
}[] = [
        {
            title: 'Home',
            icon: <VscGraph />,
            link: '/admin/dashboard'
        },
        {
            title: 'Blogs',
            icon: <FaPen />,
            link: '/admin/dashboard/blogs'
        },
        {
            title: 'Members',
            icon: <FaUsers />,
            link: '/admin/dashboard/members'
        },
        {
            title: 'Studio',
            icon: <VscDashboard />,
            link: '/admin/studio'
        },
    ];

export default function Structure({
    children,
    theme,
    session,
}: {
    children: React.ReactNode,
    theme: "light" | "dark",
    session: Session | null,
}) {
    const pathname = usePathname();
    const [isSideBaropened, setIsSideBaropened] = useState(false);

    useEffect(() => {

        const mediaQuery = window.matchMedia('(min-width: 768px)');

        setIsSideBaropened(mediaQuery.matches);

        const handleMediaQueryChange = (e: MediaQueryListEvent) => {
            setIsSideBaropened(e.matches);
        };

        mediaQuery.addEventListener('change', handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        }
    }, []);

    return (
        <div className={`${style.admin_layout} relative`}>

            {/* Nav Bar */}
            <NavBar
                theme={theme}
                navItems={[
                    {
                        title: 'Home',
                        icon: null,
                        link: '/admin/dashboard',
                        items: null
                    },
                    {
                        title: 'Blogs',
                        icon: null,
                        link: '/admin/dashboard/blogs',
                        items: null
                    },
                    ...((session?.user.role === 3) ? [
                        {
                            title: 'Members',
                            icon: null,
                            link: '/admin/dashboard/members',
                            items: null
                        },
                        {
                            title: 'Studio',
                            icon: null,
                            link: '/admin/dashboard/studio',
                            items: null
                        },
                        {
                            title: 'Unlighthouse',
                            icon: null,
                            link: '/admin/dashboard/unlighthouse',
                            items: null
                        }
                    ] : []),
                ]}
            />

            <main className={style.admin_main}>
                <div className={style.content}>
                    {children}
                </div>
            </main>

        </div>
    )
}