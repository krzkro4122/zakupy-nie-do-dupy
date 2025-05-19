import { type PropsWithChildren } from 'react';

export const Main = ({ children }: PropsWithChildren) => {
    return (
        <main className='flex grow items-center justify-center'>
            {children}
        </main>
    );
};
