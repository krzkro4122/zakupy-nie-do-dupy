import { useEffect, useRef, useState } from "react";

interface ResizingInputProps {
    formId: string;
    placeholder: string;
    initialValue: string;
}


export const ResizingInput = ({ formId, placeholder, initialValue }: ResizingInputProps) => {
    const [inputValue, setInputValue] = useState(initialValue || '');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        updateInputWidth(Math.max(initialValue?.length, placeholder.length));
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
            className="p-2 px-3 box-content font-mono bg-gray-950 text-sm w-auto border-1 border-gray-600 rounded-md hover:bg-gray-900 hover:border-gray-500"
            type="text"
            placeholder={placeholder}
            value={inputValue}
            ref={inputRef}
        />);
};
