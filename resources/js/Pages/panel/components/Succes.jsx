import React, { useEffect } from 'react';
import Swal2 from 'sweetalert2';

const Success = ({title}) => {
    useEffect(() => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: {title},
            showConfirmButton: false,
            timer: 2000,
        });
    }, []);

    return <div>Try me!</div>;
};

export default Success;

