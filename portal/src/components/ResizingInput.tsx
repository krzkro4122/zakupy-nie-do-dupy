import { useEffect, useRef, useState, type FocusEventHandler } from "react";

interface ResizingInputProps {
    formId: string;
    placeholder: string;
    initialValue: string;
    onBlur?: FocusEventHandler<HTMLInputElement>;
}


export const ResizingInput = ({ formId, placeholder, initialValue, onBlur }: ResizingInputProps) => {
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
            form={formId}
            name="input"
            onChange={onChange}
            autoFocus
            onBlur={onBlur}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            ref={inputRef}
        />);
};
