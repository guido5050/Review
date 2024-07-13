import { Link } from "@inertiajs/react";

export default function Linkprimary({href,className,children, onClick}){

    return(
        <Link
        onClick={onClick}
        className=
        {`text-white inline-block bg-gradient-to-r from-pink-500 to-pink-400 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:from-pink-600 dark:to-gray-800 dark:hover:from-pink-700 dark:hover:to-gray-700 focus:outline-none dark:focus:ring-pink-800 ${className}`}
         href={href}
        gradientMonochrome="success"
        >
        {children}
        </Link>
    )

}
