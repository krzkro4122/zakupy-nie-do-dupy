import { useState } from "react";
import { Button } from "./Button";
import { v4 } from "uuid";
import { ResizingInput } from "./ResizingInput";

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
            className="w-auto"
        >
            {isInput ?
                <ResizingInput formId={formId} placeholder={placeholder} initialValue={keepInitialValueAsInput ? initialDisplayValue : ""} /> :
                <Button
                    className="text-sm"
                    onClick={
                        () => {
                            setIsInput(true)
                        }
                    }
                    displayValue={initialDisplayValue}
                ></Button>
            }
        </form>
    );
};
