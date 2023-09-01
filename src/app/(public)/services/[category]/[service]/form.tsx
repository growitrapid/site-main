'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa';

type Props = {
    category: string
    service: string
    serviceData: any
}

const DB_URL = 'https://growitrapid-04-default-rtdb.asia-southeast1.firebasedatabase.app';

export default function Form(props: Props) {
    const { data: user, status } = useSession();
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (status === 'authenticated') {
            setData({
                name: user?.user?.name || "",
                email: user?.user?.email || "",
                phone: user?.user?.phone || "",
                message: ''
            })
        }

    }, [user, status])


    function submit(e: any) {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            axios.post(`${DB_URL}/services/${props.category}/${props.service}/enrollments.json`, data);

            setIsSubmitting(false);
            setIsSubmitted(true);
        } catch (error) {
            console.log(error);
            setIsSubmitting(false);
        }
    }

    return (
        <div>

            <div>
                <h2 className={`text-2xl font-semibold text-[var(--text-color)]`}>Get the Quote Now</h2>

                {isSubmitted ?
                    <p className={`text-[var(--text-color)] mt-2 mb-4`}>
                        Thank you for your interest. We will get back to you soon.
                    </p>
                    :
                    <>
                        <p className={`text-[var(--text-color)] mt-2 mb-4`}>Fill the form below to enroll for this service.</p>

                        <input
                            type="text"
                            placeholder="Name"
                            className={`w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)]`}
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className={`w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)] mt-4`}
                            required
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />

                        <input
                            type="phone"
                            placeholder="Phone Number"
                            className={`w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)] mt-4`}
                            required
                            value={data.phone}
                            onChange={(e) => setData({ ...data, phone: e.target.value })}
                        />

                        <textarea
                            placeholder="Message"
                            className={`w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)] mt-4 min-h-[10rem] max-h-[20rem]`}
                            required
                            value={data.message}
                            onChange={(e) => setData({ ...data, message: e.target.value })}
                        />

                        <button
                            className={`flex justify-between items-center w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)] mt-4 cursor-pointer hover:bg-[var(--hover-color)] transition-colors duration-200`}
                            onClick={submit}
                            disabled={isSubmitting}
                        >
                            <span>Enroll Now</span>
                            <FaArrowRight
                                className={`inline-block ml-2`}
                            />
                        </button>
                    </>
                }
            </div>

        </div>
    )
}