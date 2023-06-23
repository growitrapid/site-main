
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
     * 
     * "Pending" => 0
     * "Active" => 1
     * "Inactive" => 2
     * "Banned" => 3
     */
    status: number;

    /**
     * extra data
     */
    [key: string]: any;
}
