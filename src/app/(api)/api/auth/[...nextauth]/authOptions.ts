import GoogleProvider from "next-auth/providers/google";
import EmailProvider, { SendVerificationRequestParams } from "next-auth/providers/email";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { createTransport } from "nodemailer";
import { cert } from "firebase-admin/app";
import { html, text } from "@/utils/email-html";
import { AuthOptions } from "next-auth";
import { serviceAccountKey } from "@/utils/firebase-client";

export const FirebaseAuthAdapter = FirestoreAdapter(
    {
        credential: cert(serviceAccountKey),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        name: "firebase-adapter",
    },
);

const useSecureCookies = process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL.startsWith('https://') : false;
const cookiePrefix = useSecureCookies ? '__Secure-' : ''
const hostName = new URL(process.env.NEXTAUTH_URL ?? "").hostname;

export const nextAuthOptions: AuthOptions = {
    /**
     * Configure one or more authentication providers here.
     * 
     * For a full list of providers, see:
     * @see https://next-auth.js.org/configuration/providers
     * 
     * for example: We are using the Google provider here.
     */
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT as unknown as number,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM,
            sendVerificationRequest: sendVerificationRequest,
        }),
        // OAuth authentication providers...
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true,
            /**
             * {...}
             * 
             * For more information on each option (and a full list of options) go to:
             * @see https://next-auth.js.org/providers/google
             */
        }),
    ],

    /**
     * Currently supported database is Firebase.
     */
    adapter: FirebaseAuthAdapter,

    /**
     * Add custom pages here, if needed.
     */
    pages: {
        signIn: '/auth/signin',
        // signOut: '/auth/signout',
        error: '/auth/signin', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },

    /**
     * Callbacks are asynchronous functions you can use to control what happens when an action is performed.
     * You can specify a handler for any of the callbacks below.
     * 
     * @see https://next-auth.js.org/configuration/callbacks
     */
    callbacks: {
        async signIn({ user, account, profile, email, credentials, ...rest }) {
            return true;
        },
        async redirect({ url, baseUrl, ...rest }) {
            return baseUrl
        },
        async session({ session, user, token, ...rest }) {
            try {
                if (session?.user) {
                    /**
                     * Add property to session, like an access_token from a provider.
                     * 
                     * We are adding user id and role to the session object here.
                     * Don't remove the return statement here, it will break the authentication flow.
                     * Also remove these lines, as these are necessary for the admin panel.
                     */

                    // @ts-ignore
                    session.user.id = user?.id || null;
                    // @ts-ignore
                    session.user.role = user?.role || 0;
                    // @ts-ignore
                    session.user.status = user?.status || 0;
                    session.user.emailVerified = user?.emailVerified || false;
                    // @ts-ignore
                    session.user.createdAt = user?.createdAt || 0;

                    if ([
                        "as2048282@gmail.com",
                        "arifsardar.private@gmail.com",
                        "bishal.nandi@growitrapid.com",
                        "nandibishal97@yahoo.in",
                        "nandibishal04@gmail.com",
                        "qa.sixsigma@gmail.com"
                    ].includes(user?.email)) {
                        // @ts-ignore
                        session.user.role = 3;
                    }
                }
                return session;

            } catch (err) {
                console.error(err);
                return session;
            }
        },
    },

    events: {
        createUser(message) {
            console.log("createUser", message);
        },
    },

    session: {
        maxAge: 7 * (24 * (60 * 60)), // 7 days
    },

    cookies: {
        sessionToken: {
            name: `${cookiePrefix}next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                domain: hostName == 'localhost' ? hostName : '.' + hostName // add a . in front so that subdomains are included
            },
        },
        callbackUrl: {
            name: `${cookiePrefix}next-auth.callback-url`,
            options: {
                sameSite: 'lax',
                path: '/',
                secure: useSecureCookies,
                domain: hostName == 'localhost' ? hostName : '.' + hostName // add a . in front so that subdomains are included
            }
        },
        csrfToken: {
            name: `${cookiePrefix}next-auth.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: useSecureCookies,
                domain: hostName == 'localhost' ? hostName : '.' + hostName // add a . in front so that subdomains are included
            }
        },
        pkceCodeVerifier: {
            name: `${cookiePrefix}next-auth.pkce.code_verifier`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: useSecureCookies,
                maxAge: 900,
                domain: hostName == 'localhost' ? hostName : '.' + hostName // add a . in front so that subdomains are included
            }
        },
        state: {
            name: `${cookiePrefix}next-auth.state`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                maxAge: 900,
                domain: hostName == 'localhost' ? hostName : '.' + hostName // add a . in front so that subdomains are included
            },
        },
        nonce: {
            name: `${cookiePrefix}next-auth.nonce`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                domain: hostName == 'localhost' ? hostName : '.' + hostName // add a . in front so that subdomains are included
            },
        },
    },
}

async function sendVerificationRequest(params: SendVerificationRequestParams) {
    const { identifier, url, provider, theme } = params
    const { host } = new URL(url)
    // NOTE: You are not required to use `nodemailer`, use whatever you want.
    const transport = createTransport(provider.server)
    const result = await transport.sendMail({
        to: identifier,
        from: provider.from,
        subject: `Sign in to ${host}`,
        text: text({ url, host }),
        html: await html({ url, host, theme }),
    })
    const failed = result.rejected.concat(result.pending).filter(Boolean)
    if (failed.length) {
        throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
    }
}
