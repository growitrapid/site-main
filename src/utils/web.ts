'use client';

import { useEffect, useState } from "react"

/**
 * Check if the browser is online or offline.
 */
export function useOnline() {
    const [isOnline, setIsOnline] = useState(
        typeof navigator !== "undefined" ? navigator.onLine : false
    )

    const setOnline = () => setIsOnline(true)
    const setOffline = () => setIsOnline(false)

    useEffect(() => {
        window.addEventListener("online", setOnline)
        window.addEventListener("offline", setOffline)

        return () => {
            window.removeEventListener("online", setOnline)
            window.removeEventListener("offline", setOffline)
        }
    }, [])

    return isOnline
}

/** Web compatible method to create a hash, using SHA256 */
export async function createHash(message: string) {
    const data = new TextEncoder().encode(message)
    const hash = await crypto.subtle.digest("SHA-256", data)
    return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
        .toString()
}

/** Web compatible method to create a random string of a given length */
export function randomString(size: number) {
    const i2hex = (i: number) => ("0" + i.toString(16)).slice(-2)
    const r = (a: string, i: number): string => a + i2hex(i)
    const bytes = crypto.getRandomValues(new Uint8Array(size))
    return Array.from(bytes).reduce(r, "")
}

/**
 * Inspired by [Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)
 * Only not using it directly, because Safari does not support it.
 *
 * https://caniuse.com/?search=broadcastchannel
 */
declare global {
    interface Window {
        customBroadcastChannels: {
            tab_id: string
        }
    }
}
export interface BroadcastEvent {
    channel: string
    event: string
    data: Record<string, unknown>
}
export class BroadcastChannel {
    channel_name: BroadcastEvent["channel"];
    this_tab_id: string;
    should_receive_own_messages: boolean = false;

    constructor(channelName: BroadcastEvent["channel"], options?: { should_receive_own_messages: boolean }) {
        if (typeof window === "undefined") {
            this.channel_name = channelName;
            this.this_tab_id = "";
            return;
        };

        this.channel_name = `web.broadcast.${channelName}`;

        const this_tab_id = window.customBroadcastChannels?.tab_id || randomString(16);
        this.this_tab_id = this_tab_id;

        window.customBroadcastChannels = {
            ...window.customBroadcastChannels,
            tab_id: this_tab_id
        };

        this.should_receive_own_messages = options?.should_receive_own_messages || false;

        // console.log("New BroadcastChannel", this.channel_name, this.this_tab_id);
    }

    postMessage(event: BroadcastEvent["event"], data: BroadcastEvent["data"]) {
        if (typeof window === "undefined") return;
        // console.log("BroadcastChannel.postMessage", { channelName: this.channel_name, event, data });

        try {
            localStorage.setItem(
                this.channel_name,
                JSON.stringify({
                    ...data,
                    timestamp: Date.now(),
                    event,
                    tab_id: window.customBroadcastChannels.tab_id
                })
            );

            if (this.should_receive_own_messages) {
                window.dispatchEvent(new StorageEvent("storage", {
                    key: this.channel_name,
                    newValue: localStorage.getItem(this.channel_name),
                    storageArea: localStorage,
                    url: window.location.href,
                }));
            }
        } catch (error: any) {
            /**
             * The localStorage API isn't always available.
             * It won't work in private mode prior to Safari 11 for example.
             * Notifications are simply dropped if an error is encountered.
             */
            console.error('BroadcastChannel.postMessage error: ' + error.message);
            console.error(error);
        }
    }

    onReceiveMessage(cb: (event: BroadcastEvent["event"], data: BroadcastEvent["data"]) => void) {
        if (typeof window === "undefined") return () => { };
        // console.log("BroadcastChannel.onReceiveMessage Initialized", this.channel_name);

        const handler = (event: StorageEvent) => {
            if (event.key !== this.channel_name) return;

            const { event: e, tab_id, ...data } = JSON.parse(event.newValue || "{}");

            // console.log("BroadcastChannel.onReceiveMessage", { channelName: this.channel_name, event: e, data, tab_id });

            cb(e, data);
        }

        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }
}
