import React, { useState } from "react";
import { router } from "@inertiajs/react";

const TextArea = () => {
    const [value, setValues] = useState({
        comentario: "",
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    console.log(value);
    function handleSubmit(e) {
        e.preventDefault();
        router.post("storecomments", value);
    }
    return (
        <>
            <h1 className=" font-semibold mb-3">
                GRACIAS POR RESPONDER A NUESTRA ENCUENSTA 😆
            </h1>
            <form className="w-[60%] " onSubmit={handleSubmit}>
                <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label for="comment" class="sr-only">
                            Your comment
                        </label>
                        <textarea
                            id="comentario"
                            onChange={handleChange}
                            rows="4"
                            class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                            placeholder="Dejanos tu comentatio..."
                            required
                        ></textarea>
                    </div>
                    <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button
                            type="submit"
                            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                        >
                            Terminar encuensta
                        </button>
                        <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2"></div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default TextArea;
