import { Link } from "@inertiajs/react";

export default function Linkprimary({href,className,children, onClick}){

    return(
        <Link
        onClick={onClick}
        className=
        {`text-white inline-block  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-[#0891B2]  ${className}`}
         href={href}

        >
        {children}
        </Link>
    )

}
