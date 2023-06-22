
import NextAuth, { AuthOptions, ISODateString } from "next-auth"
import { USER } from "./user-type";
import { nextAuthOptions } from "./authOptions";

declare module "next-auth" {
    interface Session {
        user: USER;
        expires: ISODateString
    }
}

const handler = NextAuth(nextAuthOptions);
export {
    handler as GET,
    handler as POST,
}
