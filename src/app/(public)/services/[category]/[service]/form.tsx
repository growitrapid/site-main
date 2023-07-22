'use client';

import React from 'react'
import { FaArrowRight } from 'react-icons/fa';

type Props = {
    category: string
    service: string
    serviceData: any
}

export default function Form(props: Props) {
    return (
        <div>

            <h2 className={`text-2xl font-semibold text-[var(--text-color)]`}>Get the Quote Now</h2>

            <p className={`text-[var(--text-color)] mt-2 mb-4`}>Fill the form below to enroll for this service.</p>

            <input
                type="text"
                placeholder="Name"
                className={`w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)]`}
            />

            <input
                type="email"
                placeholder="Email"
                className={`w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)] mt-4`}
            />

            <input
                type="phone"
                placeholder="Phone Number"
                className={`w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)] mt-4`}
            />

            <textarea
                placeholder="Message"
                className={`w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)] mt-4 min-h-[10rem] max-h-[20rem]`}
            />

            <button className={`flex justify-between items-center w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)] mt-4 cursor-pointer hover:bg-[var(--hover-color)] transition-colors duration-200`}>
                <span>Enroll Now</span>
                <FaArrowRight
                    className={`inline-block ml-2`}
                />
            </button>

        </div>
    )
}