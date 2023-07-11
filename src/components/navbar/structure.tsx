'use client';

import React, { isValidElement, useContext, useEffect, useRef, useState } from 'react'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

import style from "./style.module.scss"
import { BroadcastChannel } from '@/utils/web';
import { setCookie } from '@/utils/cookie';

import DarkLogo from '@/assets/logo/logo_dark.svg';
import LightLogo from '@/assets/logo/logo_light.svg';
import Me from '@/assets/me.png';
import { FaAngleLeft, FaAngleRight, FaCaretDown, FaSignOutAlt, FaSlidersH, FaTimes } from 'react-icons/fa';
import { FaAngleDown, FaUpRightFromSquare } from 'react-icons/fa6';
import config from '@/utils/config';
import { VscGraph } from 'react-icons/vsc';
import { BiSun } from 'react-icons/bi';
import { BsMoonStarsFill } from 'react-icons/bs';
import { GlobalContext } from '@/context/global_context';

export type NavItem = {
    title: string,
    link: string,
    icon?: React.ReactNode | null,

    isMegaMenu?: boolean,
    isMultiMenu?: boolean,
    onlyDesktop?: boolean,
    onlyMobile?: boolean,

    items: (
        undefined
        | React.ReactNode
        | {
            title: string,
            link: string,
            icon?: React.ReactNode | null,
            items: undefined | {
                title: string,
                link: string,
                icon?: React.ReactNode | null,
            }[] | React.ReactNode,
            isMegaMenu?: boolean,
            onlyDesktop?: boolean,
            onlyMobile?: boolean,
        }[]
    ),
}

export type NavButtons = {
    title: string,
    link?: string,
    icon?: React.ReactNode | null,
    onClick?: () => void,
    underDropdown?: boolean,
    iconOnly?: boolean,
};

