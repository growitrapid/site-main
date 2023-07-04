'use client';

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaEnvelope, FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaTelegramPlane, FaTwitter } from 'react-icons/fa'

import DarkLogo from '@/assets/logo/logo_dark.svg';
import LightLogo from '@/assets/logo/logo_light.svg';
import style from "./style.module.scss"
import { BroadcastChannel } from '@/utils/web';
import config from '@/utils/config';

type Props = {
    isResources?: boolean;
    theme?: "light" | "dark";
}

export default function Footer({
    isResources = false,
    theme = "dark"
}: Props) {
    const [isDark, setIsDark] = useState(theme === "dark" ? true : false);
    const themeBroadcast = useRef(new BroadcastChannel("theme", { should_receive_own_messages: true }));

    themeBroadcast.current.onReceiveMessage((event, data) => {
        if (event === "theme_toggle") {
            setIsDark(data.theme === "dark" ? true : false);
        }
    })

    return (
        <footer className={`relative w-full bg-[var(--tertiary-color)] border-t-2 border-[var(--border-primary-color)]`}>
            <div className={`relative w-full`}>

                <section id={`resources`} className={`relative py-6 pb-8 px-4`}>
                    <div className={`relative w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2`}>

                        <div className={`relative flex-auto flex flex-col gap-1 mb-5 md:mb-0`}>
                            <h1 className={`text-lg font-bold mb-3`}>Discover</h1>
                            <ul className={`w-full grid grid-cols-2 sm:grid-cols-1 gap-2 text-[var(--primary-color)]`}>
                                <li><Link href="#">Products</Link></li>
                                <li><Link href="#">Trials</Link></li>
                                <li><Link href="#">Services</Link></li>
                                <li><Link href="#">Industries</Link></li>
                                <li><Link href="#">Case studies</Link></li>
                                <li><Link href="#">Financing</Link></li>
                            </ul>
                        </div>

                        {/* <div className={`relative flex-auto flex flex-col gap-1 mb-5 md:mb-0`}>
                            <h1 className={`text-lg font-bold mb-3`}>Learn about</h1>
                            <ul className={`w-full grid grid-cols-2 sm:grid-cols-1 gap-2 text-[var(--primary-color)]`}>
                                <li><Link href="#">What is IaaS ,PaaS & SaaS?</Link></li>
                                <li><Link href="#">What is Cloud Computing?</Link></li>
                                <li><Link href="#">What is Virtual Machine?</Link></li>
                                <li><Link href="#">What is Object Storage?</Link></li>
                                <li><Link href="#">What is Contenarization?</Link></li>
                                <li><Link href="#">What is Kubernetes?</Link></li>
                                <li><Link href="#">What is FaaS?</Link></li>
                            </ul>
                        </div> */}

                        <div className={`relative flex-auto flex flex-col gap-1 mb-5 md:mb-0`}>
                            <h1 className={`text-lg font-bold mb-3`}>Connect with us</h1>
                            <ul className={`w-full grid grid-cols-2 sm:grid-cols-1 gap-2 text-[var(--primary-color)]`}>
                                <li><Link href="#">Support</Link></li>
                                <li><Link href="#">Find a Business Partner</Link></li>
                                <li><Link href="#">Developers</Link></li>
                                <li><Link href="#">Business Partners</Link></li>
                            </ul>
                        </div>

                        <div className={`relative flex-auto flex flex-col gap-1 mb-5 md:mb-0`}>
                            <h1 className={`text-lg font-bold mb-3`}>About Grow It Rapid</h1>
                            <ul className={`w-full grid grid-cols-2 sm:grid-cols-1 gap-2 text-[var(--primary-color)]`}>
                                <li><Link href="#">Careers</Link></li>
                                <li><Link href="#">Latest news</Link></li>
                                <li><Link href="#">Investor relations</Link></li>
                                <li><Link href="#">Corporate responsibility</Link></li>
                                <li><Link href="#">About Us</Link></li>
                            </ul>
                        </div>

                    </div>

                </section>

                <section id={`footer`} className={`relative py-4 pb-10 px-2`}>
                    <div className={`relative w-full max-w-5xl mx-auto flex flex-col md:px-5 gap-10 justify-between items-center`}>

                        <div className={`${style.socialLinks} relative flex flex-row justify-center items-center gap-6 text-3xl`}>
                            <Link href="#"><FaFacebookF /></Link>
                            <Link href="#"><FaLinkedinIn /></Link>
                            <Link href="#"><FaInstagram /></Link>
                            <Link href="#"><FaTelegramPlane /></Link>
                            <Link href="#"><FaTwitter /></Link>
                            <Link href="#"><FaGithub /></Link>
                            <Link href="#"><FaEnvelope /></Link>
                        </div>

                        <div className={`relative flex flex-col items-center gap-3`}>
                            {/* <h1 className={`text-xl font-bold`}>Grow It Rapid</h1> */}
                            <Image src={isDark ? DarkLogo : LightLogo} alt="Logo" height={30} className={`drop-shadow-md`} />
                            <p className={`text-sm text-[var(--primary-color)]`}>Copyright © {(new Date()).getFullYear()} Grow It Rapid, LTD.</p>

                            <div className={`${style.bottom_navigation} w-full flex flex-wrap align-top items-center justify-center gap-5 text-sm text-[var(--primary-color)]`}>
                                <Link href={config.links.about}>About Us</Link>
                                <Link href={config.links.terms_policy}>Terms & Conditions</Link>
                                <Link href={config.links.terms_policy}>Privacy Policies</Link>
                                <Link href="#">Legal Stuffs</Link>
                                <Link href="#">Partners</Link>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </footer>
    )
}