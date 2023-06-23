import GoogleProvider from "next-auth/providers/google";
import EmailProvider, { SendVerificationRequestParams } from "next-auth/providers/email";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { createTransport } from "nodemailer";
import { cert } from "firebase-admin/app";
import { html, text } from "@/utils/email-html";
import { AuthOptions } from "next-auth";

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
    adapter: FirestoreAdapter(
        {
            credential: cert(require("../../../../../utils/serviceaccountkey.json")),
            databaseURL: process.env.FIREBASE_DATABASE_URL,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            name: "firebase-adapter",
        },
    ),

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

                    if (["as2048282@gmail.com", "arifsardar.private@gmail.com"].includes(user?.email)) {
                        // @ts-ignore
                        session.user.role = 1;
                    }
                }
                return session;

            } catch (err) {
                console.error(err);
                return session;
            }
        },
    },

    session: {
        maxAge: 7 * (24 * (60 * 60)), // 7 days
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