export default function Structure({
    theme,
    navItems,
    navButtons,
}: {
    theme: "light" | "dark",
    navItems: NavItem[],
    navButtons?: NavButtons[],
}) {
    const { data: session, status } = useSession();
    const [isDark, setIsDark] = useState(theme === "dark" ? true : false);
    const context = useContext(GlobalContext);

    navItems = [...navItems, ...(context.navbar.extraLinks || [])];
    navButtons = [...(navButtons || []), ...(context.navbar.extraButtons || [])];

    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [menuItemIndex, setMenuItemIndex] = useState(-1);

    const themeBroadcast = useRef(new BroadcastChannel("theme", { should_receive_own_messages: true }));

    useEffect(() => {
        isDark ? document.body.classList.add("dark") : document.body.classList.remove("dark");

        setCookie("theme", isDark ? "dark" : "light", 15);
        themeBroadcast.current.postMessage('theme_toggle', { theme: isDark ? "dark" : "light" });
    }, [isDark]);

    themeBroadcast.current.onReceiveMessage((event, data) => {
        if (event === "theme_toggle") {
            setIsDark(data.theme === "dark" ? true : false);
        }
    })

    useEffect(() => {
        function func() {
            setIsDropdownOpen(false);
            setMenuItemIndex(-1);
        }
        if (isDropdownOpen || menuItemIndex !== -1) {
            window.addEventListener("click", func);
        } else {
            window.removeEventListener("click", func);
        }

        return () => {
            window.removeEventListener("click", func);
        }
    }, [
        isDropdownOpen,
        setIsDropdownOpen,
        menuItemIndex,
        setMenuItemIndex,
    ]);

    return (
        <nav className={style.header}>
            <div className={`${style.top}`}>

                <div className={style.hamburger} onClick={e => {
                    e.stopPropagation();
                    setIsMenuOpened(!isMenuOpened);

                    function closeHamButton() {
                        setIsMenuOpened(false);
                    }

                    if (isMenuOpened) {
                        window.removeEventListener("click", closeHamButton);
                    } else {
                        window.addEventListener("click", closeHamButton);
                    }
                }}>
                    <div className={`${style.topicon} ${isMenuOpened && style.active}`}></div>
                    <div className={`${style.icon} ${isMenuOpened && style.active}`}></div>
                    <div className={`${style.bottomicon} ${isMenuOpened && style.active}`}></div>
                </div>

                <Link className={`${style.logo}`} href="/" style={{ color: "var(--primary-color)" }}>
                    <div>
                        <Image src={isDark ? DarkLogo : LightLogo} alt="Logo" height={25} />
                    </div>
                </Link>

                <div className={style.links} onClick={e => e.stopPropagation()}>
                    {navItems.map((item, index) => {
                        if (item.onlyMobile) return null;

                        if (!item.items) {
                            return (<Link className={style.link_item} href={item.link} key={index}>
                                {item.title}

                                {/* <FaUpRightFromSquare className={`ml-2 text-xs inline-block align-baseline`} /> */}
                            </Link>)
                        }

                        return (<RenderMDMenu
                            key={index}
                            item={item}
                            index={index}
                            selectedIndex={menuItemIndex}
                            setSelectedIndex={setMenuItemIndex}
                        />)
                    })}
                </div>

                <div className={style.avatar} onClick={e => e.stopPropagation()}>
                    {navButtons?.map((button, index) => {
                        if (button.underDropdown) return null;

                        if (button.onClick) {
                            return <button
                                key={index}
                                onClick={button.onClick}
                                className={style.avatar}
                                style={{
                                    fontSize: "1.1em",
                                    padding: '0.4em',
                                }}
                            >
                                <div className={`fill-[var(--text-color)]`} style={{ fontSize: "1em" }}>
                                    {button.icon}
                                </div>
                                {button.iconOnly ? null :
                                    <div className={`text-sm`} style={{ width: "auto" }}>
                                        <span>SIGN IN</span>
                                    </div>
                                }
                            </button>
                        }

                        return <Link href={button.link || ""} className='no-after' key={index}>
                            <div
                                style={{ justifyContent: "center" }}
                                className={`
                                    w-auto h-7 rounded-full
                                    flex gap-2 items-center justify-center
                                    px-2 border-[1px] border-solid border-[var(--border-primary-color)]
                                    hover:bg-[var(--hover-color)] transition-colors duration-300 ease-in-out
                                `}
                            >
                                <div className={`fill-[var(--text-color)]`} style={{ fontSize: "1em" }}>
                                    {button.icon}
                                </div>
                                {button.iconOnly ? null :
                                    <div className={`text-sm`} style={{ width: "auto" }}>
                                        <span>SIGN IN</span>
                                    </div>
                                }
                            </div>
                        </Link>
                    })}

                    <button
                        onClick={e => setIsDark(!isDark)}
                        className={style.avatar}
                        style={{
                            fontSize: "1.1em",
                            padding: '0.4em',
                        }}
                    >
                        {isDark ?
                            <BiSun fill='currentColor' />
                            :
                            <BsMoonStarsFill fill='currentColor' />
                        }
                    </button>

                    {status === "authenticated" ?
                        <button onClick={e => setIsDropdownOpen(!isDropdownOpen)}>
                            <img
                                src={session?.user?.image || Me.src}
                                alt="Avatar"
                                referrerPolicy="no-referrer"
                            />
                            {/* <FaCaretDown /> */}
                        </button>
                        :
                        <Link href={config.links.signin} className='no-after'>
                            <div
                                style={{ justifyContent: "center" }}
                                className={`
                                    w-auto h-7 rounded-full
                                    flex gap-2 items-center justify-center
                                    px-2 border-[1px] border-solid border-[var(--border-primary-color)]
                                    hover:bg-[var(--hover-color)] transition-colors duration-300 ease-in-out
                                `}
                            >
                                <div className={`fill-[var(--text-color)]`} style={{ fontSize: "1em" }}>
                                    <svg className={`fill-[var(--text-color)]`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em" width="1em"><path d="M352 96h64c17.7 0 32 14.3 32 32V384c0 17.7-14.3 32-32 32H352c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c53 0 96-43 96-96V128c0-53-43-96-96-96H352c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-7.5 177.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H160v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" /></svg>
                                </div>
                                <div className={`text-sm`} style={{ width: "auto" }}>
                                    <span>SIGN IN</span>
                                </div>
                            </div>
                        </Link>
                    }
                </div>

                <div className={style.dropdown} data-open={isDropdownOpen} onClick={e => e.stopPropagation()}>
                    {((session?.user.role || 0) >= 1) &&
                        <span>
                            <Link href="/admin/dashboard" target='_blank' title='Dashboard'>
                                <div className={style.chip}>
                                    <div className={style.avatar} style={{ fontSize: "1.1em" }}>
                                        <VscGraph fill='currentColor' />
                                    </div>
                                    <div className={style.name} style={{ width: "auto" }}>
                                        <span>Dashboard</span>
                                    </div>
                                </div>
                            </Link>
                        </span>
                    }

                    <span><Link href="/about">
                        <div className={style.chip}>
                            <div className={style.avatar} style={{ fontSize: "1.1em", height: 20 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em"><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z" /></svg>
                            </div>
                            <div className={style.name} style={{ width: "auto" }}>
                                <span>ABOUT</span>
                            </div>
                        </div>
                    </Link></span>

                    <div className='partition' style={{ borderWidth: 1 }}></div>

                    <div className={style.account}>
                        {status === "loading" ?
                            <div className={style.chip}>
                                <div className={style.name}>
                                    <span style={{
                                        textAlign: "center"
                                    }}>Authenticationg...</span>
                                </div>
                            </div>
                            :
                            !session ?
                                <Link href={config.links.signin}>
                                    <div className={style.chip} style={{ justifyContent: "center" }}>
                                        <div className={style.avatar} style={{ fontSize: "1.1em", height: 20 }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em" width="1em"><path d="M352 96h64c17.7 0 32 14.3 32 32V384c0 17.7-14.3 32-32 32H352c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c53 0 96-43 96-96V128c0-53-43-96-96-96H352c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-7.5 177.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H160v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" /></svg>
                                        </div>
                                        <div className={style.name} style={{ width: "auto" }}>
                                            <span>SIGN IN</span>
                                        </div>
                                    </div>
                                </Link>
                                :
                                <div className={style.chip}>
                                    <div className={style.avatar}>
                                        <img
                                            src={session?.user?.image || Me.src}
                                            alt={session?.user?.name || "Avatar"}
                                            referrerPolicy="no-referrer"
                                            style={{
                                                borderRadius: "50%",
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover"
                                            }}
                                        />
                                    </div>
                                    {/* <img className={style.avatar} src={session.user.image} alt={session.user.name} referrerPolicy="no-referrer" /> */}
                                    <div className={style.name}>
                                        <span>{session?.user?.name}</span>
                                        <span>{session?.user?.email}</span>
                                    </div>
                                </div>
                        }
                    </div>

                    {status === "authenticated" &&
                        <span onClick={e => { signOut() }}>
                            <div className={style.chip} style={{ fontSize: "0.7em", justifyContent: "center" }}>
                                <div className={style.avatar} style={{ fontSize: "1.5em", height: 20 }}>
                                    <FaSignOutAlt />
                                </div>
                                <div className={style.name} style={{ width: "auto" }}>
                                    <span>LOGOUT</span>
                                </div>
                            </div>
                        </span>
                    }
                </div>

                <div className={`${style.menubar}`} data-open={isMenuOpened} onClick={e => setIsMenuOpened(false)}>
                    <div className={style.menu} onClick={e => e.stopPropagation()}>

                        <RenderSMMenu
                            items={navItems}
                            setIsMenuOpened={setIsMenuOpened}
                        />

                    </div>
                </div>

            </div>

        </nav>
    )
}

function RenderMDMenu({ item, index, selectedIndex, setSelectedIndex }: {
    item: NavItem,
    index: number,
    selectedIndex: number,
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>,
}) {
    const [left, setLeft] = useState(0);
    const [multiMenuItemIndex, setMultiMenuItemIndex] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const func = () => {
            if (ref.current) {
                setLeft(ref.current.offsetLeft + ref.current.offsetWidth / 2);
            }
        };
        func();

        window.addEventListener("resize", func);

        return () => {
            window.removeEventListener("resize", func);
        }
    }, []);

    return (
        <div className={style.box} ref={ref}>
            <span
                style={{
                    cursor: "pointer",
                }}
                className={`whitespace-nowrap ${style.link_item}`}
                onClick={e => {
                    if (item.isMegaMenu) {
                        setSelectedIndex(selectedIndex === index ? -1 : index);
                    }
                }}
            >
                {item.title} {item.items && (item.isMegaMenu ? (
                    <FaAngleDown className={`inline-block align-baseline`} />
                ) :
                    <FaCaretDown className={`inline-block align-baseline`} />
                )}
            </span>

            {/* If isMegaMenu or items is a instance of React Node */}
            {(item.isMegaMenu) ? (
                (isValidElement(item.items) && !item.isMultiMenu) ? (
                    <div className={`${style.mega_box}`} data-open={index === selectedIndex}>
                        {/* @ts-ignore */}
                        {item.items}
                    </div>
                ) : (
                    <div className={`${style.mega_box}`} data-open={index === selectedIndex}>
                        <div className={`${style.multiMenuContainer}`}>
                            <div className={`${style.multiMenuContent}`}>

                                <div className={style.sidebar}>
                                    <div className={style.sidebar_content}>
                                        {Array.isArray(item.items) && item.items?.map((item, index) => (
                                            <div
                                                key={item.title}
                                                className={style.sidebar_item}
                                                data-active={multiMenuItemIndex === index}
                                                onClick={e => setMultiMenuItemIndex(index)}
                                            >
                                                <span>{item.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={style.main}>
                                    <div className={style.main_content}>
                                        {Array.isArray(item.items) && item.items.map((item, index) => (
                                            <div
                                                key={item.title}
                                                className={style.main_item}
                                                data-active={multiMenuItemIndex === index}
                                            >
                                                {/* <div className={style.main_item_title}>
                                                    <span>{item.title}</span>
                                                </div> */}

                                                <div className={style.main_item_content}>
                                                    {isValidElement(item.items) && item.items}

                                                    {Array.isArray(item.items) && item.items.map((item, index) => (
                                                        <div
                                                            key={item.title}
                                                            className={style.main_item_content_item}
                                                        >
                                                            <Link href={item.link}>{item.title}</Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            ) : (
                <ul className={`${style.dropdown_box}`} style={{
                    left: left,
                }}>
                    {/* @ts-ignore */}
                    {item.items.length > 0 ? item.items.map((item, index) => (
                        <li key={item.title}>
                            <Link href={item.link}>{item.title}</Link>
                        </li>
                    ))
                        :
                        <li>
                            <span>Nothing To Show Here</span>
                        </li>
                    }
                </ul>
            )}
        </div>
    )
}

// Render Menu For Mobile
function RenderSMMenu(
    { items, setIsMenuOpened }: {
        items: NavItem[];
        setIsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
    }
) {
    const [openedMenuIndex, setOpenedMenuIndex] = useState(-1);
    const [openedSecondMenuIndex, setOpenedSecondMenuIndex] = useState(-1);

    useEffect(() => {
        if (openedMenuIndex !== -1) {
            setOpenedSecondMenuIndex(-1);
        }
    }, [openedMenuIndex, setOpenedSecondMenuIndex])


    return (
        <>
            <div className={style.menuHeader}>
                <div className={style.menuTitle}>
                    {(openedMenuIndex !== -1 && items[openedMenuIndex]?.isMegaMenu) &&
                        (((openedSecondMenuIndex !== -1
                            && Array.isArray(items[openedMenuIndex]?.items))
                            // @ts-ignore
                            && items[openedMenuIndex]?.items[openedSecondMenuIndex]?.isMegaMenu)
                            ? (
                                <div className={style.menuBack} onClick={e => setOpenedSecondMenuIndex(-1)}>
                                    <FaAngleLeft />
                                </div>
                            )
                            : (
                                <div className={style.menuBack} onClick={e => setOpenedMenuIndex(-1)}>
                                    <FaAngleLeft />
                                </div>
                            ))
                    }

                    <span>{
                        (openedMenuIndex !== -1 && items[openedMenuIndex]?.isMegaMenu) ?
                            (((openedSecondMenuIndex !== -1
                                && Array.isArray(items[openedMenuIndex]?.items))
                                // @ts-ignore
                                && items[openedMenuIndex]?.items[openedSecondMenuIndex]?.isMegaMenu)
                                ? (
                                    // @ts-ignore
                                    items[openedMenuIndex]?.items[openedSecondMenuIndex]?.title
                                )
                                : (
                                    items[openedMenuIndex]?.title
                                ))
                            : "Menu"
                    }</span>
                </div>

                <div className={style.menuClose} onClick={e => setIsMenuOpened(false)}>
                    <FaTimes />
                </div>
            </div>

            <div className={style.menuBody}>
                <div className={style.sm_box} data-hide={items[openedMenuIndex]?.isMegaMenu}>
                    <div className={style.holder}>

                        {items.map((item, index) => {
                            if (item.onlyDesktop) return null;

                            // Link
                            if (!item.items) {
                                return (<Link className={style.link_item} href={item.link} key={index}>
                                    {item.icon && <span className={style.icon}>{item.icon}</span>}

                                    <span className={style.text}>{item.title}</span>

                                    <FaUpRightFromSquare className={`inline-block align-baseline`} />
                                </Link>)
                            }

                            // Dropdown
                            if (!item.isMegaMenu) {
                                return (
                                    <div key={index} className={style.dropdown_holder} data-open={openedMenuIndex === index}>
                                        <span className={`${style.link_item}`} onClick={e => {
                                            setOpenedMenuIndex(openedMenuIndex === index ? -1 : index);
                                        }}>
                                            {item.icon && <span className={style.icon}>{item.icon}</span>}

                                            <span className={style.text}>{item.title}</span>

                                            {item.items && <FaCaretDown className={`inline-block align-baseline`} />}
                                        </span>

                                        <div className={style.sm_dropdown} key={index}>
                                            <ul className={`${style.dropdown_box}`}>
                                                {/* @ts-ignore */}
                                                {item.items.length > 0 ? item.items.map((item, index) => (
                                                    <li key={item.title}>
                                                        <Link href={item.link}>{item.title}</Link>
                                                    </li>
                                                ))
                                                    :
                                                    <li>
                                                        <span>Nothing To Show Here</span>
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                )
                            }

                            // First Mega Menu
                            return (
                                <div className={style.mega_box_holder} key={index}>
                                    <span className={`${style.link_item}`} onClick={e => {
                                        setOpenedMenuIndex(openedMenuIndex === index ? -1 : index);
                                    }}>
                                        {item.icon && <span className={style.icon}>{item.icon}</span>}

                                        <span className={style.text}>{item.title}</span>

                                        {item.items && <FaAngleRight className={`inline-block align-baseline`} />}
                                    </span>

                                    {/* Second Screen */}
                                    <div className={style.mega_box} data-open={openedMenuIndex === index}>
                                        <div className={style.mega_box_container}>
                                            <div className={style.mega_box_content}>

                                                {/* If React Element then show in second screen... Not Multi Mega Menu */}
                                                {isValidElement(item.items) && item.items}

                                                {/* If Multi Mega Menu the reneder as before */}
                                                {item.items && Array.isArray(item.items) && item.items.map((item, index) => {
                                                    // Link
                                                    if (!item.items) {
                                                        return (<Link className={style.link_item} href={item.link} key={index}>
                                                            {item.icon && <span className={style.icon}>{item.icon}</span>}

                                                            <span className={style.text}>{item.title}</span>

                                                            <FaUpRightFromSquare className={`inline-block align-baseline`} />
                                                        </Link>)
                                                    }

                                                    // Dropdown
                                                    if (!item.isMegaMenu) {
                                                        return (
                                                            <div key={index} className={style.dropdown_holder} data-open={openedSecondMenuIndex === index}>
                                                                <span className={`${style.link_item}`} onClick={e => {
                                                                    setOpenedSecondMenuIndex(openedSecondMenuIndex === index ? -1 : index);
                                                                }}>
                                                                    {item.icon && <span className={style.icon}>{item.icon}</span>}

                                                                    <span className={style.text}>{item.title}</span>

                                                                    {item.items && <FaCaretDown className={`inline-block align-baseline`} />}
                                                                </span>

                                                                <div className={style.sm_dropdown} key={index}>
                                                                    <ul className={`${style.dropdown_box}`}>
                                                                        {/* @ts-ignore */}
                                                                        {item.items.length > 0 ? item.items.map((item, index) => (
                                                                            <li key={item.title}>
                                                                                <Link href={item.link}>{item.title}</Link>
                                                                            </li>
                                                                        ))
                                                                            :
                                                                            <li>
                                                                                <span>Nothing To Show Here</span>
                                                                            </li>
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        )
                                                    }

                                                    return (
                                                        <div className={style.mega_box_holder} key={index}>
                                                            <span className={`${style.link_item}`} onClick={e => {
                                                                setOpenedSecondMenuIndex(openedSecondMenuIndex === index ? -1 : index);
                                                            }}>
                                                                {item.icon && <span className={style.icon}>{item.icon}</span>}

                                                                <span className={style.text}>{item.title}</span>

                                                                {item.items && <FaAngleRight className={`inline-block align-baseline`} />}
                                                            </span>

                                                            <div className={style.mega_box} data-open={openedSecondMenuIndex === index}>
                                                                <div className={style.mega_box_container}>
                                                                    <div className={style.mega_box_content}>
                                                                        {/* If React Element then show in second screen... Not Multi Mega Menu */}
                                                                        {isValidElement(item.items) && item.items}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div >
        </>
    )
}

