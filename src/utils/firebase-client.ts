import { cert, initializeApp, getApps, AppOptions } from 'firebase-admin/app';
import { apps, app as firebaseApp } from 'firebase-admin';
import { Timestamp, initializeFirestore, getFirestore } from 'firebase-admin/firestore';
import { AdapterAccount, AdapterSession, AdapterUser } from 'next-auth/adapters';

export type UserData = {
    id: string;
    name: string;
    email: string;
    image: string;
    emailVerified: boolean | Date;
    role: number;
    status: number;
    createdAt: Date;
}

/**
 * Fetch the service account key.
 * @see https://firebase.google.com/docs/admin/setup#initialize-sdk
 */
export const serviceAccountKey = require("./serviceaccountkey.json");

export function initFirestore(
    options: AppOptions & { name?: string } = {}
) {
    const apps = getApps()
    const app = options.name ? apps.find((a) => a.name === options.name) : apps[0]

    if (app) return getFirestore(app)

    return initializeFirestore(initializeApp(options, options.name))
}

export const DBCollections = () => {
    const firestore = initFirestore({
        credential: cert(serviceAccountKey),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        serviceAccountId: serviceAccountKey.client_email,
        name: "client-setup"
    });

    return {
        users: firestore
            .collection("users")
            .withConverter<UserData>(getConverter({})),
        sessions: firestore
            .collection("sessions")
            .withConverter<AdapterSession>(getConverter({})),
        accounts: firestore
            .collection("accounts")
            .withConverter<AdapterAccount>(getConverter({}))
    }
};

const identity = <T>(x: T) => x

/** @internal */
export function mapFieldsFactory() {
    return { toDb: identity, fromDb: identity }
}

/** @internal */
function getConverter<Document extends Record<string, any>>(options: {
    excludeId?: boolean
}): FirebaseFirestore.FirestoreDataConverter<Document> {
    const mapper = mapFieldsFactory()

    return {
        toFirestore(object) {
            const document: Record<string, unknown> = {}

            for (const key in object) {
                if (key === "id") continue
                const value = object[key]
                if (value !== undefined) {
                    document[mapper.toDb(key)] = value
                } else {
                    console.warn(`FirebaseAdapter: value for key "${key}" is undefined`)
                }
            }

            return document
        },

        fromFirestore(
            snapshot: FirebaseFirestore.QueryDocumentSnapshot<Document>
        ): Document {
            const document = snapshot.data()! // we can guarantee it exists

            const object: Record<string, unknown> = {}

            if (!options?.excludeId) {
                object.id = snapshot.id
            }

            for (const key in document) {
                let value: any = document[key]
                if (value instanceof Timestamp) value = value.toDate()

                object[mapper.fromDb(key)] = value
            }

            return object as Document
        },
    }
}
