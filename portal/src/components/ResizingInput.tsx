import { useEffect, useRef, useState, type FocusEventHandler } from "react";

interface ResizingInputProps {
    formId: string;
    placeholder: string;
    initialValue: string;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    extraClassNames?: string;
}


export const ResizingInput = ({ formId, placeholder, initialValue, onBlur, extraClassNames }: ResizingInputProps) => {
    const [inputValue, setInputValue] = useState(initialValue || '');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        updateInputWidth(initialValue?.length ? initialValue?.length : placeholder.length);
    }, []);

    const updateInputWidth = (length: number) => {
        if (inputRef.current) {
            const calculatedWidth = Math.max(1, length);
            inputRef.current.style.width = `${calculatedWidth}ch`;
        }
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        updateInputWidth(newValue.length === 0 ? placeholder.length : newValue.length);
    };

    return (
        <input
            type="text"
            name='resizing-input'
            className={`resizing-input ${extraClassNames || ""}`}
            form={formId}
            placeholder={placeholder}
            value={inputValue}
            ref={inputRef}
            onChange={onChange}
            onBlur={onBlur}
            autoFocus
        />);
};
