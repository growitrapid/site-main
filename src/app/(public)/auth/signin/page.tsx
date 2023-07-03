'use client';

import React from 'react'

import style from './page.module.scss';
import { FaArrowRight } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Page({ params, searchParams }: {
    params: {
        [key: string]: string;
    },
    searchParams: {
        [key: string]: string;
    },
}) {
    const [email, setEmail] = React.useState('');
    const { status, data: session } = useSession();
    let error = searchParams?.error;
    let errorMessage = '';
    let errorType = 'Error:';

    const errorMessages: { [key: string]: string } = {
        'configuration': 'There is a problem with the server configuration. Check if your options are correct.',
        'accessdenied': 'Usually occurs, when you restricted access through the signIn callback, or redirect callback',
        'verification': 'Related to the Email provider. The token has expired or has already been used',
        'default': 'Something went wrong while signing in. Please try again.',
    };

    const signinErrorMessages: { [key: string]: string } = {
        'oauthsignin': 'Error in constructing an authorization URL (1, 2, 3)',
        'oauthcallback': 'Error in handling the response (1, 2, 3) from an OAuth provider.',
        'oauthcreateaccount': 'Could not create OAuth provider user in the database.',
        'emailcreateaccount': 'Could not create email provider user in the database.',
        'callback': 'Error in the OAuth callback handler route',
        'oauthaccountnotlinked': 'If the email on the account is already linked, but not with this OAuth account',
        'emailsignin': 'Sending the e-mail with the verification token failed',
        'credentialssignin': 'The authorize callback returned null in the Credentials provider. We don\'t recommend providing information about which part of the credentials were wrong, as it might be abused by malicious hackers.',
        'sessionrequired': 'The content of this page requires you to be signed in at all times. See useSession for configuration.',
        'default': 'Something went wrong while signing in. Please try again.',
    };

    if (error) {
        error = error.toLowerCase();

        if (errorMessages[error]) {
            errorMessage = errorMessages[error];
            errorType = 'Error:';
        } else if (signinErrorMessages[error]) {
            errorMessage = signinErrorMessages[error];
            errorType = 'Sign in Error:';
        } else {
            errorMessage = errorMessages['default'];
            errorType = 'Error:';
        }
    }

    async function signinWithEmail(e: any) {
        e.preventDefault();

        const res = await signIn("email", {
            email: email,
            redirect: false
        });

        console.log(res);

        if (res?.error) {
            alert(res.error);
        } else {
            alert("Check your email for a link to sign in.");
        }
    }


    return (
        <div className={`h-auto md:h-[calc(100%-60px)] w-full relative table bg-[var(--tertiary-color)]`}>

            <div className={`${style.modal} relative h-full table-cell md:align-middle`}>

                <div className={`${style.modal__content} relative md:max-w-xl mx-auto px-4 py-5 md:bg-[var(--bg-color)] md:rounded-lg md:shadow-lg overflow-hidden`}>

                    {status === "authenticated" && <div className={`absolute z-10 w-full h-full top-0 left-0 bg-[var(--bg-color)] flex flex-col items-center justify-center gap-3 text-center`}>
                        <div className={`${style.modal__content__header__title} text-2xl font-[var(--font-barlow)] mb-4`}>
                            You are already signed in.
                        </div>

                        <div className={``}>
                            <Link
                                href={`/`}
                                className={`${style.modal__content__button} w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)]`}
                            >
                                Go to Home
                                <FaArrowRight
                                    className={`inline-block ml-2`}
                                />
                            </Link>
                        </div>
                    </div>}

                    {error && <div className={`${style.modal__content__error} text-sm mb-4 rounded-md px-4 py-2 bg-[var(--danger-color)] border-[1px] border-[var(--border-primary-color)] text-white font-[var(--font-barlow)]`}>
                        <span className={`font-bold`}>{errorType}</span>&nbsp;{errorMessage}
                    </div>}

                    <div className={`${style.modal__content__inner} flex flex-col items-stretch gap-2`}>
                        <div className={`${style.modal__content__header__title} text-2xl font-[var(--font-barlow)] mb-4`}>
                            Log in to Grow It Rapid
                        </div>

                        <div className={``}>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className={`${style.modal__content__input} w-full outline-none rounded-md px-4 py-2 bg-[var(--bg-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)]`}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className={``}>
                            <button
                                className={`${style.modal__content__button} w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)]`}
                                onClick={signinWithEmail}
                            >
                                Continue with Email
                                <FaArrowRight
                                    className={`inline-block ml-2`}
                                />
                            </button>
                        </div>

                        <div className={`${style.modal__content__divider} relative w-full my-3 flex flex-row items-center`}>
                            <span
                                className={`${style.modal__content__divider__line} border-[1px] border-[var(--border-primary-color)] h-[1px] w-full`}
                            />
                            <span className={`px-3`}>OR</span>
                            <span
                                className={`${style.modal__content__divider__line} border-[1px] border-[var(--border-primary-color)] h-[1px] w-full`}
                            />
                        </div>

                        <div className={``}>
                            <button
                                className={`${style.modal__content__button} w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)]`}
                                onClick={e => {
                                    e.stopPropagation();
                                    signIn("google", { redirect: false });
                                }}
                            >
                                <FcGoogle className={`inline-block mr-2 text-xl`} />
                                Continue with Google
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
