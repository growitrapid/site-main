import React from 'react'
import Link from 'next/link'
import { FaEnvelope, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaTwitter } from 'react-icons/fa'

import style from "./style.module.scss"

type Props = {
    isResources?: boolean
}

export default function Footer({
    isResources = false
}: Props) {
    return (
        <footer className={`relative w-full bg-[var(--tertiary-color)] border-t-2 border-[var(--border-primary-color)]`}>
            <div className={`relative w-full`}>

                <section id={`resources`} className={`relative py-6 pb-8 px-4`}>
                    <div className={`relative w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2`}>

                        <div className={`relative flex-auto flex flex-col gap-1 mb-5 md:mb-0`}>
                            <h1 className={`text-lg font-bold mb-3`}>Discover</h1>
                            <ul className={`w-full grid grid-cols-2 sm:grid-cols-1 gap-2`}>
                                <li><Link href="#">Products</Link></li>
                                <li><Link href="#">Trials</Link></li>
                                <li><Link href="#">Services</Link></li>
                                <li><Link href="#">Industries</Link></li>
                                <li><Link href="#">IBM discounts</Link></li>
                                <li><Link href="#">Case studies</Link></li>
                                <li><Link href="#">Financing</Link></li>
                            </ul>
                        </div>

                        <div className={`relative flex-auto flex flex-col gap-1 mb-5 md:mb-0`}>
                            <h1 className={`text-lg font-bold mb-3`}>Learn about</h1>
                            <ul className={`w-full grid grid-cols-2 sm:grid-cols-1 gap-2`}>
                                <li><Link href="#">What is IaaS ,PaaS & SaaS?</Link></li>
                                <li><Link href="#">What is Cloud Computing?</Link></li>
                                <li><Link href="#">What is Virtual Machine?</Link></li>
                                <li><Link href="#">What is Object Storage?</Link></li>
                                <li><Link href="#">What is Contenarization?</Link></li>
                                <li><Link href="#">What is Kubernetes?</Link></li>
                                <li><Link href="#">What is FaaS?</Link></li>
                            </ul>
                        </div>

                        <div className={`relative flex-auto flex flex-col gap-1 mb-5 md:mb-0`}>
                            <h1 className={`text-lg font-bold mb-3`}>Connect with us</h1>
                            <ul className={`w-full grid grid-cols-2 sm:grid-cols-1 gap-2`}>
                                <li><Link href="#">Engage IBM Consulting</Link></li>
                                <li><Link href="#">Support</Link></li>
                                <li><Link href="#">Find a Business Partner</Link></li>
                                <li><Link href="#">Developers</Link></li>
                                <li><Link href="#">Business Partners</Link></li>
                            </ul>
                        </div>

                        <div className={`relative flex-auto flex flex-col gap-1 mb-5 md:mb-0`}>
                            <h1 className={`text-lg font-bold mb-3`}>About Grow It Rapid</h1>
                            <ul className={`w-full grid grid-cols-2 sm:grid-cols-1 gap-2`}>
                                <li><Link href="#">Careers</Link></li>
                                <li><Link href="#">Latest news</Link></li>
                                <li><Link href="#">Investor relations</Link></li>
                                <li><Link href="#">Corporate responsibility</Link></li>
                                <li><Link href="#">IBM product recycling</Link></li>
                                <li><Link href="#">About IBM</Link></li>
                            </ul>
                        </div>

                    </div>

                </section>

                <div className={`relative w-full max-w-6xl mx-auto h-[2px] bg-[var(--border-primary-color)]`}></div>

                <section id={`footer`} className={`relative py-4 px-2`}>
                    <div className={`relative w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-3 justify-between items-center`}>

                        <div className={`relative flex flex-row items-center gap-2`}>
                            <h1 className={`text-xl font-bold`}>Grow It Rapid</h1>
                            <p className={`text-sm text-[var(--primary-color)]`}>© 2021, Inc.</p>
                        </div>

                        <div className={`${style.socialLinks} relative flex flex-row items-center gap-2 text-2xl`}>
                            <Link href="#"><FaFacebook /></Link>
                            <Link href="#"><FaLinkedin /></Link>
                            <Link href="#"><FaInstagram /></Link>
                            <Link href="#"><FaTelegram /></Link>
                            <Link href="#"><FaTwitter /></Link>
                            <Link href="#"><FaGithub /></Link>
                            <Link href="#"><FaEnvelope /></Link>
                        </div>

                    </div>
                </section>

            </div>
        </footer>
    )
}