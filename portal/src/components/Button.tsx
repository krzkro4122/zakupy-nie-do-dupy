interface ButtonProps {
    displayValue: string;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    className?: React.ComponentProps<'button'>['className'];
    disabled?: React.ComponentProps<'button'>['disabled']
}


export const Button = ({ onClick, displayValue, className, disabled }: ButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={
                `p-2 px-3 bg-gray-950 text-lg border-1 border-gray-600 rounded-md hover:cursor-pointer hover:bg-gray-900 hover:border-gray-500 disabled:opacity-40 disabled:cursor-not-allowed  ${className}`
            }
        >
            {displayValue}
        </button>
    )
}
