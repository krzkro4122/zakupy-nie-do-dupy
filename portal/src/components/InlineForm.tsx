import { useState } from "react";
import { Button } from "./Button";
import { v4 } from "uuid";
import { ResizingInput } from "./ResizingInput";

interface InlineFormProps {
    action: (formData: FormData) => void | Promise<void>;
    initialDisplayValue: string;
}

export const InlineForm = ({ action, initialDisplayValue }: InlineFormProps) => {
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
                <ResizingInput formId={formId} placeholder={placeholder} /> :
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
