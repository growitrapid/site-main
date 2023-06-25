'use client';

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import Logo from '@/assets/Badge Education Badge Logo.svg';
import Me from '@/assets/me.png';
import style from './style.module.scss'

import {
    FaCaretDown, FaSearch, FaSignOutAlt, FaSlidersH,
} from "react-icons/fa";
import { BsMoonStarsFill, BsSlashSquare } from "react-icons/bs";
import { BiSun } from "react-icons/bi";
import { setCookie } from '@/utils/cookie';
import config from '@/utils/config';
import { VscGraph } from 'react-icons/vsc';

const menuItems = [
    {
        name: "About Us",
        link: "/about",
        icon: null
    },
    {
        name: "Blog",
        link: "data.blogUrl",
        icon: null
    },
    {
        name: "Courses",
        link: "data.blogUrl",
        icon: null,
        items: [
            {
                name: "AI",
                link: "/courses/ai",
                icon: null
            },
            {
                name: "Data Science",
                link: "/courses/data-science",
                icon: null
            }
        ],
    },
    {
        name: "Services",
        link: "data.blogUrl",
        icon: null,
        items: [
            {
                name: "AI",
                link: "/services/ai",
                icon: null
            },
            {
                name: "Data Science",
                link: "/services/data-science",
                icon: null
            }
        ]
    },
    {
        name: "Developers",
        link: "data.blogUrl",
        icon: null
    },
    // {
    //     name: "Researches",
    //     link: "data.researchesUrl",
    //     icon: null,
    //     items: [
    //     ]
    // },
    // {
    //     name: "Products",
    //     link: "/products",
    //     icon: null,
    //     items: [
    //     ]
    // },
    {
        name: "Terms & Policy",
        link: "/terms-policies",
        icon: null
    }
] as ({
    name: string;
    link: string;
    icon: null;
    items?: undefined;
} | {
    name: string;
    link: string;
    icon: null;
    items?: {
        name: string;
        link: string;
        icon: null;
    }[];
})[];

type Props = {}

export default function Header({ }: Props) {
    // const globalContext = React.useContext(GlobalContext);
    const { data: session, status } = useSession();
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        function func() {
            setIsDropdownOpen(false);
        }
        if (isDropdownOpen) {
            window.addEventListener("click", func);
        } else {
            window.removeEventListener("click", func);
        }

        return () => {
            window.removeEventListener("click", func);
        }
    }, [isDropdownOpen, setIsDropdownOpen]);

    return (
        <nav className={style.header} style={{
            // backgroundColor: globalContext.header.backhround ? "var(--tertiary-color)" : "#00000055",
            // backdropFilter: globalContext.header.backhround ? "none" : "blur(10px)",
        }}>

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

            <Link className={style.logo} href="/" style={{ color: "var(--primary-color)" }}>
                <div>
                    {/* <Image src={Logo} alt="Logo" height={25} /> */}
                </div>
            </Link>

            <div className={style.links}>
                {menuItems.map((item, index) => <Render2 item={item} key={index} />)}
            </div>

            <div className={style.searchBar}>
                <div className={style.bar}>
                    <SearchBar
                        value={searchText}
                        onChange={(e: any) => setSearchText(e)}
                    />
                </div>
            </div>

            <div className={style.avatar} onClick={e => e.stopPropagation()}>
                <button onClick={e => setIsDropdownOpen(!isDropdownOpen)}>
                    <img
                        src={session?.user?.image || Me.src}
                        alt="Avatar"
                        referrerPolicy="no-referrer"
                    />
                    {/* <FaCaretDown /> */}
                </button>
            </div>

            <div className={style.dropdown} data-open={isDropdownOpen} onClick={e => e.stopPropagation()}>
                <span>
                    <div className={style.chip} style={{ justifyContent: "space-evenly" }}>
                        <button onClick={e => {
                            document.body.classList.toggle("dark");
                            setCookie("theme", document.body.classList.contains("dark") ? "dark" : "light", 15);
                            setIsDark(document.body.classList.contains("dark"));
                        }} className={style.avatar} style={{ fontSize: "1.1em", height: 20 }}>
                            {isDark ?
                                <BiSun fill='currentColor' />
                                :
                                <BsMoonStarsFill fill='currentColor' />
                            }
                        </button>

                        {((session?.user.role || 0) >= 1) &&
                            <>
                                <Link href="/admin/studio" target='_blank' title='Studio'>
                                    <FaSlidersH fill='currentColor' />
                                </Link>

                                <Link href="/admin/dashboard" target='_blank' title='Dashboard'>
                                    <VscGraph fill='currentColor' />
                                </Link>
                            </>
                        }
                    </div>

                </span>

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

            <div className={style.menuBar} data-open={isMenuOpened} onClick={e => e.stopPropagation()}>
                <div className={style.searchBar} style={{
                    display: "grid",
                    minHeight: 40,
                }}>
                    <div className={style.bar} style={{
                        maxWidth: "100%",
                    }}>
                        <SearchBar
                            value={searchText}
                            onChange={(e: any) => setSearchText(e)}
                        />
                    </div>
                </div>

                <div className='partition'></div>

                <div className={style.links}>
                    {menuItems.map((item, index) => <Render1 item={item} key={index} />)}
                </div>
            </div>

        </nav>
    )
}

const Render1 = (props: any) => {
    const { item, index } = props;

    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={style.link}>
            {item.items ?
                <span onClick={() => setIsOpen(!isOpen)} style={{
                    cursor: "pointer",
                }} className={`whitespace-nowrap`}>{item.name} {item.items && <FaCaretDown className={`inline-block`} />}</span>
                :
                <Link href={item.link}>{item.name}</Link>
            }

            {item.items && (
                <ul className={style.dropdownlinks} data-open={isOpen}>
                    {item.items.length > 0 ? item.items.map((item: any, index: number) => (
                        <li key={item.name}>
                            <Link href={item.link}>{item.name}</Link>
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

const Render2 = (props: any) => {
    const { item, index } = props;

    const [left, setLeft] = useState(0);
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
        <div className={style.link} ref={ref}>
            {item.items ?
                <span style={{
                    cursor: "pointer",
                }} className={`whitespace-nowrap`}>{item.name} {item.items && <FaCaretDown className={`inline-block`} />}</span>
                :
                <Link href={item.link}>{item.name}</Link>
            }

            {item.items && (
                <ul className={style.dropdownlinks} style={{
                    left: left,
                }}>
                    {item.items.length > 0 ? item.items.map((item: any, index: number) => (
                        <li key={item.name}>
                            <Link href={item.link}>{item.name}</Link>
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

const SearchBar = (props: any) => {
    const ref = useRef<HTMLInputElement>(null);

    // useEffect(() => {
    //     const func = (e: KeyboardEvent) => {
    //         if (e.ctrlKey) {
    //             if (e.key === "s" || e.key === "S" || e.key === "/") {
    //                 e.preventDefault();
    //                 ref.current?.focus();
    //             }
    //         }
    //     };

    //     window.addEventListener("keydown", func);

    //     return () => {
    //         window.removeEventListener("keydown", func);
    //     }
    // }, []);

    return (
        <>
            <FaSearch style={{ opacity: 0.5 }} />
            <input
                ref={ref}
                type="text"
                placeholder='Search for your query...'
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        alert("Enter Pressed");
                        e.preventDefault();
                        if (typeof props.onSearch === "function")
                            props.onSearch();
                    }
                }}
            />
            <BsSlashSquare style={{ opacity: 0.4 }} />
        </>
    )
}
