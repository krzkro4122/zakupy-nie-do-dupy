import type { PropsWithChildren } from "react";

export const BorderedSection = ({children}: PropsWithChildren) => {
    return (
        <section className="flex">
            <section className="border-gray-100/50 border-1 rounded-md p-2 flex flex-col items-center w-80">
              {children}
            </section>
        </section>
    );
};
