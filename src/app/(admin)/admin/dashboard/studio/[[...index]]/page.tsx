import { getServerSession } from 'next-auth';
import { Studio } from './studio'
import { nextAuthOptions } from '@/app/(api)/api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';

// Set the right `viewport`, `robots` and `referer` meta tags
export { metadata } from 'next-sanity/studio/metadata'

export default async function StudioPage() {
    const session = await getServerSession(nextAuthOptions);
    if (session?.user.role !== 3) {
        redirect('/admin/dashboard');
    }

    return <Studio />
}