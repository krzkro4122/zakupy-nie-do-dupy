import './styles/button.css'

interface ButtonProps {
    displayValue: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    extraClassNames?: React.ComponentProps<'button'>['className'];
    disabled?: React.ComponentProps<'button'>['disabled']
}


export const Button = ({ onClick, displayValue, extraClassNames, disabled }: ButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={
                `button ${extraClassNames || ""}`
            }
        >
            {displayValue}
        </button>
    )
}
