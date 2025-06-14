import type { PropsWithChildren } from "react";

import './styles/borderedSection.css'

interface BorderedSectionProps extends PropsWithChildren {
    extraWrapperClassNames?: string;
    extraClassNames?: string;
}

export const BorderedSection = ({ children, extraClassNames, extraWrapperClassNames }: BorderedSectionProps) => {
    return (
        <section className={`bordered-section-wrapper ${extraWrapperClassNames || ""}`}>
            <section className={`bordered-section ${extraClassNames || ""}`}>
                {children}
            </section>
        </section>
    );
};
