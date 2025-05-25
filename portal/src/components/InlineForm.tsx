import { useState } from "react";
import { Button } from "./Button";
import { v4 } from "uuid";
import { ResizingInput } from "./ResizingInput";

import '../styles/inlineForm.css'

interface InlineFormProps {
    action: (formData: FormData) => void | Promise<void>;
    initialDisplayValue: string;
    keepInitialValueAsInput?: boolean
}

export const InlineForm = ({ action, initialDisplayValue, keepInitialValueAsInput }: InlineFormProps) => {
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
            className="inline-form"
        >
            {isInput ?
                <ResizingInput
                    formId={formId}
                    onBlur={() => setIsInput(false)}
                    placeholder={placeholder}
                    initialValue={keepInitialValueAsInput ? initialDisplayValue : ""}
                /> :
                <Button
                    onClick={() => setIsInput(true)}
                    displayValue={initialDisplayValue}
                ></Button>
            }
        </form>
    );
};
