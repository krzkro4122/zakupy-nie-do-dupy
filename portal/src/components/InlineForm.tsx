import { useState } from "react";
import { Button } from "./Button";
import { v4 } from "uuid";
import { ResizingInput } from "./ResizingInput";

import '../styles/inlineForm.css'

interface InlineFormProps {
    action: (formData: FormData) => void | Promise<void>;
    initialDisplayValue: string;
    keepInitialValueAsInput?: boolean;
    extraFormClassNames?: string;
    extraButtonClassNames?: string;
    extraInputClassNames?: string;
}

export const InlineForm = ({ action, initialDisplayValue, keepInitialValueAsInput, extraButtonClassNames, extraInputClassNames, extraFormClassNames }: InlineFormProps) => {
    const [isInput, setIsInput] = useState(false);

    const placeholder = "Product name";
    const formId = v4();

    return (
        <form
            id={formId}
            action={((formData: FormData) => {
                setIsInput(false);
                action(formData);
            })}
            className={`${"inline-form " + extraFormClassNames}`}
        >
            {isInput ?
                <ResizingInput
                    formId={formId}
                    onBlur={() => setIsInput(false)}
                    placeholder={placeholder}
                    extraClassNames={extraInputClassNames}
                    initialValue={keepInitialValueAsInput ? initialDisplayValue : ""}
                /> :
                <Button
                    onClick={() => setIsInput(true)}
                    displayValue={initialDisplayValue}
                    extraClassNames={extraButtonClassNames}
                ></Button>
            }
        </form>
    );
};
