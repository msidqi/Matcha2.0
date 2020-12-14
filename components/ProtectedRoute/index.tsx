import Loading from '@/components/Loading';
import { FC } from 'react';
import { useUser } from '@/components/auth';
import { useRouter } from 'next/router';

export const ProtectRoute: FC = ({ children }): JSX.Element => {
    const router = useRouter()
    const pathname = router.pathname
    const [{ loggedIn }, { loading }] = useUser();
    if (loading) {
        console.log('loading...')
        // return <Loading />;
    }
    // if (!loggedIn && pathname !== '/signin' && pathname !== '/signup') {
    //     router.push('/signin')
    // }
    return <>{children}</>;
}