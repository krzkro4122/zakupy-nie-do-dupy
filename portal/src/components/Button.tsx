interface ButtonProps {
    displayValue: string;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    className?: React.ComponentProps<'div'>['className'];
}


export const Button = ({ onClick, displayValue, className }: ButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={
                `p-2 px-3 bg-gray-950 text-lg border-1 border-gray-600 rounded-md hover:cursor-pointer hover:bg-gray-900 hover:border-gray-500 ${className}`
            }
        >
            {displayValue}
        </button>
    )
}
