import { nextAuthOptions } from '@/app/(api)/api/auth/[...nextauth]/authOptions';
import { DBCollections } from '@/utils/firebase-client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server'

async function handler(request: Request) {
    try {
        const session = await getServerSession(nextAuthOptions);

        const { type, newUserData } = request.method === "POST" ? await request.json() : {
            type: 'fetch',
            newUserData: null,
        };

        if (request.method === "POST" && (session?.user?.role || 0) < 2) {
            return NextResponse.json({
                status: 'error',
                message: 'You are not authorized to perform this action.',
            }, {
                status: 500,
            })
        }

        const Collections = DBCollections();

        const users = await Collections.users.get();
        const sessions = await Collections.sessions.get();
        const accounts = await Collections.accounts.get();

        if (type === 'new') {
            // no id is passed, so we create a new user
            const userRef = Collections.users.doc();
            await userRef.set(newUserData);
            const newUser = await userRef.get();
            return NextResponse.json({
                status: 'success',
                user: newUser.data(),
            }, {
                status: 200,
            });
        }

        if (type === 'update') {
            const { id, ...rest } = newUserData;
            const userRef = Collections.users.doc(id);
            await userRef.update(rest);
            const updatedUser = await userRef.get();
            return NextResponse.json({
                status: 'success',
                user: updatedUser.data(),
            }, {
                status: 200,
            });
        }

        if (type === 'delete') {
            const { id } = newUserData;

            if (session?.user?.id === id) {
                return NextResponse.json({
                    status: 'error',
                    message: 'You cannot delete yourself.',
                }, {
                    status: 500,
                })
            }

            const userRef = Collections.users.doc(id);
            await userRef.delete();
            return NextResponse.json({
                status: 'success',
            }, {
                status: 200,
            });
        }

        return NextResponse.json({
            status: 'success',
            users: users.docs.map((doc) => doc.data()),
            sessions: sessions.docs.map((doc) => doc.data()),
            accounts: accounts.docs.map((doc) => doc.data()),
        }, {
            status: 200,
        });

    } catch (e: any) {
        return NextResponse.json({
            status: 'error',
            message: e,
        }, {
            status: 500,
        })
    }
}

export {
    handler as GET,
    handler as POST,
}
