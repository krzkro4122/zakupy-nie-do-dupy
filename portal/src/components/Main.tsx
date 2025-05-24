import { type PropsWithChildren } from 'react';

export const Main = ({ children }: PropsWithChildren) => {
    return (
        <main className='w-full h-full p-6'>
            {children}
        </main>
    );
};
