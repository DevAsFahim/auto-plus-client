import React from 'react';
import errImg from '../../assets/images/404-error.png';

const ErrorPage = () => {
    return (
        <div style={{
            background: `url(${errImg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: '100vh',
            width: '100%'
        }}>
            <h1 className="text-4xl font-bold text-orange-500 text-center pt-16">Page not found !!</h1>
        </div>
    );
};

export default ErrorPage;