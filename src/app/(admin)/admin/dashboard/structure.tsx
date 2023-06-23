'use client';

import React, { useEffect, useState } from 'react'
import style from './structure.module.scss'
import { usePathname } from 'next/navigation';
import { FaPen, FaRegArrowAltCircleRight, FaUsers } from 'react-icons/fa';
import { VscDashboard, VscGraph } from 'react-icons/vsc';
import Link from 'next/link';
import config from '@/utils/config';

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
}: {
    children: React.ReactNode,
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

            <aside className={`${style.admin_aside} ${isSideBaropened && style.active}`} onClick={e => e.stopPropagation()}>

                <div className={style.aside__header}>
                    <div className={style.aside__header__logo}>
                        <img
                            src={`/favicon.ico`}
                            alt="logo"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                    <div className={style.aside__header__title}>
                        <h1>{config.title as string || ""}</h1>
                    </div>
                </div>

                <div className={style.aside__inner}>
                    {menuItems.map((item, index) => {
                        if (item.link) {
                            return (
                                <Link href={item.link} key={`${item.title}-${index}`}>
                                    <div className={style.button} data-select={pathname === item.link} title={item.title}>
                                        <span className='flex-shrink-0 flex-grow-0'>{item.icon}</span>
                                        <div className='flex flex-col justify-start items-start'>
                                            <span>{item.title}</span>
                                            {item.subtitle && <span className='text-sm opacity-80'>{item.subtitle}</span>}
                                        </div>
                                    </div>
                                </Link>
                            )
                        } else {
                            return (
                                <button className={style.button} onClick={item.onClick} title={item.title} key={`${item.title}-${index}`}>
                                    <span className='flex-shrink-0 flex-grow-0'>{item.icon}</span>
                                    <div className='flex flex-col justify-start items-start'>
                                        <span>{item.title}</span>
                                        {item.subtitle && <span className='text-sm opacity-80'>{item.subtitle}</span>}
                                    </div>
                                </button>
                            )
                        }
                    })}
                </div>

                <div className={style.aside__footer}>
                    <button onClick={e => setIsSideBaropened(!isSideBaropened)} type="button">
                        <FaRegArrowAltCircleRight />
                    </button>
                </div>
            </aside>

            <main className={style.admin_main}>
                <div className={style.content}>
                    {children}
                </div>
            </main>

        </div>
    )
}