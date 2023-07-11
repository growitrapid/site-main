// /components/NoSsr.js

import MainLoader from '@/components/loader'
import dynamic from 'next/dynamic'

const NoSsr = ({ children }: { children: React.ReactNode }) => <>{children}</>

export default dynamic(() => Promise.resolve(NoSsr), {
    ssr: false,
    loading: () => <div className='main-content-loading-234frg'>
        <MainLoader />
    </div>
})