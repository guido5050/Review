import { Button } from "flowbite-react";

export default function Buttonprimary({ children, onClick, type, disabled, className, size}) {

    return (
        <Button
            size={size}
            className={className}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </Button>
    );
}
