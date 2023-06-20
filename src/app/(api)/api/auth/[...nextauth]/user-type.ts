
export type USER = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id: string | null;

    /**
     * Role of the user. Can be "user", "editor", "admin", "op".
     * 
     * "user" => 0
     * "editor" => 1
     * "admin" => 2
     * "op" => 3
     * 
     * @type {number}
     * @default 0
     */
    role: number;

    /**
     * User status flags
     */
    isBan: boolean;
    isDisabled: boolean;
    isVerified: boolean;

    /**
     * extra data
     */
    [key: string]: any;
}
